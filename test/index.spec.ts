import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../src/index";

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

async function readSvg(response: Response): Promise<string> {
	return new TextDecoder().decode(await response.arrayBuffer());
}

async function readJson(response: Response): Promise<Record<string, unknown>> {
	return response.json();
}

describe("avatar worker", () => {
	it("serves the favicon as a static asset", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/favicon.ico");
		const body = await response.arrayBuffer();

		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toContain("image/");
		expect(response.headers.get("Content-Type")).not.toContain("svg");
		expect(body.byteLength).toBeGreaterThan(1000);
	});

	it("serves API docs as JSON", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/docs.json?aspekt=docs");
		const docs = await readJson(response);
		const variants = docs.variants as Array<{ name: string }>;
		const queryParameters = docs.query_parameters as Record<string, unknown>;
		const examples = docs.examples as string[];
		const browserPreview = docs.browser_preview as { response_type: string };

		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe("application/json; charset=utf-8");
		expect(response.headers.get("Cache-Control")).toBe("public, max-age=3600");
		expect(docs.name).toBe("Aspekt Avatar API");
		expect(docs.base_url).toBe("https://avatar.aspekt.systems");
		expect(browserPreview.response_type).toBe("text/html; charset=utf-8");
		expect(docs.docs).toBe("https://avatar.aspekt.systems/docs.json?aspekt=docs");
		expect(variants.map((variant) => variant.name)).toEqual(["gradient", "glass", "solid", "grid", "triangles"]);
		expect(queryParameters).toHaveProperty("size");
		expect(queryParameters).toHaveProperty("radius");
		expect(queryParameters).toHaveProperty("initials");
		expect(examples).toContain("https://avatar.aspekt.systems/gradient/nova-river?size=256&radius=full");
		expect(examples).toContain("https://avatar.aspekt.systems/glass/nova-river?size=256&radius=full");
		expect(examples).toContain("https://avatar.aspekt.systems/triangles/nova-river?size=256&radius=full");
	});

	it("serves a centered dark HTML preview for browser tab requests", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/glass/nova-river?size=256&radius=full", {
			headers: { Accept: "text/html" },
		});
		const html = await response.text();

		expect(response.headers.get("Content-Type")).toBe("text/html; charset=utf-8");
		expect(response.headers.get("Vary")).toBe("Accept, Sec-Fetch-Dest");
		expect(html).toContain("background: #111111");
		expect(html).toContain("place-items: center");
		expect(html).toContain("width: min(256px, calc(100vmin - 48px))");
		expect(html).toContain("<svg");
		expect(html).toContain('aria-label="nova-river"');
	});

	it("keeps docs-looking URLs available as avatar seeds", async () => {
		const docsResponse = await SELF.fetch("https://avatar.aspekt.systems/docs");
		const docsSvg = await readSvg(docsResponse);
		const docsJsonResponse = await SELF.fetch("https://avatar.aspekt.systems/docs.json");
		const docsJsonSvg = await readSvg(docsJsonResponse);

		expect(docsResponse.status).toBe(200);
		expect(docsResponse.headers.get("Content-Type")).toBe("image/svg+xml; charset=utf-8");
		expect(docsSvg).toContain('aria-label="docs"');
		expect(docsJsonResponse.status).toBe(200);
		expect(docsJsonResponse.headers.get("Content-Type")).toBe("image/svg+xml; charset=utf-8");
		expect(docsJsonSvg).toContain('aria-label="docs.json"');
	});

	it("uses gradient avatars without initials for seed-only URLs", async () => {
		const request = new IncomingRequest("https://avatar.aspekt.systems/mira-slate");
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		const svg = await readSvg(response);

		expect(response.headers.get("Content-Type")).toBe("image/svg+xml; charset=utf-8");
		expect(response.headers.get("Cache-Control")).toBe("public, max-age=31536000, immutable");
		expect(svg).toContain('role="img"');
		expect(svg).toContain('aria-label="mira-slate"');
		expect(svg).toContain("<title>mira-slate (128x128)</title>");
		expect(svg).toContain('rx="0"');
		expect(svg).toContain("<filter");
		expect(svg).toContain("<feGaussianBlur");
		expect(svg).toContain("<path");
		expect(svg).not.toContain("<linearGradient");
		expect(svg).not.toContain("<circle");
		expect(svg).not.toContain("<text");
	});

	it("adds initials to seed-only URLs when requested", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/mira-slate?initials");
		const svg = await readSvg(response);

		expect(svg).toContain("<filter");
		expect(svg).toContain(">MS</text>");
	});

	it("supports gradient variant URLs without initials by default", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/gradient/nova-river");
		const svg = await readSvg(response);

		expect(svg).toContain('aria-label="nova-river"');
		expect(svg).toContain("<title>nova-river (128x128)</title>");
		expect(svg).toContain("<filter");
		expect(svg).toContain("<feGaussianBlur");
		expect(svg).toContain("<path");
		expect(svg).toContain("mix-blend-mode: overlay");
		expect(svg).toContain('rx="0"');
		expect(svg).not.toContain("<linearGradient");
		expect(svg).not.toContain("<radialGradient");
		expect(svg).not.toContain("<text");
	});

	it("supports glass variant URLs as glossy gradient avatars", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/glass/nova-river?radius=full");
		const svg = await readSvg(response);

		expect(svg).toContain('aria-label="nova-river"');
		expect(svg).toContain("<filter");
		expect(svg).toContain("<path");
		expect(svg).toContain("<linearGradient");
		expect(svg).toContain("<radialGradient");
		expect(svg).toContain("glass-shade");
		expect(svg).toContain("glass-sheen");
		expect(svg).toContain("glass-glow");
		expect(svg).toContain("glass-depth");
		expect(svg).toContain("glass-border");
		expect(svg).toContain('stop-opacity="0.88"');
		expect(svg).toContain('stop-opacity="0.86"');
		expect(svg).toContain('stop-opacity="0.3"');
		expect(svg).toContain('stop-opacity="0.98"');
		expect(svg).toContain('fill="none" stroke="url(#avatar-glass-');
		expect(svg.match(/stroke="url\(#avatar-glass-/g)).toHaveLength(1);
		expect(svg).toContain('stroke-width="3"');
		expect(svg).toContain('rx="62.5"');
		expect(svg).not.toContain("glass-inner");
		expect(svg).not.toContain("glass-flare");
		expect(svg).not.toContain("glass-streak");
		expect(svg).not.toContain("<polygon");
		expect(svg).not.toContain("<text");
	});

	it("supports grid variant URLs as an 8 by 8 tile avatar", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/grid/nova-river");
		const svg = await readSvg(response);

		expect(svg).toContain('aria-label="nova-river"');
		expect(svg).toContain('rx="0"');
		expect(svg).toContain('shape-rendering="crispEdges"');
		expect(svg.match(/width="10" height="10"/g)).toHaveLength(64);
		expect(svg).not.toContain('fill="#000000" opacity="0.28"');
		expect(svg).not.toContain("<filter");
		expect(svg).not.toContain("<text");
	});

	it("supports triangles variant URLs as triangular tile mosaics", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/triangles/nova-river");
		const svg = await readSvg(response);

		expect(svg).toContain('aria-label="nova-river"');
		expect(svg).toContain("<title>nova-river (128x128)</title>");
		expect(svg).toContain('shape-rendering="crispEdges"');
		expect(svg).toContain("<polygon");
		expect(svg).toContain('rx="0"');
		expect(svg.match(/<polygon/g)?.length ?? 0).toBeGreaterThan(40);
		expect(new Set([...svg.matchAll(/<polygon[^>]+fill="(#[0-9A-F]{6})"/g)].map((match) => match[1])).size).toBeGreaterThan(1);
		expect(svg).not.toContain("<circle");
		expect(svg).not.toContain("<ellipse");
		expect(svg).not.toContain("<radialGradient");
		expect(svg).not.toContain("<text");
	});

	it("varies triangle color families by seed", async () => {
		const seeds = ["nova-river", "ember-cove", "pixel-vale"];
		const svgs = await Promise.all(
			seeds.map(async (seed) => readSvg(await SELF.fetch(`https://avatar.aspekt.systems/triangles/${seed}`))),
		);
		const backgrounds = new Set(svgs.map((svg) => svg.match(/<rect width="128" height="128" fill="(#[0-9A-F]{6})"/)?.[1]));

		expect(backgrounds.size).toBeGreaterThan(1);
	});

	it("adds initials to explicit variant URLs with the initials addon", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/solid/nova-river?initials");
		const svg = await readSvg(response);

		expect(svg).toContain(">NR</text>");
		expect(svg).not.toContain("<linearGradient");
		expect(svg).not.toContain("<circle");
		expect(svg).not.toContain("<path");
	});

	it("adds initials to grid URLs with the initials addon", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/grid/nova-river?initials");
		const svg = await readSvg(response);

		expect(svg).toContain(">NR</text>");
		expect(svg).toContain('<rect width="128" height="128" fill="#000000" opacity="0.28"/>');
		expect(svg.indexOf('fill="#000000" opacity="0.28"')).toBeLessThan(svg.indexOf(">NR</text>"));
		expect(svg.match(/width="10" height="10"/g)).toHaveLength(64);
	});

	it("can turn initials off explicitly", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/solid/nova-river?initials=false");
		const svg = await readSvg(response);

		expect(svg).not.toContain("<text");
	});

	it("clamps size and supports full radius", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/gradient/pixel-vale?size=999&radius=full&initials=true");
		const svg = await readSvg(response);

		expect(svg).toContain('width="512"');
		expect(svg).toContain('height="512"');
		expect(svg).toContain("<title>pixel-vale (512x512)</title>");
		expect(svg).toContain('rx="256"');
		expect(svg).toContain(">PV</text>");
	});
});
