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

describe("avatar worker", () => {
	it("serves the favicon as a static asset", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/favicon.ico");
		const body = await response.arrayBuffer();

		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toContain("image/");
		expect(response.headers.get("Content-Type")).not.toContain("svg");
		expect(body.byteLength).toBeGreaterThan(1000);
	});

	it("keeps legacy username URLs as solid avatars with initials", async () => {
		const request = new IncomingRequest("https://avatar.aspekt.systems/mira-slate");
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		const svg = await readSvg(response);

		expect(response.headers.get("Content-Type")).toBe("image/svg+xml; charset=utf-8");
		expect(response.headers.get("Cache-Control")).toBe("public, max-age=31536000, immutable");
		expect(svg).toContain('role="img"');
		expect(svg).toContain('aria-label="mira-slate"');
		expect(svg).toContain('rx="0"');
		expect(svg).toContain(">MS</text>");
		expect(svg).not.toContain("<linearGradient");
		expect(svg).not.toContain("<circle");
		expect(svg).not.toContain("<path");
	});

	it("supports gradient variant URLs without initials by default", async () => {
		const response = await SELF.fetch("https://avatar.aspekt.systems/gradient/nova-river");
		const svg = await readSvg(response);

		expect(svg).toContain('aria-label="nova-river"');
		expect(svg).toContain("<filter");
		expect(svg).toContain("<feGaussianBlur");
		expect(svg).toContain("<path");
		expect(svg).toContain("mix-blend-mode: overlay");
		expect(svg).toContain('rx="0"');
		expect(svg).not.toContain("<linearGradient");
		expect(svg).not.toContain("<radialGradient");
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
		expect(svg).toContain('rx="256"');
		expect(svg).toContain(">PV</text>");
	});
});
