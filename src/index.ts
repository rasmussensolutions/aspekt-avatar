type Variant = 'aurora' | 'bloom' | 'crystal' | 'faces' | 'glass' | 'gradient' | 'grid' | 'orbit' | 'portrait' | 'ribbons' | 'shapes' | 'signal' | 'solid' | 'triangles';

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

type ShapePalette = {
	background: string;
	primary: string;
	secondary: string;
	accent: string;
	foreground: string;
};

type RibbonPalette = {
	background: string;
	colors: readonly [string, string, string, string];
	foreground: string;
};

type BloomPalette = {
	background: string;
	colors: readonly [string, string, string, string];
	foreground: string;
};

type AuroraPalette = {
	background: string;
	colors: readonly [string, string, string, string];
	foreground: string;
};

type OrbitPalette = {
	background: string;
	colors: readonly [string, string, string, string];
	foreground: string;
};

type CrystalPalette = {
	background: string;
	colors: readonly [string, string, string, string];
	foreground: string;
};

type FacePalette = {
	colors: readonly [string, string, string];
	foreground: string;
};

type PortraitPalette = {
	background: string;
	plane: string;
	ink: string;
	accent: string;
	foreground: string;
};

type SignalPalette = {
	light: string;
	shade: string;
	line: string;
	bar: string;
	foreground: string;
};

const variants = ['aurora', 'bloom', 'crystal', 'faces', 'glass', 'gradient', 'grid', 'orbit', 'portrait', 'ribbons', 'shapes', 'signal', 'solid', 'triangles'] as const satisfies readonly Variant[];

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

// Each palette separates a saturated base, deep shadow, and bright highlight.
const gradientPalettes = [
	{ base: '#20CBB5', primary: '#003D50', secondary: '#C8FF89', foreground: '#FFFFFF' },
	{ base: '#FF9915', primary: '#004D64', secondary: '#FFE878', foreground: '#FFFFFF' },
	{ base: '#00B8AD', primary: '#073B52', secondary: '#86FFE1', foreground: '#FFFFFF' },
	{ base: '#B4E84E', primary: '#006556', secondary: '#FFF3A0', foreground: '#17443B' },
	{ base: '#FFD21F', primary: '#A83A0B', secondary: '#FFF6B0', foreground: '#513400' },
	{ base: '#FF7D26', primary: '#792541', secondary: '#FFE666', foreground: '#FFFFFF' },
	{ base: '#3979F6', primary: '#101D63', secondary: '#78F3EC', foreground: '#FFFFFF' },
	{ base: '#7860EA', primary: '#29124F', secondary: '#FFC0E8', foreground: '#FFFFFF' },
	{ base: '#F35399', primary: '#651650', secondary: '#FFD99A', foreground: '#FFFFFF' },
	{ base: '#E95349', primary: '#661C39', secondary: '#FFCC75', foreground: '#FFFFFF' },
	{ base: '#17BADD', primary: '#123968', secondary: '#BAFFB9', foreground: '#FFFFFF' },
	{ base: '#9450DA', primary: '#30216C', secondary: '#8FF5D1', foreground: '#FFFFFF' },
	{ base: '#F33A65', primary: '#311451', secondary: '#FFA55A', foreground: '#FFFFFF' },
	{ base: '#2C50E4', primary: '#121B3D', secondary: '#CBA5FF', foreground: '#FFFFFF' },
	{ base: '#D2D943', primary: '#163F44', secondary: '#F9F2CF', foreground: '#17443B' },
	{ base: '#E87EAD', primary: '#49318C', secondary: '#A4EAFF', foreground: '#FFFFFF' },
	{ base: '#1EAE7F', primary: '#0C3048', secondary: '#F9CD65', foreground: '#FFFFFF' },
	{ base: '#FC793D', primary: '#412889', secondary: '#FFC1CB', foreground: '#FFFFFF' },
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

const shapePalettes = [
	{ background: '#F7F7FB', primary: '#70DDC0', secondary: '#39BFA8', accent: '#B8F4E3', foreground: '#124E47' },
	{ background: '#F8F6FF', primary: '#8AD9E3', secondary: '#55BED0', accent: '#C4EEF3', foreground: '#15505B' },
	{ background: '#FFF7F8', primary: '#FF9EA3', secondary: '#FF666D', accent: '#FFC8CB', foreground: '#7A2630' },
	{ background: '#FFF9F0', primary: '#FFB85C', secondary: '#F47A47', accent: '#FFE0A8', foreground: '#713314' },
	{ background: '#F8F5FF', primary: '#B8A0FF', secondary: '#8068E8', accent: '#DDD3FF', foreground: '#3C2B7B' },
	{ background: '#F5FAFF', primary: '#7EB6FF', secondary: '#3979DC', accent: '#C4DCFF', foreground: '#173E78' },
	{ background: '#FBFBEF', primary: '#D6DC69', secondary: '#9AAE35', accent: '#F0EFA5', foreground: '#465312' },
] as const satisfies readonly ShapePalette[];

const ribbonPalettes = [
	{ background: '#F7F5FF', colors: ['#7468F2', '#B39CFF', '#69D5E7', '#F1A5CF'], foreground: '#FFFFFF' },
	{ background: '#F1FBF8', colors: ['#139F91', '#63D4BD', '#B0E8D5', '#4F8ED4'], foreground: '#FFFFFF' },
	{ background: '#FFF5F1', colors: ['#FF656D', '#FF9B68', '#FFD166', '#E56891'], foreground: '#FFFFFF' },
	{ background: '#F2F7FF', colors: ['#3977E8', '#68A7FF', '#8DDBE9', '#7065DC'], foreground: '#FFFFFF' },
	{ background: '#161426', colors: ['#A58AF8', '#5EA3F5', '#F071B4', '#2ACDB7'], foreground: '#FFFFFF' },
	{ background: '#FFF9E9', colors: ['#EAA628', '#F3D459', '#8BCF87', '#4BA9A2'], foreground: '#FFFFFF' },
] as const satisfies readonly RibbonPalette[];

const bloomPalettes = [
	{ background: '#FFF8F5', colors: ['#FF6B88', '#FF9A8B', '#FFD3A5', '#E66CC7'], foreground: '#FFFFFF' },
	{ background: '#F4FBF8', colors: ['#12A88F', '#67D7B7', '#B9E86A', '#4BA7D8'], foreground: '#FFFFFF' },
	{ background: '#F8F5FF', colors: ['#745EF1', '#A888F7', '#E28ED8', '#76C7E8'], foreground: '#FFFFFF' },
	{ background: '#FFF9E9', colors: ['#F4A52E', '#F6D34F', '#EF7A73', '#D65C9B'], foreground: '#FFFFFF' },
	{ background: '#F2F8FF', colors: ['#3178E7', '#66B5F4', '#70D9D0', '#7367DF'], foreground: '#FFFFFF' },
	{ background: '#181528', colors: ['#FF7DB5', '#A77BF3', '#5BC8EF', '#59DBB2'], foreground: '#FFFFFF' },
] as const satisfies readonly BloomPalette[];

const auroraPalettes = [
	{ background: '#090F24', colors: ['#21D4B4', '#43A5F5', '#8069F2', '#F46FB3'], foreground: '#FFFFFF' },
	{ background: '#171027', colors: ['#F071B8', '#A66CF2', '#5AA9F4', '#58D6BE'], foreground: '#FFFFFF' },
	{ background: '#071D25', colors: ['#55E1C1', '#83E779', '#43B7E8', '#6D72F3'], foreground: '#FFFFFF' },
	{ background: '#23101B', colors: ['#FF745F', '#F6B84B', '#E965A8', '#8D6AF2'], foreground: '#FFFFFF' },
	{ background: '#0C1830', colors: ['#60C6FF', '#637CF4', '#A36AEF', '#F277C6'], foreground: '#FFFFFF' },
	{ background: '#111B18', colors: ['#8DE978', '#30D1A8', '#37A8E8', '#D2E65A'], foreground: '#FFFFFF' },
] as const satisfies readonly AuroraPalette[];

const orbitPalettes = [
	{ background: '#F5F7FF', colors: ['#5D69EB', '#8C78F4', '#56C6E6', '#E878B7'], foreground: '#FFFFFF' },
	{ background: '#F2FBF8', colors: ['#159E8D', '#5ED2B4', '#67B7EB', '#7C6EE7'], foreground: '#FFFFFF' },
	{ background: '#FFF7F3', colors: ['#F06B72', '#F6A04D', '#E569A4', '#8A71EA'], foreground: '#FFFFFF' },
	{ background: '#151426', colors: ['#8D79F4', '#59B4F0', '#54D5B3', '#F278B7'], foreground: '#FFFFFF' },
	{ background: '#0C2030', colors: ['#55D5C2', '#59A8EF', '#8C74F0', '#F083BB'], foreground: '#FFFFFF' },
	{ background: '#FFF9E8', colors: ['#E9A32A', '#E9D54F', '#65C39D', '#4E9FD4'], foreground: '#FFFFFF' },
] as const satisfies readonly OrbitPalette[];

const crystalPalettes = [
	{ background: '#F4F7FF', colors: ['#486FE7', '#65B8EF', '#7AE0D0', '#8069E8'], foreground: '#FFFFFF' },
	{ background: '#FFF5F6', colors: ['#F05F79', '#F59A76', '#F3C85A', '#D762B0'], foreground: '#FFFFFF' },
	{ background: '#F6F3FF', colors: ['#715CE5', '#9B7AF1', '#DB80D1', '#62C3E0'], foreground: '#FFFFFF' },
	{ background: '#F2FBF6', colors: ['#149D82', '#59CC9D', '#A5D95A', '#49A9D1'], foreground: '#FFFFFF' },
	{ background: '#181526', colors: ['#A17DF2', '#5DB8EF', '#55D7B0', '#EE76B2'], foreground: '#FFFFFF' },
	{ background: '#FFF9E9', colors: ['#E8992D', '#F2CF4E', '#EC7371', '#A665D8'], foreground: '#FFFFFF' },
] as const satisfies readonly CrystalPalette[];

const facePalettes = [
	{ colors: ['#B994FF', '#8158F3', '#6840D8'], foreground: '#FFFFFF' },
	{ colors: ['#78C5FF', '#358FE8', '#2468C6'], foreground: '#FFFFFF' },
	{ colors: ['#FF8AD0', '#DE42A8', '#B62A89'], foreground: '#FFFFFF' },
	{ colors: ['#FF8A82', '#F24940', '#CC302C'], foreground: '#FFFFFF' },
	{ colors: ['#FFBE6B', '#F58A24', '#D96813'], foreground: '#FFFFFF' },
	{ colors: ['#74DFC8', '#28AB98', '#168174'], foreground: '#FFFFFF' },
] as const satisfies readonly FacePalette[];

const portraitPalettes = [
	{ background: '#FFE6C7', plane: '#FF8A65', ink: '#57213A', accent: '#FFF8E9', foreground: '#FFFFFF' },
	{ background: '#A9D8FF', plane: '#4F73E8', ink: '#17245A', accent: '#FFFFFF', foreground: '#FFFFFF' },
	{ background: '#BDEBD5', plane: '#3BB8A0', ink: '#123E3A', accent: '#FFFDF4', foreground: '#FFFFFF' },
	{ background: '#FFE36E', plane: '#FF9E45', ink: '#53311C', accent: '#FFF9DD', foreground: '#FFFFFF' },
	{ background: '#F7B6DE', plane: '#A768E8', ink: '#4A235E', accent: '#FFF7FC', foreground: '#FFFFFF' },
	{ background: '#8D91F4', plane: '#43D6D0', ink: '#172354', accent: '#FFFFFF', foreground: '#FFFFFF' },
] as const satisfies readonly PortraitPalette[];

const signalPalettes = [
	{ light: '#FFF5B3', shade: '#FFE56D', line: '#FFD635', bar: '#FFCA05', foreground: '#FFFFFF' },
	{ light: '#DBFAFF', shade: '#91E6F4', line: '#4BC9E8', bar: '#00A9D7', foreground: '#FFFFFF' },
	{ light: '#F4E8FF', shade: '#CDA8F6', line: '#AA76E8', bar: '#8C4CD9', foreground: '#FFFFFF' },
	{ light: '#E7FFE7', shade: '#ACEFC0', line: '#71D99A', bar: '#38BD78', foreground: '#FFFFFF' },
	{ light: '#FFE6E4', shade: '#FFADA8', line: '#FF7D7F', bar: '#F35168', foreground: '#FFFFFF' },
	{ light: '#FFF0DA', shade: '#FFD09A', line: '#FFAB5C', bar: '#F58130', foreground: '#FFFFFF' },
	{ light: '#DFFCF5', shade: '#9DE9D7', line: '#5BCDBA', bar: '#16A995', foreground: '#FFFFFF' },
] as const satisfies readonly SignalPalette[];

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
		const showInitials = readInitials(url.searchParams, false);

		const svg = createAvatarSvg({
			seed: route.seed,
			size,
			radius,
			variant: route.variant,
			showInitials,
		});

		if (shouldRenderPreview(request)) {
			return createPreviewResponse({
				seed: route.seed,
				size,
				svg,
			});
		}

		return new Response(svg, {
			headers: {
				'Content-Type': 'image/svg+xml; charset=utf-8',
				'Cache-Control': 'public, max-age=31536000, immutable',
				'X-Content-Type-Options': 'nosniff',
				'Vary': 'Accept, Sec-Fetch-Dest',
			},
		});
	},
} satisfies ExportedHandler<Env>;

function createPreviewResponse(options: { seed: string; size: number; svg: string }): Response {
	const { seed, size, svg } = options;
	const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeXml(seed)} avatar preview</title>
  <style>
    html,
    body {
      min-height: 100%;
      margin: 0;
      background: #111111;
    }

    body {
      min-height: 100svh;
      display: grid;
      place-items: center;
      padding: 24px;
      box-sizing: border-box;
    }

    svg {
      display: block;
      width: min(${size}px, calc(100vmin - 48px));
      max-width: 100%;
      height: auto;
      filter: drop-shadow(0 24px 64px rgb(0 0 0 / 48%));
    }
  </style>
</head>
<body>
  ${svg}
</body>
</html>`;

	return new Response(html, {
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
			'Cache-Control': 'public, max-age=31536000, immutable',
			'X-Content-Type-Options': 'nosniff',
			'Vary': 'Accept, Sec-Fetch-Dest',
		},
	});
}

function shouldRenderPreview(request: Request): boolean {
	const destination = request.headers.get('Sec-Fetch-Dest')?.toLowerCase();

	if (destination === 'document') return true;
	if (destination && destination !== 'empty') return false;

	return request.headers.get('Accept')?.toLowerCase().includes('text/html') ?? false;
}

function createDocsResponse(origin: string): Response {
	const docs = {
		name: 'Aspekt Avatar API',
		description: 'Generate deterministic SVG avatars from a URL seed.',
		base_url: origin,
		response_type: 'image/svg+xml; charset=utf-8',
		browser_preview: {
			response_type: 'text/html; charset=utf-8',
			behavior: 'Browser document requests receive a centered preview page. Image and API requests receive raw SVG.',
		},
		docs: `${origin}/docs.json?aspekt=docs`,
		endpoints: [
			{
				method: 'GET',
				path: '/:seed',
				description: 'Generate the default gradient avatar for a seed. Initials are hidden by default unless the initials query parameter is enabled.',
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
				name: 'aurora',
				description: 'Layered seeded light veils with soft glow, flowing contours, and luminous color blends.',
			},
			{
				name: 'bloom',
				description: 'Seeded radial flowers with balanced petals, translucent gradients, and a luminous center.',
			},
			{
				name: 'crystal',
				description: 'Seeded radial gemstones assembled from connected facet rings and piece-specific gradients.',
			},
			{
				name: 'faces',
				description: 'Friendly seeded faces with glossy color and minimal expressive eyes filling the avatar surface.',
			},
			{
				name: 'gradient',
				description: 'Smooth color fields with contrasting palettes and varied seeded compositions.',
				default_for_seed_urls: true,
			},
			{
				name: 'glass',
				description: 'Glossy contrasting gradients with seed-specific lighting and a reflective border.',
			},
			{
				name: 'solid',
				description: 'Flat background color with optional initials.',
			},
			{
				name: 'grid',
				description: 'Seeded 8 by 8 tile pattern.',
			},
			{
				name: 'orbit',
				description: 'Seeded elliptical systems with gradient tracks, luminous pearls, and a shared center.',
			},
			{
				name: 'portrait',
				description: 'Abstract flat-color faces made from a seeded color split, two geometric eye marks, and one expressive mouth.',
			},
			{
				name: 'ribbons',
				description: 'Smooth seeded ribbon weaves with coordinated curves, crossings, and satin gradients.',
			},
			{
				name: 'shapes',
				description: 'Seeded geometric constructions with balanced symmetry, nested rings, and piece-specific gradients.',
			},
			{
				name: 'signal',
				description: 'Full-canvas fine horizontal lines and seeded rectangular signal bars, with color palettes selected by seed. Use radius=full for a circular avatar.',
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
					seed_url: false,
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
			`${origin}/aurora/nova-river?size=256&radius=full`,
			`${origin}/bloom/nova-river?size=256&radius=full`,
			`${origin}/crystal/nova-river?size=256&radius=full`,
			`${origin}/faces/nova-river?size=256&radius=full`,
			`${origin}/solid/nova-river`,
			`${origin}/gradient/nova-river?size=256&radius=full`,
			`${origin}/glass/nova-river?size=256&radius=full`,
			`${origin}/grid/nova-river?initials`,
			`${origin}/orbit/nova-river?size=256&radius=full`,
			`${origin}/portrait/nova-river?size=256&radius=full`,
			`${origin}/ribbons/nova-river?size=256&radius=full`,
			`${origin}/shapes/nova-river?size=256&radius=full`,
			`${origin}/signal/nova-river?size=256&radius=full`,
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
	const paint = createPaint(variant, size, hash, id, radius);
	const initials = getInitials(seed);
	const title = `${seed} (${size}x${size})`;
	const fontSize = Math.round(size * 0.36);
	const y = Math.round(size * 0.53);
	const needsTextOverlay =
		showInitials &&
		(variant === 'aurora' ||
			variant === 'bloom' ||
			variant === 'crystal' ||
			variant === 'faces' ||
			variant === 'grid' ||
			variant === 'orbit' ||
			variant === 'portrait' ||
			variant === 'ribbons' ||
			variant === 'shapes' ||
			variant === 'signal' ||
			variant === 'triangles');
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
	radius: number,
): { background: string; foreground: string; defs: string; layers: string } {
	switch (variant) {
		case 'aurora':
			return createAuroraPaint(size, hash, id);
		case 'bloom':
			return createBloomPaint(size, hash, id);
		case 'crystal':
			return createCrystalPaint(size, hash, id);
		case 'faces':
			return createFacesPaint(size, hash, id);
		case 'glass':
			return createGlassPaint(size, hash, id, radius);
		case 'gradient':
			return createGradientPaint(size, hash, id);
		case 'grid':
			return createGridPaint(size, hash);
		case 'orbit':
			return createOrbitPaint(size, hash, id);
		case 'portrait':
			return createPortraitPaint(size, hash);
		case 'ribbons':
			return createRibbonsPaint(size, hash, id);
		case 'shapes':
			return createShapesPaint(size, hash, id);
		case 'signal':
			return createSignalPaint(size, hash, id);
		case 'solid':
			return createSolidPaint(size, hash);
		case 'triangles':
			return createTrianglesPaint(size, hash);
	}
}

function createBloomPaint(size: number, hash: number, id: string): { background: string; foreground: string; defs: string; layers: string } {
	const random = createDeterministicRandom(hashString(`${hash}:bloom`));
	const palette = bloomPalettes[randomInteger(random, 0, bloomPalettes.length - 1)];
	const petalCount = randomInteger(random, 5, 9);
	const rotation = randomBetween(random, 0, 360 / petalCount);
	const petalLength = randomBetween(random, 26, 33);
	const petalWidth = randomBetween(random, 9.5, 13.5) * Math.sqrt(7 / petalCount);
	const tipLean = randomBetween(random, -3.4, 3.4);
	const innerScale = randomBetween(random, 0.48, 0.62);
	const innerTwist = randomBetween(random, -11, 11);
	const centerRadius = randomBetween(random, 5.5, 8);
	const scale = size / 80;
	const petalPath = createPetalPath(petalLength, petalWidth, tipLean);
	const innerPetalPath = createPetalPath(petalLength * innerScale, petalWidth * innerScale, -tipLean * 0.45);
	const gradients: string[] = [];
	const outerPetals: string[] = [];
	const innerPetals: string[] = [];

	for (let index = 0; index < petalCount; index++) {
		const angle = rotation + index * (360 / petalCount);
		const gradientId = `${id}-bloom-${index}`;
		const start = palette.colors[index % palette.colors.length];
		const middle = palette.colors[(index + 1) % palette.colors.length];
		const end = palette.colors[(index + 2) % palette.colors.length];

		gradients.push(createShapeGradient(gradientId, angle + 34, start, middle, end));
		outerPetals.push(
			`<path data-petal="${index}" d="${petalPath}" fill="url(#${gradientId})" fill-opacity="0.9" stroke="${palette.background}" stroke-opacity="0.72" stroke-width="0.8" transform="rotate(${formatSvgNumber(angle)} 40 40)" filter="url(#${id}-bloom-shadow)"/>`,
		);
		innerPetals.push(
			`<path d="${innerPetalPath}" fill="url(#${gradientId})" fill-opacity="0.58" stroke="#FFFFFF" stroke-opacity="0.22" stroke-width="0.55" transform="rotate(${formatSvgNumber(angle + 180 / petalCount + innerTwist)} 40 40)"/>`,
		);
	}

	return {
		background: palette.background,
		foreground: palette.foreground,
		defs: `${gradients.join('\n    ')}
    <radialGradient id="${id}-bloom-center" cx="38%" cy="34%" r="68%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="36%" stop-color="${palette.colors[2]}"/>
      <stop offset="100%" stop-color="${palette.colors[0]}"/>
    </radialGradient>
    <radialGradient id="${id}-bloom-halo">
      <stop offset="0%" stop-color="${palette.colors[1]}" stop-opacity="0.24"/>
      <stop offset="100%" stop-color="${palette.colors[1]}" stop-opacity="0"/>
    </radialGradient>
    <filter id="${id}-bloom-shadow" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#21153D" flood-opacity="0.18"/>
    </filter>`,
		layers: `<g transform="scale(${formatSvgNumber(scale)})">
    <g data-generated="bloom" data-petals="${petalCount}">
      <circle cx="40" cy="40" r="35" fill="url(#${id}-bloom-halo)"/>
      ${outerPetals.join('\n      ')}
      ${innerPetals.join('\n      ')}
      <circle cx="40" cy="40" r="${formatSvgNumber(centerRadius + 1.5)}" fill="${palette.background}" fill-opacity="0.72"/>
      <circle cx="40" cy="40" r="${formatSvgNumber(centerRadius)}" fill="url(#${id}-bloom-center)" stroke="#FFFFFF" stroke-opacity="0.48" stroke-width="0.8"/>
      <circle cx="${formatSvgNumber(40 - centerRadius * 0.24)}" cy="${formatSvgNumber(40 - centerRadius * 0.3)}" r="${formatSvgNumber(centerRadius * 0.19)}" fill="#FFFFFF" fill-opacity="0.62"/>
    </g>
  </g>`,
	};
}

function createPetalPath(length: number, width: number, tipLean: number): string {
	const tipX = 40 + tipLean;
	const tipY = 40 - length;
	const shoulderY = 40 - length * 0.42;
	const tipControlY = tipY + length * 0.18;

	return [
		'M 40 42',
		`C ${formatSvgNumber(40 - width)} ${formatSvgNumber(shoulderY)} ${formatSvgNumber(tipX - width * 0.42)} ${formatSvgNumber(tipControlY)} ${formatSvgNumber(tipX)} ${formatSvgNumber(tipY)}`,
		`C ${formatSvgNumber(tipX + width * 0.42)} ${formatSvgNumber(tipControlY)} ${formatSvgNumber(40 + width)} ${formatSvgNumber(shoulderY)} 40 42`,
		'Z',
	].join(' ');
}

function createFacesPaint(size: number, hash: number, id: string): { background: string; foreground: string; defs: string; layers: string } {
	const random = createDeterministicRandom(hashString(`${hash}:faces`));
	const palette = facePalettes[randomInteger(random, 0, facePalettes.length - 1)];
	const expression = randomInteger(random, 0, 3);
	const scale = size / 80;
	const eyeCenterY = randomBetween(random, 37, 42);
	const eyeSpacing = randomBetween(random, 9, 12);
	const expressionSettings = [
		{ width: 5.2, height: 9.5, leftRotation: -4, rightRotation: 4 },
		{ width: 8.5, height: 4.4, leftRotation: 14, rightRotation: -14 },
		{ width: 5.4, height: 9, leftRotation: -14, rightRotation: -6 },
		{ width: 5.2, height: 6.6, leftRotation: 2, rightRotation: -2 },
	] as const;
	const eyes = expressionSettings[expression];
	const leftX = 40 - eyeSpacing;
	const rightX = 40 + eyeSpacing;
	const eye = (side: 'left' | 'right', centerX: number, eyeRotation: number) => {
		const x = centerX - eyes.width / 2;
		const y = eyeCenterY - eyes.height / 2;

		return `<rect data-eye="${side}" x="${formatSvgNumber(x)}" y="${formatSvgNumber(y)}" width="${formatSvgNumber(eyes.width)}" height="${formatSvgNumber(eyes.height)}" rx="${formatSvgNumber(Math.min(eyes.width, eyes.height) / 2)}" fill="#FFFFFF" fill-opacity="0.94" transform="rotate(${formatSvgNumber(eyeRotation)} ${formatSvgNumber(centerX)} ${formatSvgNumber(eyeCenterY)})" filter="url(#${id}-face-eye-glow)"/>`;
	};

	return {
		background: `url(#${id}-face-body)`,
		foreground: palette.foreground,
		defs: `<linearGradient id="${id}-face-body" x1="12%" y1="8%" x2="88%" y2="92%">
      <stop offset="0%" stop-color="${palette.colors[0]}"/>
      <stop offset="58%" stop-color="${palette.colors[1]}"/>
      <stop offset="100%" stop-color="${palette.colors[2]}"/>
    </linearGradient>
    <radialGradient id="${id}-face-shine" cx="28%" cy="20%" r="54%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.7"/>
      <stop offset="48%" stop-color="#FFFFFF" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <filter id="${id}-face-eye-glow" x="-80%" y="-50%" width="260%" height="200%" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="0" stdDeviation="0.7" flood-color="#FFFFFF" flood-opacity="0.6"/>
    </filter>`,
		layers: `<g transform="scale(${formatSvgNumber(scale)})">
	<g data-generated="faces" data-face-surface="full" data-expression="${expression}">
	  <rect width="80" height="80" fill="url(#${id}-face-shine)"/>
      ${eye('left', leftX, eyes.leftRotation)}
      ${eye('right', rightX, eyes.rightRotation)}
    </g>
  </g>`,
	};
}

function createPortraitPaint(size: number, hash: number): { background: string; foreground: string; defs: string; layers: string } {
	const random = createDeterministicRandom(hashString(`${hash}:portrait`));
	const palette = portraitPalettes[randomInteger(random, 0, portraitPalettes.length - 1)];
	const expression = randomInteger(random, 0, 3);
	const scale = size / 80;
	const eyeCenterY = randomBetween(random, 35, 39);
	const eyeSpacing = randomBetween(random, 10.5, 13);
	const planeAtLeft = random() > 0.5;
	const planeEdgeTop = randomBetween(random, 25, 37);
	const planeEdgeBottom = randomBetween(random, 32, 46);
	const leftX = 40 - eyeSpacing;
	const rightX = 40 + eyeSpacing;
	const plane = planeAtLeft
		? `M 0 0 H ${formatSvgNumber(planeEdgeTop)} C ${formatSvgNumber(planeEdgeTop + 6)} 24 ${formatSvgNumber(planeEdgeBottom - 7)} 56 ${formatSvgNumber(planeEdgeBottom)} 80 H 0 Z`
		: `M ${formatSvgNumber(80 - planeEdgeTop)} 0 H 80 V 80 H ${formatSvgNumber(80 - planeEdgeBottom)} C ${formatSvgNumber(87 - planeEdgeBottom)} 56 ${formatSvgNumber(74 - planeEdgeTop)} 24 ${formatSvgNumber(80 - planeEdgeTop)} 0 Z`;
	const eye = (side: 'left' | 'right', centerX: number) => {
		switch (expression) {
			case 0:
				return `<circle data-eye="${side}" cx="${formatSvgNumber(centerX)}" cy="${formatSvgNumber(eyeCenterY)}" r="4.2" fill="${palette.ink}"/>`;
			case 1:
				return `<path data-eye="${side}" d="M ${formatSvgNumber(centerX - 5)} ${formatSvgNumber(eyeCenterY + 1)} Q ${formatSvgNumber(centerX)} ${formatSvgNumber(eyeCenterY - 5)} ${formatSvgNumber(centerX + 5)} ${formatSvgNumber(eyeCenterY + 1)}" fill="none" stroke="${palette.ink}" stroke-width="3.4" stroke-linecap="round"/>`;
			case 2: {
				const rotation = side === 'left' ? -12 : 12;
				return `<rect data-eye="${side}" x="${formatSvgNumber(centerX - 4.5)}" y="${formatSvgNumber(eyeCenterY - 2)}" width="9" height="4" rx="2" fill="${palette.ink}" transform="rotate(${rotation} ${formatSvgNumber(centerX)} ${formatSvgNumber(eyeCenterY)})"/>`;
			}
			case 3:
				return `<ellipse data-eye="${side}" cx="${formatSvgNumber(centerX)}" cy="${formatSvgNumber(eyeCenterY)}" rx="2.9" ry="5.8" fill="${palette.ink}"/>`;
		}
	};
	const mouths = [
		`<path data-mouth="smile" d="M 31 55 Q 40 64 49 55" fill="none" stroke="${palette.accent}" stroke-width="3.6" stroke-linecap="round"/>`,
		`<ellipse data-mouth="open" cx="40" cy="58" rx="4.8" ry="6" fill="${palette.accent}"/>`,
		`<path data-mouth="smirk" d="M 32 58 Q 41 61 49 54" fill="none" stroke="${palette.accent}" stroke-width="3.6" stroke-linecap="round"/>`,
		`<rect data-mouth="neutral" x="34" y="56" width="12" height="3.6" rx="1.8" fill="${palette.accent}"/>`,
	] as const;

	return {
		background: palette.background,
		foreground: palette.foreground,
		defs: '',
		layers: `<g transform="scale(${formatSvgNumber(scale)})">
	<g data-generated="portrait" data-face-surface="full" data-feature-count="3" data-expression="${expression}">
	  <path data-portrait-plane="${planeAtLeft ? 'left' : 'right'}" d="${plane}" fill="${palette.plane}"/>
	  ${eye('left', leftX)}
	  ${eye('right', rightX)}
	  ${mouths[expression]}
	</g>
  </g>`,
	};
}

function createAuroraPaint(size: number, hash: number, id: string): { background: string; foreground: string; defs: string; layers: string } {
	const random = createDeterministicRandom(hashString(`${hash}:aurora`));
	const palette = auroraPalettes[randomInteger(random, 0, auroraPalettes.length - 1)];
	const veilCount = randomInteger(random, 3, 5);
	const amplitude = randomBetween(random, 8, 14);
	const cycles = [0.75, 1, 1.25][randomInteger(random, 0, 2)];
	const phase = randomBetween(random, 0, Math.PI * 2);
	const phaseStep = randomBetween(random, 0.68, 1.12);
	const rotation = randomBetween(random, -26, 26);
	const scale = size / 80;
	const gradients: string[] = [];
	const veils: string[] = [];
	const ambientX = randomBetween(random, 25, 55);
	const ambientY = randomBetween(random, 24, 56);

	for (let index = 0; index < veilCount; index++) {
		const centerY = 4 + index * (72 / Math.max(1, veilCount - 1));
		const thickness = randomBetween(random, veilCount === 5 ? 13 : 16, veilCount === 3 ? 24 : 20);
		const layerPhase = phase + index * phaseStep;
		const path = createAuroraBandPath(centerY, amplitude, thickness, layerPhase, cycles);
		const gradientId = `${id}-aurora-${index}`;
		const colors = [
			palette.colors[index % palette.colors.length],
			palette.colors[(index + 1) % palette.colors.length],
			palette.colors[(index + 2) % palette.colors.length],
			palette.colors[(index + 3) % palette.colors.length],
		] as const;

		gradients.push(createAuroraGradient(gradientId, colors));
		veils.push(
			`<path data-veil="${index}" d="${path}" fill="url(#${gradientId})" fill-opacity="${formatSvgNumber(randomBetween(random, 0.58, 0.78))}" stroke="${colors[1]}" stroke-opacity="0.2" stroke-width="0.8" filter="url(#${id}-aurora-glow)" style="mix-blend-mode: screen"/>`,
		);
	}

	return {
		background: palette.background,
		foreground: palette.foreground,
		defs: `${gradients.join('\n    ')}
    <radialGradient id="${id}-aurora-ambient">
      <stop offset="0%" stop-color="${palette.colors[1]}" stop-opacity="0.34"/>
      <stop offset="55%" stop-color="${palette.colors[2]}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${palette.background}" stop-opacity="0"/>
    </radialGradient>
    <filter id="${id}-aurora-glow" x="-25%" y="-35%" width="150%" height="170%" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="1.35" result="soft"/>
      <feMerge>
        <feMergeNode in="soft"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>`,
		layers: `<g transform="scale(${formatSvgNumber(scale)})">
    <circle cx="${formatSvgNumber(ambientX)}" cy="${formatSvgNumber(ambientY)}" r="48" fill="url(#${id}-aurora-ambient)"/>
    <g data-generated="aurora" data-veils="${veilCount}" data-cycles="${cycles}" transform="rotate(${formatSvgNumber(rotation)} 40 40)">
      ${veils.join('\n      ')}
    </g>
  </g>`,
	};
}

function createAuroraGradient(id: string, colors: readonly [string, string, string, string]): string {
	return `<linearGradient id="${id}" x1="0%" y1="18%" x2="100%" y2="82%">
      <stop offset="0%" stop-color="${colors[0]}" stop-opacity="0.18"/>
      <stop offset="30%" stop-color="${colors[1]}" stop-opacity="0.96"/>
      <stop offset="67%" stop-color="${colors[2]}" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="${colors[3]}" stop-opacity="0.2"/>
    </linearGradient>`;
}

function createAuroraBandPath(centerY: number, amplitude: number, thickness: number, phase: number, cycles: number): string {
	const pointCount = 11;
	const top = Array.from({ length: pointCount }, (_, index) => {
		const progress = index / (pointCount - 1);
		const x = -32 + progress * 144;
		const wave = Math.sin(progress * Math.PI * 2 * cycles + phase) * amplitude;

		return { x, y: centerY - thickness / 2 + wave };
	});
	const bottom = Array.from({ length: pointCount }, (_, index) => {
		const progress = index / (pointCount - 1);
		const x = -32 + progress * 144;
		const wave = Math.sin(progress * Math.PI * 2 * cycles + phase) * amplitude;
		const drift = Math.sin(progress * Math.PI * 2 + phase * 0.65) * thickness * 0.12;

		return { x, y: centerY + thickness / 2 + wave + drift };
	}).reverse();

	return `${createSmoothPath(top)} L ${formatSvgNumber(bottom[0].x)} ${formatSvgNumber(bottom[0].y)} ${createSmoothCurveCommands(bottom).join(' ')} Z`;
}

function createOrbitPaint(size: number, hash: number, id: string): { background: string; foreground: string; defs: string; layers: string } {
	const random = createDeterministicRandom(hashString(`${hash}:orbit`));
	const palette = orbitPalettes[randomInteger(random, 0, orbitPalettes.length - 1)];
	const orbitCount = randomInteger(random, 3, 5);
	const centerX = randomBetween(random, 37, 43);
	const centerY = randomBetween(random, 37, 43);
	const baseRotation = randomBetween(random, 0, 180);
	const eccentricity = randomBetween(random, 0.38, 0.62);
	const trackWidth = randomBetween(random, 1.8, 2.8);
	const centerRadius = randomBetween(random, 4.6, 6.8);
	const scale = size / 80;
	const defs: string[] = [];
	const tracks: string[] = [];
	const pearls: string[] = [];

	for (let index = 0; index < orbitCount; index++) {
		const progress = orbitCount === 1 ? 0 : index / (orbitCount - 1);
		const radiusX = 17 + progress * 18;
		const radiusY = radiusX * Math.min(0.72, eccentricity + index * 0.035);
		const rotation = baseRotation + index * (180 / orbitCount) + randomBetween(random, -7, 7);
		const gradientId = `${id}-orbit-${index}`;
		const pearlId = `${id}-orbit-pearl-${index}`;
		const start = palette.colors[index % palette.colors.length];
		const middle = palette.colors[(index + 1) % palette.colors.length];
		const end = palette.colors[(index + 2) % palette.colors.length];
		const pearlAngle = randomBetween(random, 0, 360);
		const pearlPoint = createRotatedEllipsePoint(centerX, centerY, radiusX, radiusY, pearlAngle, rotation);
		const pearlRadius = randomBetween(random, 2.4, index === orbitCount - 1 ? 4.1 : 3.5);

		defs.push(createShapeGradient(gradientId, rotation + 32, start, middle, end));
		defs.push(`<radialGradient id="${pearlId}" cx="34%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="32%" stop-color="${middle}"/>
      <stop offset="100%" stop-color="${start}"/>
    </radialGradient>`);
		tracks.push(`<g data-orbit="${index}" transform="rotate(${formatSvgNumber(rotation)} ${formatSvgNumber(centerX)} ${formatSvgNumber(centerY)})">
        <ellipse cx="${formatSvgNumber(centerX)}" cy="${formatSvgNumber(centerY)}" rx="${formatSvgNumber(radiusX)}" ry="${formatSvgNumber(radiusY)}" fill="none" stroke="${palette.background}" stroke-width="${formatSvgNumber(trackWidth + 1.8)}" stroke-opacity="0.88"/>
        <ellipse cx="${formatSvgNumber(centerX)}" cy="${formatSvgNumber(centerY)}" rx="${formatSvgNumber(radiusX)}" ry="${formatSvgNumber(radiusY)}" fill="none" stroke="url(#${gradientId})" stroke-width="${formatSvgNumber(trackWidth)}" stroke-linecap="round"/>
        <ellipse cx="${formatSvgNumber(centerX)}" cy="${formatSvgNumber(centerY)}" rx="${formatSvgNumber(radiusX)}" ry="${formatSvgNumber(radiusY)}" fill="none" stroke="#FFFFFF" stroke-width="0.5" stroke-opacity="0.28"/>
      </g>`);
		pearls.push(`<g data-pearl="${index}" filter="url(#${id}-orbit-glow)">
        <circle cx="${formatSvgNumber(pearlPoint.x)}" cy="${formatSvgNumber(pearlPoint.y)}" r="${formatSvgNumber(pearlRadius + 1.1)}" fill="${palette.background}" fill-opacity="0.78"/>
        <circle cx="${formatSvgNumber(pearlPoint.x)}" cy="${formatSvgNumber(pearlPoint.y)}" r="${formatSvgNumber(pearlRadius)}" fill="url(#${pearlId})" stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="0.65"/>
      </g>`);
	}

	return {
		background: palette.background,
		foreground: palette.foreground,
		defs: `${defs.join('\n    ')}
    <radialGradient id="${id}-orbit-center" cx="34%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="38%" stop-color="${palette.colors[2]}"/>
      <stop offset="100%" stop-color="${palette.colors[0]}"/>
    </radialGradient>
    <radialGradient id="${id}-orbit-halo">
      <stop offset="0%" stop-color="${palette.colors[1]}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${palette.colors[1]}" stop-opacity="0"/>
    </radialGradient>
    <filter id="${id}-orbit-glow" x="-80%" y="-80%" width="260%" height="260%" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="0.8" stdDeviation="1.25" flood-color="${palette.colors[1]}" flood-opacity="0.42"/>
    </filter>`,
		layers: `<g transform="scale(${formatSvgNumber(scale)})">
    <g data-generated="orbit" data-orbits="${orbitCount}">
      <circle cx="${formatSvgNumber(centerX)}" cy="${formatSvgNumber(centerY)}" r="37" fill="url(#${id}-orbit-halo)"/>
      ${tracks.join('\n      ')}
      ${pearls.join('\n      ')}
      <circle cx="${formatSvgNumber(centerX)}" cy="${formatSvgNumber(centerY)}" r="${formatSvgNumber(centerRadius + 1.4)}" fill="${palette.background}" fill-opacity="0.8"/>
      <circle cx="${formatSvgNumber(centerX)}" cy="${formatSvgNumber(centerY)}" r="${formatSvgNumber(centerRadius)}" fill="url(#${id}-orbit-center)" stroke="#FFFFFF" stroke-opacity="0.58" stroke-width="0.75" filter="url(#${id}-orbit-glow)"/>
    </g>
  </g>`,
	};
}

function createRotatedEllipsePoint(
	centerX: number,
	centerY: number,
	radiusX: number,
	radiusY: number,
	angle: number,
	rotation: number,
): { x: number; y: number } {
	const angleRadians = (angle * Math.PI) / 180;
	const rotationRadians = (rotation * Math.PI) / 180;
	const localX = radiusX * Math.cos(angleRadians);
	const localY = radiusY * Math.sin(angleRadians);

	return {
		x: centerX + localX * Math.cos(rotationRadians) - localY * Math.sin(rotationRadians),
		y: centerY + localX * Math.sin(rotationRadians) + localY * Math.cos(rotationRadians),
	};
}

function createCrystalPaint(size: number, hash: number, id: string): { background: string; foreground: string; defs: string; layers: string } {
	const random = createDeterministicRandom(hashString(`${hash}:crystal`));
	const palette = crystalPalettes[randomInteger(random, 0, crystalPalettes.length - 1)];
	const symmetry = randomInteger(random, 5, 8);
	const step = 360 / symmetry;
	const rotation = randomBetween(random, 0, step);
	const innerRadius = randomBetween(random, 8, 11.5);
	const middleRadius = randomBetween(random, 19, 24);
	const outerRadius = randomBetween(random, 31, 35);
	const innerTwist = randomBetween(random, -step * 0.18, step * 0.18);
	const middleTwist = randomBetween(random, -step * 0.12, step * 0.12);
	const scaleX = randomBetween(random, 0.9, 1.06);
	const scaleY = randomBetween(random, 0.9, 1.06);
	const scale = size / 80;
	const innerPoints = createCrystalRing(symmetry, innerRadius, rotation + innerTwist, scaleX, scaleY);
	const middlePoints = createCrystalRing(symmetry, middleRadius, rotation + middleTwist, scaleX, scaleY);
	const outerPoints = createCrystalRing(symmetry, outerRadius, rotation, scaleX, scaleY);
	const gradients: string[] = [];
	const facets: string[] = [];
	let facetIndex = 0;

	for (let ring = 0; ring < 2; ring++) {
		const innerRing = ring === 0 ? innerPoints : middlePoints;
		const outerRing = ring === 0 ? middlePoints : outerPoints;

		for (let index = 0; index < symmetry; index++) {
			const next = (index + 1) % symmetry;
			const gradientId = `${id}-crystal-${facetIndex}`;
			const start = palette.colors[(index + ring) % palette.colors.length];
			const middle = palette.colors[(index + ring + 1) % palette.colors.length];
			const end = palette.colors[(index + ring + 2) % palette.colors.length];
			const points = [innerRing[index], innerRing[next], outerRing[next], outerRing[index]];

			gradients.push(createShapeGradient(gradientId, rotation + index * step + ring * 41, start, middle, end));
			facets.push(
				`<polygon data-facet="${facetIndex}" points="${formatSvgPoints(points)}" fill="url(#${gradientId})" stroke="${palette.background}" stroke-opacity="0.68" stroke-width="0.75"/>`,
			);
			facetIndex++;
		}
	}

	const centerGradientId = `${id}-crystal-center`;
	gradients.push(createShapeGradient(centerGradientId, rotation + 90, palette.colors[3], palette.colors[1], palette.colors[0]));

	return {
		background: palette.background,
		foreground: palette.foreground,
		defs: `${gradients.join('\n    ')}
    <radialGradient id="${id}-crystal-halo">
      <stop offset="0%" stop-color="${palette.colors[1]}" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="${palette.colors[1]}" stop-opacity="0"/>
    </radialGradient>
    <filter id="${id}-crystal-shadow" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.8" flood-color="#17132F" flood-opacity="0.22"/>
    </filter>`,
		layers: `<g transform="scale(${formatSvgNumber(scale)})">
    <circle cx="40" cy="40" r="38" fill="url(#${id}-crystal-halo)"/>
    <g data-generated="crystal" data-symmetry="${symmetry}" data-facets="${facetIndex + 1}" filter="url(#${id}-crystal-shadow)">
      ${facets.join('\n      ')}
      <polygon data-facet="${facetIndex}" points="${formatSvgPoints(innerPoints)}" fill="url(#${centerGradientId})" stroke="${palette.background}" stroke-opacity="0.7" stroke-width="0.8"/>
      <polygon points="${formatSvgPoints(outerPoints)}" fill="none" stroke="#FFFFFF" stroke-opacity="0.38" stroke-width="0.9"/>
    </g>
  </g>`,
	};
}

function createCrystalRing(count: number, radius: number, rotation: number, scaleX: number, scaleY: number): { x: number; y: number }[] {
	return Array.from({ length: count }, (_, index) => {
		const angle = ((rotation + index * (360 / count)) * Math.PI) / 180;

		return {
			x: 40 + Math.cos(angle) * radius * scaleX,
			y: 40 + Math.sin(angle) * radius * scaleY,
		};
	});
}

function formatSvgPoints(points: readonly { x: number; y: number }[]): string {
	return points.map((point) => `${formatSvgNumber(point.x)},${formatSvgNumber(point.y)}`).join(' ');
}

function createRibbonsPaint(size: number, hash: number, id: string): { background: string; foreground: string; defs: string; layers: string } {
	const random = createDeterministicRandom(hashString(`${hash}:ribbons`));
	const palette = ribbonPalettes[randomInteger(random, 0, ribbonPalettes.length - 1)];
	const ribbonCount = randomInteger(random, 3, 5);
	const spacing = ribbonCount === 3 ? 15 : ribbonCount === 4 ? 13 : 11;
	const amplitude = spacing * randomBetween(random, 0.64, 0.88);
	const cycles = [1, 1.25, 1.5][randomInteger(random, 0, 2)];
	const phase = randomBetween(random, 0, Math.PI * 2);
	const phaseStep = randomBetween(random, Math.PI * 0.56, Math.PI * 0.78);
	const rotation = randomBetween(random, -48, 48);
	const ribbonWidth = randomBetween(random, ribbonCount === 5 ? 5.2 : 6.2, ribbonCount === 3 ? 8.4 : 7.2);
	const outlineWidth = ribbonWidth + randomBetween(random, 2.8, 3.8);
	const scale = size / 80;
	const gradients: string[] = [];
	const ribbons: string[] = [];

	for (let index = 0; index < ribbonCount; index++) {
		const baseY = 40 + (index - (ribbonCount - 1) / 2) * spacing;
		const path = createRibbonPath(baseY, amplitude, phase + index * phaseStep, cycles);
		const gradientId = `${id}-ribbon-${index}`;
		const start = palette.colors[index % palette.colors.length];
		const middle = palette.colors[(index + 1) % palette.colors.length];
		const end = palette.colors[(index + 2) % palette.colors.length];

		gradients.push(createShapeGradient(gradientId, rotation + 18 + index * 29, start, middle, end));
		ribbons.push(`<g data-ribbon="${index}">
        <path d="${path}" fill="none" stroke="${palette.background}" stroke-width="${formatSvgNumber(outlineWidth)}" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${path}" fill="none" stroke="url(#${gradientId})" stroke-width="${formatSvgNumber(ribbonWidth)}" stroke-linecap="round" stroke-linejoin="round" filter="url(#${id}-ribbon-shadow)"/>
        <path d="${path}" fill="none" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="${formatSvgNumber(Math.max(0.8, ribbonWidth * 0.15))}" stroke-linecap="round"/>
      </g>`);
	}

	return {
		background: palette.background,
		foreground: palette.foreground,
		defs: `${gradients.join('\n    ')}
    <filter id="${id}-ribbon-shadow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="1.2" stdDeviation="1.1" flood-color="#17132F" flood-opacity="0.2"/>
    </filter>`,
		layers: `<g transform="scale(${formatSvgNumber(scale)})">
    <g data-generated="ribbons" data-ribbons="${ribbonCount}" data-cycles="${cycles}" transform="rotate(${formatSvgNumber(rotation)} 40 40)">
      ${ribbons.join('\n      ')}
    </g>
  </g>`,
	};
}

function createRibbonPath(baseY: number, amplitude: number, phase: number, cycles: number): string {
	const pointCount = 13;
	const points = Array.from({ length: pointCount }, (_, index) => {
		const progress = index / (pointCount - 1);
		const x = -28 + progress * 136;
		const taper = 0.88 + Math.sin(progress * Math.PI) * 0.12;
		const y = baseY + Math.sin(progress * Math.PI * 2 * cycles + phase) * amplitude * taper;

		return { x, y };
	});
	return createSmoothPath(points);
}

function createSmoothPath(points: readonly { x: number; y: number }[]): string {
	return `M ${formatSvgNumber(points[0].x)} ${formatSvgNumber(points[0].y)} ${createSmoothCurveCommands(points).join(' ')}`;
}

function createSmoothCurveCommands(points: readonly { x: number; y: number }[]): string[] {
	const commands: string[] = [];

	for (let index = 0; index < points.length - 1; index++) {
		const before = points[Math.max(0, index - 1)];
		const current = points[index];
		const next = points[index + 1];
		const after = points[Math.min(points.length - 1, index + 2)];
		const controlOneX = current.x + (next.x - before.x) / 6;
		const controlOneY = current.y + (next.y - before.y) / 6;
		const controlTwoX = next.x - (after.x - current.x) / 6;
		const controlTwoY = next.y - (after.y - current.y) / 6;

		commands.push(
			`C ${formatSvgNumber(controlOneX)} ${formatSvgNumber(controlOneY)} ${formatSvgNumber(controlTwoX)} ${formatSvgNumber(controlTwoY)} ${formatSvgNumber(next.x)} ${formatSvgNumber(next.y)}`,
		);
	}

	return commands;
}

function createShapesPaint(size: number, hash: number, id: string): { background: string; foreground: string; defs: string; layers: string } {
	const random = createDeterministicRandom(hashString(`${hash}:shapes`));
	const palette = shapePalettes[randomInteger(random, 0, shapePalettes.length - 1)];
	const colors = [palette.primary, palette.secondary, palette.accent] as const;
	const symmetry = randomInteger(random, 1, 6);
	const phaseSteps = symmetry === 1 ? 12 : symmetry * 2;
	const phase = randomInteger(random, 0, phaseSteps - 1) * (360 / phaseSteps);
	const orbitRadius = symmetry === 1 ? 0 : randomBetween(random, symmetry >= 5 ? 17 : 13, 21);
	const chord = symmetry === 1 ? 54 : 2 * orbitRadius * Math.sin(Math.PI / symmetry);
	const nodeDensityMin = symmetry >= 5 ? 0.3 : 0.34;
	const nodeDensityMax = symmetry >= 5 ? 0.4 : symmetry === 4 ? 0.44 : 0.5;
	const minNodeRadius = symmetry >= 5 ? 5.5 : 6.5;
	const maxNodeRadius = symmetry >= 5 ? 9.5 : 12.5;
	const nodeRadius =
		symmetry === 1
			? randomBetween(random, 21, 27)
			: Math.max(minNodeRadius, Math.min(maxNodeRadius, chord * randomBetween(random, nodeDensityMin, nodeDensityMax)));
	const maxRingCount = symmetry === 1 ? 3 : symmetry <= 3 ? 2 : 1;
	const ringCount = randomInteger(random, 1, maxRingCount);
	const ringScale = randomBetween(random, 0.5, symmetry >= 4 ? 0.62 : 0.7);
	const eccentricity = randomBetween(random, symmetry >= 5 ? 0.12 : 0.25, symmetry >= 5 ? 0.38 : symmetry === 4 ? 0.55 : 0.9);
	const colorOffset = randomInteger(random, 0, colors.length - 1);
	const terminalRingsAreFilled = symmetry <= 4 && random() > 0.5;
	const nodes = Array.from({ length: symmetry }, (_, index) => {
		const angle = phase + index * (360 / symmetry);
		const radians = (angle * Math.PI) / 180;

		return {
			x: 40 + Math.cos(radians) * orbitRadius,
			y: 40 + Math.sin(radians) * orbitRadius,
			angle,
		};
	});
	const connectionGradientId = `${id}-shape-connections`;
	const boundaryGradientId = `${id}-shape-boundary`;
	const connections = createGeometricConnections(nodes, symmetry, nodeRadius, `url(#${connectionGradientId})`, random);
	const generatedNodes = nodes.map((node, index) =>
		createGeometricNode({
			x: node.x,
			y: node.y,
			direction: symmetry === 1 ? phase : node.angle,
			radius: nodeRadius,
			fill: `url(#${id}-shape-${index})`,
			terminalFill: `url(#${id}-shape-${index}-inner)`,
			ringCount,
			ringScale,
			eccentricity,
			terminalRingIsFilled: terminalRingsAreFilled,
			index,
			palette,
		}),
	);
	const includeCenter = symmetry >= 2 && symmetry <= 4 && random() > 0.55;
	const centerRadius = Math.min(nodeRadius * randomBetween(random, 0.55, 0.9), 8.5);
	const centerNode = includeCenter
		? createGeometricNode({
				x: 40,
				y: 40,
				direction: phase + 180,
				radius: centerRadius,
				fill: `url(#${id}-shape-center)`,
				terminalFill: `url(#${id}-shape-center-inner)`,
				ringCount: 1,
				ringScale,
				eccentricity: eccentricity * 0.5,
				terminalRingIsFilled: terminalRingsAreFilled,
				index: generatedNodes.length,
				palette,
			})
		: '';
	const cuts = createGeometricCuts(symmetry, phase, orbitRadius + nodeRadius, palette, random);
	const includeBoundary = symmetry >= 2 && symmetry <= 4 && cuts === '' && random() > 0.82;
	const boundary =
		includeBoundary
			? `<circle cx="40" cy="40" r="${formatSvgNumber(orbitRadius + nodeRadius + 2.5)}" fill="none" stroke="url(#${boundaryGradientId})" stroke-width="${formatSvgNumber(randomBetween(random, 1.5, 2.5))}"/>`
			: '';
	const nodeGradientDefs = nodes.flatMap((node, index) => {
		const primaryColor = colors[(index + colorOffset) % colors.length];
		const secondaryColor = colors[(index + colorOffset + 1) % colors.length];
		const highlightColor = colors[(index + colorOffset + 2) % colors.length];

		return [
			createShapeGradient(`${id}-shape-${index}`, node.angle + 35, highlightColor, primaryColor, secondaryColor),
			createShapeGradient(`${id}-shape-${index}-inner`, node.angle + 215, primaryColor, secondaryColor, highlightColor),
		];
	});
	const centerGradientDefs = includeCenter
		? [
				createShapeGradient(
					`${id}-shape-center`,
					phase + 45,
					colors[(colorOffset + symmetry + 2) % colors.length],
					colors[(colorOffset + symmetry) % colors.length],
					colors[(colorOffset + symmetry + 1) % colors.length],
				),
				createShapeGradient(
					`${id}-shape-center-inner`,
					phase + 225,
					colors[(colorOffset + symmetry) % colors.length],
					colors[(colorOffset + symmetry + 1) % colors.length],
					colors[(colorOffset + symmetry + 2) % colors.length],
				),
			]
		: [];
	const gradientDefs = [
		createShapeGradient(connectionGradientId, phase, palette.primary, palette.secondary, palette.accent),
		createShapeGradient(boundaryGradientId, phase + 90, palette.accent, palette.primary, palette.secondary),
		...nodeGradientDefs,
		...centerGradientDefs,
	].join('\n    ');

	return {
		background: palette.background,
		foreground: palette.foreground,
		defs: gradientDefs,
		layers: `
  <g transform="scale(${size / 80})">
	<g data-generated="true" data-symmetry="${symmetry}" data-rings="${ringCount}" data-center="${includeCenter}">
		${boundary}
		${connections}
		${generatedNodes.join('\n      ')}
		${centerNode}
		${cuts}
    </g>
  </g>`.trim(),
	};
}

function createGeometricConnections(
	nodes: ReadonlyArray<{ x: number; y: number }>,
	symmetry: number,
	nodeRadius: number,
	stroke: string,
	random: () => number,
): string {
	if (symmetry === 1) return '';

	const strokeWidth = formatSvgNumber(Math.min(nodeRadius * 0.48, randomBetween(random, 2.5, symmetry >= 5 ? 3.2 : 4.5)));
	const connectPerimeter = symmetry >= 5 || (symmetry > 2 && random() > 0.42);

	if (connectPerimeter) {
		const points = nodes.map((node) => `${formatSvgNumber(node.x)} ${formatSvgNumber(node.y)}`);
		return `<path d="M ${points.join(' L ')} Z" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>`;
	}

	const paths = nodes.map(
		(node) => `M 40 40 L ${formatSvgNumber(node.x)} ${formatSvgNumber(node.y)}`,
	);
	return `<path d="${paths.join(' ')}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
}

function createGeometricNode(options: {
	x: number;
	y: number;
	direction: number;
	radius: number;
	fill: string;
	terminalFill: string;
	ringCount: number;
	ringScale: number;
	eccentricity: number;
	terminalRingIsFilled: boolean;
	index: number;
	palette: ShapePalette;
}): string {
	const { x, y, direction, radius, fill, terminalFill, ringCount, ringScale, eccentricity, terminalRingIsFilled, index, palette } =
		options;
	const radians = (direction * Math.PI) / 180;
	const rings: string[] = [];

	for (let ring = 1; ring <= ringCount; ring++) {
		const ringRadius = radius * ringScale ** ring;
		const shift = (radius - ringRadius) * eccentricity;
		const ringX = x + Math.cos(radians) * shift;
		const ringY = y + Math.sin(radians) * shift;
		const isTerminalRing = ring === ringCount;
		const ringFill = isTerminalRing && terminalRingIsFilled ? terminalFill : 'none';

		rings.push(
			`<circle cx="${formatSvgNumber(ringX)}" cy="${formatSvgNumber(ringY)}" r="${formatSvgNumber(ringRadius)}" fill="${ringFill}" stroke="${palette.background}" stroke-width="2.2"/>`,
		);
	}

	return `<g data-shape="${index}">
		<circle cx="${formatSvgNumber(x)}" cy="${formatSvgNumber(y)}" r="${formatSvgNumber(radius)}" fill="${fill}"/>
		${rings.join('\n        ')}
	  </g>`;
}

function createShapeGradient(id: string, angle: number, start: string, middle: string, end: string): string {
	const radians = (angle * Math.PI) / 180;
	const x = Math.cos(radians) * 50;
	const y = Math.sin(radians) * 50;

	return `<linearGradient id="${id}" x1="${formatSvgNumber(50 - x)}%" y1="${formatSvgNumber(50 - y)}%" x2="${formatSvgNumber(50 + x)}%" y2="${formatSvgNumber(50 + y)}%">
      <stop offset="0%" stop-color="${start}"/>
      <stop offset="52%" stop-color="${middle}"/>
      <stop offset="100%" stop-color="${end}"/>
    </linearGradient>`;
}

function createGeometricCuts(
	symmetry: number,
	phase: number,
	radius: number,
	palette: ShapePalette,
	random: () => number,
): string {
	if (symmetry === 1 || symmetry > 4 || random() < 0.8) return '';

	const cutCount = symmetry % 2 === 0 ? 2 : randomInteger(random, 1, 3);
	const paths = Array.from({ length: cutCount }, (_, index) => {
		const angle = phase + index * (180 / cutCount);
		const radians = (angle * Math.PI) / 180;
		const x = Math.cos(radians) * radius;
		const y = Math.sin(radians) * radius;

		return `M ${formatSvgNumber(40 - x)} ${formatSvgNumber(40 - y)} L ${formatSvgNumber(40 + x)} ${formatSvgNumber(40 + y)}`;
	});

	return `<path d="${paths.join(' ')}" fill="none" stroke="${palette.background}" stroke-width="${formatSvgNumber(randomBetween(random, 2.2, 3.4))}" stroke-linecap="round"/>`;
}

function createDeterministicRandom(seed: number): () => number {
	let state = seed || 0x6d2b79f5;

	return () => {
		state += 0x6d2b79f5;
		let value = state;

		value = Math.imul(value ^ (value >>> 15), value | 1);
		value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

		return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
	};
}

function randomBetween(random: () => number, min: number, max: number): number {
	return min + random() * (max - min);
}

function randomInteger(random: () => number, min: number, max: number): number {
	return Math.floor(randomBetween(random, min, max + 1));
}

function formatSvgNumber(value: number): string {
	return Number(value.toFixed(2)).toString();
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
	const random = createDeterministicRandom(hash ^ 0x47ad1e);
	const palette = pickFrom(gradientPalettes, randomInteger(random, 0, gradientPalettes.length - 1));
	// Different field arrangements keep variation visible even when seeds share a palette.
	const compositions = [
		[[8, 14, 72, 58], [76, 72, 62, 68]],
		[[0, 0, 64, 60], [80, 18, 58, 50], [38, 88, 70, 55]],
		[[40, 38, 44, 48], [86, 76, 58, 65]],
		[[40, -4, 88, 30], [40, 72, 90, 34], [-12, 38, 45, 50]],
		[[-8, 40, 60, 90], [86, 40, 58, 90], [40, 88, 40, 48]],
	] as const;
	const composition = randomInteger(random, 0, compositions.length - 1);
	const rotation = formatSvgNumber(randomBetween(random, 0, 360));
	const colors = [palette.secondary, palette.base, palette.primary];
	const colorOffset = randomInteger(random, 0, 2);
	const baseStart = colors[(colorOffset + 2) % 3];
	const baseEnd = colors[(colorOffset + 1) % 3];
	const defs: string[] = [
		`<linearGradient id="${id}-field-base" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${rotation} .5 .5)">
      <stop offset="0%" stop-color="${baseStart}"/>
      <stop offset="100%" stop-color="${baseEnd}"/>
    </linearGradient>`,
	];
	const fields = compositions[composition].map(([x, y, rx, ry], index) => {
		const fieldId = `${id}-field-${index}`;
		const color = colors[(colorOffset + index) % 3];
		const centerX = formatSvgNumber(x + randomBetween(random, -8, 8));
		const centerY = formatSvgNumber(y + randomBetween(random, -8, 8));
		const radiusX = formatSvgNumber(rx * randomBetween(random, 0.85, 1.18));
		const radiusY = formatSvgNumber(ry * randomBetween(random, 0.85, 1.18));
		defs.push(`<radialGradient id="${fieldId}">
      <stop offset="0%" stop-color="${color}" stop-opacity="1"/>
      <stop offset="25%" stop-color="${color}" stop-opacity="0.95"/>
      <stop offset="55%" stop-color="${color}" stop-opacity="0.6"/>
      <stop offset="80%" stop-color="${color}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>`);
		return `<ellipse cx="${centerX}" cy="${centerY}" rx="${radiusX}" ry="${radiusY}" fill="url(#${fieldId})"/>`;
	});

	return {
		background: `url(#${id}-field-base)`,
		foreground: palette.foreground,
		defs: defs.join('\n    '),
		layers: `<g data-composition="${composition}" transform="scale(${size / 80})">
    <g transform="rotate(${rotation} 40 40)">
      ${fields.join('\n      ')}
    </g>
  </g>`,
	};
}

function createGlassPaint(
	size: number,
	hash: number,
	id: string,
	radius: number,
): { background: string; foreground: string; defs: string; layers: string } {
	const gradient = createGradientPaint(size, hash, id);
	const borderWidth = Math.max(1, Math.round(size * 0.024));
	const borderInset = borderWidth / 2;
	const borderRadius = Math.max(0, radius - borderInset);
	const random = createDeterministicRandom(hash ^ 0x61a55);
	const lightAngle = randomBetween(random, 0, Math.PI * 2);
	const lightX = formatSvgNumber(50 + Math.cos(lightAngle) * 48);
	const lightY = formatSvgNumber(50 + Math.sin(lightAngle) * 48);
	const oppositeX = formatSvgNumber(100 - Number(lightX));
	const oppositeY = formatSvgNumber(100 - Number(lightY));
	const lightAxis = `x1="${lightX}%" y1="${lightY}%" x2="${oppositeX}%" y2="${oppositeY}%"`;
	const glowRadius = formatSvgNumber(randomBetween(random, 48, 68));

	return {
		background: gradient.background,
		foreground: gradient.foreground,
		defs: `${gradient.defs}
    <linearGradient id="${id}-glass-shade" ${lightAxis}>
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.32"/>
    </linearGradient>
    <linearGradient id="${id}-glass-sheen" ${lightAxis}>
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.62"/>
      <stop offset="22%" stop-color="#FFFFFF" stop-opacity="0.24"/>
      <stop offset="43%" stop-color="#FFFFFF" stop-opacity="0.12"/>
      <stop offset="47%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="${id}-glass-glow" cx="${lightX}%" cy="${lightY}%" r="${glowRadius}%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.7"/>
      <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.2"/>
      <stop offset="65%" stop-color="#FFFFFF" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}-glass-depth" ${lightAxis}>
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="58%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.24"/>
    </linearGradient>
    <linearGradient id="${id}-glass-border" ${lightAxis}>
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.98"/>
      <stop offset="24%" stop-color="#FFFFFF" stop-opacity="0.7"/>
      <stop offset="58%" stop-color="#FFFFFF" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.06"/>
    </linearGradient>`,
		layers: `${gradient.layers}
    <rect width="${size}" height="${size}" fill="url(#${id}-glass-shade)"/>
    <rect width="${size}" height="${size}" fill="url(#${id}-glass-sheen)"/>
    <rect width="${size}" height="${size}" fill="url(#${id}-glass-glow)"/>
    <rect width="${size}" height="${size}" fill="url(#${id}-glass-depth)"/>
    <rect x="${borderInset}" y="${borderInset}" width="${size - borderWidth}" height="${size - borderWidth}" rx="${borderRadius}" fill="none" stroke="url(#${id}-glass-border)" stroke-width="${borderWidth}"/>`,
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

function createSignalPaint(size: number, hash: number, id: string): { background: string; foreground: string; defs: string; layers: string } {
	const random = createDeterministicRandom(hashString(`${hash}:signal`));
	const palette = signalPalettes[randomInteger(random, 0, signalPalettes.length - 1)];
	const rowCount = randomInteger(random, 15, 17);
	const centerX = randomBetween(random, 43, 51);
	const rightX = randomBetween(random, 83, 91);
	const leftX = randomBetween(random, -5, 8);
	const mirror = random() < 0.25;
	const rows: string[] = [];
	const rectangle = (x: number, y: number, width: number, height: number, fill: string, opacity = 1, kind = 'segment') =>
		`<rect data-signal-${kind}="true" x="${formatSvgNumber(x)}" y="${formatSvgNumber(y - height / 2)}" width="${formatSvgNumber(width)}" height="${formatSvgNumber(height)}" fill="${fill}" fill-opacity="${formatSvgNumber(opacity)}"/>`;

	for (let index = 0; index < rowCount; index++) {
		const progress = index / (rowCount - 1);
		const y = 3 + progress * 122 + randomBetween(random, -0.5, 0.5);
		const leftEnd = randomBetween(random, 48, 64);
		const rightStart = randomBetween(random, 75, 88);
		const segments = [
			rectangle(0, y, leftEnd, randomBetween(random, 1.15, 2.35), palette.line, 0.77),
			rectangle(leftEnd, y, rightStart - leftEnd, randomBetween(random, 0.35, 0.8), palette.line, 0.52),
			rectangle(rightStart, y, 128 - rightStart, randomBetween(random, 1.1, 2.25), palette.line, 0.74),
		];
		let barX: number;
		let barWidth: number;

		if (progress < 0.2) {
			barX = centerX + randomBetween(random, -3, 3);
			barWidth = randomBetween(random, 9, 27);
		} else if (progress < 0.57) {
			barX = rightX + randomBetween(random, -3.5, 3.5);
			barWidth = randomBetween(random, 23, 38);
		} else if (progress < 0.86) {
			barX = leftX + randomBetween(random, -3, 3);
			barWidth = randomBetween(random, 18, 39) * (1 - (progress - 0.57) * 0.8);
		} else {
			barX = centerX + randomBetween(random, -5, 5);
			barWidth = randomBetween(random, 7, 23);
		}

		const barHeight = randomBetween(random, 3, 7.4);
		segments.push(rectangle(barX, y, barWidth, barHeight, palette.bar, 1, 'bar'));

		if ((progress > 0.13 && progress < 0.23) || (progress > 0.55 && progress < 0.68)) {
			const accentX = progress < 0.3 ? rightX + randomBetween(random, 0, 8) : rightX + randomBetween(random, -6, 5);
			segments.push(rectangle(accentX, y, randomBetween(random, 7, 14), randomBetween(random, 3, 6), palette.bar, 1, 'bar'));
		}

		rows.push(`<g data-signal-row="${index}"${mirror ? ' transform="translate(128 0) scale(-1 1)"' : ''}>
        ${segments.join('\n        ')}
      </g>`);
	}

	return {
		background: `url(#${id}-signal-field)`,
		foreground: palette.foreground,
		defs: `<radialGradient id="${id}-signal-field" cx="48%" cy="50%" r="72%">
      <stop offset="0%" stop-color="${palette.light}"/>
      <stop offset="100%" stop-color="${palette.shade}"/>
	    </radialGradient>`,
		layers: `<g data-generated="signal" data-rows="${rowCount}" transform="scale(${formatSvgNumber(size / 128)})">
	  ${rows.join('\n      ')}
    </g>`,
	};
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
		variant: hasExplicitVariant ? first : 'gradient',
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
