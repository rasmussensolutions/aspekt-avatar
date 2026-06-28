type Variant = 'gradient' | 'grid' | 'solid' | 'triangles';

type SolidPalette = {
	background: string;
	foreground: string;
	accent: string;
};

type GradientPalette = {
	base: string;
	primary: string;
	secondary: string;
	foreground: string;
};

type TrianglePalette = {
	background: string;
	fills: readonly [string, string, string];
	foreground: string;
};

const variants = ['gradient', 'grid', 'solid', 'triangles'] as const satisfies readonly Variant[];

const solidPalettes = [
	{ background: '#E7C269', foreground: '#6F4700', accent: '#F2B94B' },
	{ background: '#AFC5FF', foreground: '#2645A8', accent: '#7BA4FF' },
	{ background: '#98DDB4', foreground: '#0E5835', accent: '#5FC48A' },
	{ background: '#FFC57B', foreground: '#7D3E00', accent: '#FFB457' },
	{ background: '#CDBAFF', foreground: '#4F349F', accent: '#A78BFA' },
	{ background: '#D9DE8A', foreground: '#4A5300', accent: '#CCD36E' },
	{ background: '#A7E1E7', foreground: '#005E67', accent: '#70D4DF' },
	{ background: '#FFB0BE', foreground: '#8B1630', accent: '#FF7A96' },
] as const satisfies readonly SolidPalette[];

const gradientPalettes = [
	{ base: '#35D1BE', primary: '#00686C', secondary: '#95F3D6', foreground: '#063A3D' },
	{ base: '#FF9915', primary: '#00686C', secondary: '#32C2B9', foreground: '#FFFFFF' },
	{ base: '#02C7AE', primary: '#005B61', secondary: '#85F2E0', foreground: '#FFFFFF' },
	{ base: '#B8F28A', primary: '#34C3B3', secondary: '#F7F2A7', foreground: '#17443B' },
	{ base: '#F6F4A8', primary: '#7CE7B2', secondary: '#38BDB0', foreground: '#264130' },
	{ base: '#18D2AF', primary: '#007075', secondary: '#7BF5DE', foreground: '#043A3C' },
	{ base: '#FFD21F', primary: '#FF9F1C', secondary: '#FFF6A8', foreground: '#513400' },
	{ base: '#FFB000', primary: '#FF6F1A', secondary: '#FFE666', foreground: '#4A2600' },
	{ base: '#FFE45C', primary: '#FFF5A8', secondary: '#F2F1B5', foreground: '#4C4300' },
	{ base: '#FF9915', primary: '#00686C', secondary: '#FFE05C', foreground: '#FFFFFF' },
] as const satisfies readonly GradientPalette[];

const trianglePalettes = [
	{ background: '#FFB37E', fills: ['#B94A00', '#8F2F00', '#F97316'], foreground: '#FFF7ED' },
	{ background: '#A7F3D0', fills: ['#047857', '#065F46', '#14B8A6'], foreground: '#F0FDFA' },
	{ background: '#BFDBFE', fills: ['#1D4ED8', '#1E3A8A', '#38BDF8'], foreground: '#EFF6FF' },
	{ background: '#DDD6FE', fills: ['#6D28D9', '#4C1D95', '#A855F7'], foreground: '#F5F3FF' },
	{ background: '#FBCFE8', fills: ['#BE185D', '#9D174D', '#FB7185'], foreground: '#FFF1F2' },
	{ background: '#FDE68A', fills: ['#B45309', '#854D0E', '#EAB308'], foreground: '#FFF7ED' },
	{ background: '#BAE6FD', fills: ['#0369A1', '#075985', '#22D3EE'], foreground: '#F0F9FF' },
] as const satisfies readonly TrianglePalette[];

const gridColors = ['#00686c', '#ff9915', '#32c2b9', '#edecb3', '#fad928'] as const;

export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (isDocsRoute(url)) {
			return createDocsResponse(url.origin);
		}

		const route = readRoute(url.pathname);
		const size = readSize(url.searchParams.get('size'));
		const radius = readRadius(url.searchParams.get('radius'), size);
		const showInitials = readInitials(url.searchParams, !route.hasExplicitVariant);

		const svg = createAvatarSvg({
			seed: route.seed,
			size,
			radius,
			variant: route.variant,
			showInitials,
		});

		return new Response(svg, {
			headers: {
				'Content-Type': 'image/svg+xml; charset=utf-8',
				'Cache-Control': 'public, max-age=31536000, immutable',
				'X-Content-Type-Options': 'nosniff',
			},
		});
	},
} satisfies ExportedHandler<Env>;

function createDocsResponse(origin: string): Response {
	const docs = {
		name: 'Aspekt Avatar API',
		description: 'Generate deterministic SVG avatars from a URL seed.',
		base_url: origin,
		response_type: 'image/svg+xml; charset=utf-8',
		docs: `${origin}/docs.json?aspekt=docs`,
		endpoints: [
			{
				method: 'GET',
				path: '/:seed',
				description: 'Generate the default solid avatar for a seed. Initials are shown by default on legacy seed URLs.',
				example: `${origin}/mira-slate`,
			},
			{
				method: 'GET',
				path: '/:variant/:seed',
				description: 'Generate an avatar with an explicit variant. Initials are hidden by default unless the initials query parameter is enabled.',
				example: `${origin}/gradient/nova-river?size=256&radius=full&initials=true`,
			},
		],
		variants: [
			{
				name: 'solid',
				description: 'Flat background color with optional initials.',
				default_for_legacy_seed_urls: true,
			},
			{
				name: 'gradient',
				description: 'Soft abstract gradient shapes generated from the seed.',
			},
			{
				name: 'grid',
				description: 'Seeded 8 by 8 tile pattern.',
			},
			{
				name: 'triangles',
				description: 'Seeded triangular tile mosaic inspired by folded paper patterns.',
			},
		],
		query_parameters: {
			size: {
				type: 'integer',
				default: 128,
				min: 32,
				max: 512,
				behavior: 'Values are rounded to the nearest integer and clamped to the allowed range.',
				example: 'size=256',
			},
			radius: {
				type: 'integer | "full" | "none"',
				default: 0,
				min: 0,
				max: 'size / 2',
				behavior: '"full" makes the avatar circular; "none" and invalid values use square corners.',
				example: 'radius=full',
			},
			initials: {
				type: 'boolean flag',
				defaults: {
					legacy_seed_url: true,
					explicit_variant_url: false,
				},
				true_values: ['', '1', 'true', 'yes', 'on'],
				false_values: ['0', 'false', 'no', 'off'],
				behavior: 'Unknown values are treated as true.',
				example: 'initials=true',
			},
		},
		examples: [
			`${origin}/mira-slate`,
			`${origin}/solid/nova-river?initials=false`,
			`${origin}/gradient/nova-river?size=256&radius=full`,
			`${origin}/grid/nova-river?initials`,
			`${origin}/triangles/nova-river?size=256&radius=full`,
		],
	} as const;

	return new Response(JSON.stringify(docs, null, 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
			'X-Content-Type-Options': 'nosniff',
		},
	});
}

function createAvatarSvg(options: {
	seed: string;
	size: number;
	radius: number;
	variant: Variant;
	showInitials: boolean;
}): string {
	const { seed, size, radius, variant, showInitials } = options;

	const hash = hashString(seed);
	const id = `avatar-${variant}-${hash.toString(36)}-${size}-${Math.round(radius)}`;
	const paint = createPaint(variant, size, hash, id);
	const initials = getInitials(seed);
	const title = `${seed} (${size}x${size})`;
	const fontSize = Math.round(size * 0.36);
	const y = Math.round(size * 0.53);
	const needsTextOverlay = showInitials && (variant === 'grid' || variant === 'triangles');
	const textOverlay = needsTextOverlay ? `<rect width="${size}" height="${size}" fill="#000000" opacity="0.28"/>` : '';
	const text = showInitials
		? `
  <text
    x="50%"
    y="${y}"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-size="${fontSize}"
    font-weight="700"
    letter-spacing="0"
    fill="${paint.foreground}"
  >${escapeXml(initials)}</text>`
		: '';

	return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${escapeXml(seed)}">
  <title>${escapeXml(title)}</title>
  <defs>
    ${paint.defs}
    <clipPath id="${id}-clip">
      <rect width="${size}" height="${size}" rx="${radius}"/>
    </clipPath>
  </defs>
  <g clip-path="url(#${id}-clip)">
    <rect width="${size}" height="${size}" fill="${paint.background}"/>
    ${paint.layers}
    ${textOverlay}
  </g>
  ${text}
</svg>`.trim();
}

function createPaint(
	variant: Variant,
	size: number,
	hash: number,
	id: string,
): { background: string; foreground: string; defs: string; layers: string } {
	switch (variant) {
		case 'gradient':
			return createGradientPaint(size, hash, id);
		case 'grid':
			return createGridPaint(size, hash);
		case 'solid':
			return createSolidPaint(size, hash);
		case 'triangles':
			return createTrianglesPaint(size, hash);
	}
}

function createSolidPaint(size: number, hash: number): { background: string; foreground: string; defs: string; layers: string } {
	const palette = pickFrom(solidPalettes, hash);

	return {
		background: palette.background,
		foreground: palette.foreground,
		defs: '',
		layers: '',
	};
}

function createGradientPaint(size: number, hash: number, id: string): { background: string; foreground: string; defs: string; layers: string } {
	const palette = pickFrom(gradientPalettes, hash >>> 4);
	const scale = size / 80;
	const firstRotation = readNumber(hash, 8, -320, 320);
	const secondRotation = readNumber(hash, 16, -320, 320);
	const firstX = readNumber(hash, 4, -8, 8);
	const firstY = readNumber(hash, 12, -8, 8);
	const secondX = readNumber(hash, 20, -8, 8);
	const secondY = readNumber(hash, 24, -8, 8);

	return {
		background: palette.base,
		foreground: palette.foreground,
		defs: `<filter id="${id}-blur" filterUnits="userSpaceOnUse" x="-20" y="-20" width="120" height="120" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="7"/>
    </filter>`,
		layers: `
  <g transform="scale(${scale})">
    <path filter="url(#${id}-blur)" d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z" fill="${palette.primary}" transform="translate(${firstX} ${firstY}) rotate(${firstRotation} 40 40) scale(1.2)"/>
    <path filter="url(#${id}-blur)" d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.216 24z" fill="${palette.secondary}" transform="translate(${secondX} ${secondY}) rotate(${secondRotation} 40 40) scale(1.2)" style="mix-blend-mode: overlay"/>
  </g>`.trim(),
	};
}

function createTrianglesPaint(size: number, hash: number): { background: string; foreground: string; defs: string; layers: string } {
	const palette = pickFrom(trianglePalettes, hash >>> 5);
	const scale = size / 80;
	const tileSize = 10;
	const triangles: string[] = [];

	for (let y = 0; y < 80; y += tileSize) {
		for (let x = 0; x < 80; x += tileSize) {
			const tileHash = hashString(`${hash}:triangles:${x}:${y}`);
			const useWideTriangle = x <= 60 && ((tileHash >>> 4) % 5 === 0);

			if (useWideTriangle) {
				const points =
					(tileHash & 1) === 0
						? `${x},${y + tileSize} ${x + tileSize * 2},${y + tileSize} ${x + tileSize},${y}`
						: `${x},${y} ${x + tileSize * 2},${y} ${x + tileSize},${y + tileSize}`;
				const fill = pickFrom(palette.fills, tileHash >>> 8);

				triangles.push(`<polygon points="${points}" fill="${fill}"/>`);
				x += tileSize;
				continue;
			}

			const points = createTrianglePoints(x, y, tileSize, tileHash % 4);
			const fill = pickFrom(palette.fills, tileHash >>> 8);

			triangles.push(`<polygon points="${points}" fill="${fill}"/>`);
		}
	}

	return {
		background: palette.background,
		foreground: palette.foreground,
		defs: '',
		layers: `
  <g transform="scale(${scale})" shape-rendering="crispEdges">
    ${triangles.join('\n    ')}
  </g>`.trim(),
	};
}

function createTrianglePoints(x: number, y: number, size: number, direction: number): string {
	switch (direction) {
		case 0:
			return `${x},${y} ${x + size},${y} ${x},${y + size}`;
		case 1:
			return `${x},${y} ${x + size},${y} ${x + size},${y + size}`;
		case 2:
			return `${x + size},${y} ${x + size},${y + size} ${x},${y + size}`;
		default:
			return `${x},${y} ${x + size},${y + size} ${x},${y + size}`;
	}
}

function createGridPaint(size: number, hash: number): { background: string; foreground: string; defs: string; layers: string } {
	const scale = size / 80;
	const cells: string[] = [];

	for (let y = 0; y < 80; y += 10) {
		for (let x = 0; x < 80; x += 10) {
			const color = pickFrom(gridColors, hashString(`${hash}:${x}:${y}`));

			cells.push(`<rect x="${x}" y="${y}" width="10" height="10" fill="${color}"/>`);
		}
	}

	return {
		background: gridColors[0],
		foreground: '#ffffff',
		defs: '',
		layers: `
  <g transform="scale(${scale})" shape-rendering="crispEdges">
    ${cells.join('\n    ')}
  </g>`.trim(),
	};
}

function isDocsRoute(url: URL): boolean {
	const path = url.pathname.replace(/\/+$/, '') || '/';

	return path === '/docs.json' && url.searchParams.get('aspekt') === 'docs';
}

function readRoute(pathname: string): { seed: string; variant: Variant; hasExplicitVariant: boolean } {
	const parts = pathname
		.split('/')
		.filter(Boolean)
		.map((part) => safeDecode(part).trim())
		.filter(Boolean);
	const first = parts[0]?.toLowerCase();
	const hasExplicitVariant = isVariant(first);
	const seedParts = hasExplicitVariant ? parts.slice(1) : parts;

	return {
		seed: seedParts.join('/').trim() || 'aspekt',
		variant: hasExplicitVariant ? first : 'solid',
		hasExplicitVariant,
	};
}

function isVariant(value: string | undefined): value is Variant {
	return variants.includes(value as Variant);
}

function safeDecode(value: string): string {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}

function readSize(value: string | null): number {
	if (!value) return 128;

	const parsed = Number(value);

	if (!Number.isFinite(parsed)) return 128;

	return Math.max(32, Math.min(512, Math.round(parsed)));
}

function readRadius(value: string | null, size: number): number {
	if (!value) return 0;

	if (value === 'full') return size / 2;
	if (value === 'none') return 0;

	const parsed = Number(value);

	if (!Number.isFinite(parsed)) return 0;

	return Math.max(0, Math.min(size / 2, Math.round(parsed)));
}

function readInitials(params: URLSearchParams, defaultValue: boolean): boolean {
	if (!params.has('initials')) return defaultValue;

	const value = params.get('initials')?.toLowerCase();

	if (!value) return true;

	if (['0', 'false', 'no', 'off'].includes(value)) return false;
	if (['1', 'true', 'yes', 'on'].includes(value)) return true;

	return true;
}

function hashString(input: string): number {
	let hash = 2166136261;

	for (let i = 0; i < input.length; i++) {
		hash ^= input.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}

	return hash >>> 0;
}

function pickFrom<T>(items: readonly T[], hash: number): T {
	return items[hash % items.length];
}

function readNumber(hash: number, shift: number, min: number, max: number): number {
	const range = max - min + 1;

	return min + ((hash >>> shift) % range);
}

function getInitials(seed: string): string {
	const clean = seed
		.replace(/[\/_.+-]+/g, ' ')
		.replace(/[^a-zA-Z0-9æøåÆØÅ ]/g, '')
		.trim();

	const parts = clean.split(/\s+/).filter(Boolean);

	if (parts.length >= 2) {
		return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
	}

	return (parts[0] || 'A').slice(0, 2).toUpperCase();
}

function escapeXml(value: string): string {
	return value.replace(/[<>&'"]/g, (char) => {
		switch (char) {
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '&':
				return '&amp;';
			case "'":
				return '&apos;';
			case '"':
				return '&quot;';
			default:
				return char;
		}
	});
}
