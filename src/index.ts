type Variant = 'glass' | 'gradient' | 'grid' | 'shapes' | 'solid' | 'triangles';

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

const variants = ['glass', 'gradient', 'grid', 'shapes', 'solid', 'triangles'] as const satisfies readonly Variant[];

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

const shapePalettes = [
	{ background: '#F7F7FB', primary: '#70DDC0', secondary: '#39BFA8', accent: '#B8F4E3', foreground: '#124E47' },
	{ background: '#F8F6FF', primary: '#8AD9E3', secondary: '#55BED0', accent: '#C4EEF3', foreground: '#15505B' },
	{ background: '#FFF7F8', primary: '#FF9EA3', secondary: '#FF666D', accent: '#FFC8CB', foreground: '#7A2630' },
	{ background: '#FFF9F0', primary: '#FFB85C', secondary: '#F47A47', accent: '#FFE0A8', foreground: '#713314' },
	{ background: '#F8F5FF', primary: '#B8A0FF', secondary: '#8068E8', accent: '#DDD3FF', foreground: '#3C2B7B' },
	{ background: '#F5FAFF', primary: '#7EB6FF', secondary: '#3979DC', accent: '#C4DCFF', foreground: '#173E78' },
	{ background: '#FBFBEF', primary: '#D6DC69', secondary: '#9AAE35', accent: '#F0EFA5', foreground: '#465312' },
] as const satisfies readonly ShapePalette[];

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
				name: 'gradient',
				description: 'Soft abstract gradient shapes generated from the seed.',
				default_for_seed_urls: true,
			},
			{
				name: 'glass',
				description: 'Glossy gradient avatar with a diagonal sheen and reflective border.',
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
				name: 'shapes',
				description: 'Playful seeded geometric compositions with varied motifs and color palettes.',
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
			`${origin}/solid/nova-river`,
			`${origin}/gradient/nova-river?size=256&radius=full`,
			`${origin}/glass/nova-river?size=256&radius=full`,
			`${origin}/grid/nova-river?initials`,
			`${origin}/shapes/nova-river?size=256&radius=full`,
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
	const needsTextOverlay = showInitials && (variant === 'grid' || variant === 'shapes' || variant === 'triangles');
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
		case 'glass':
			return createGlassPaint(size, hash, id, radius);
		case 'gradient':
			return createGradientPaint(size, hash, id);
		case 'grid':
			return createGridPaint(size, hash);
		case 'shapes':
			return createShapesPaint(size, hash, id);
		case 'solid':
			return createSolidPaint(size, hash);
		case 'triangles':
			return createTrianglesPaint(size, hash);
	}
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

	return {
		background: gradient.background,
		foreground: gradient.foreground,
		defs: `${gradient.defs}
    <linearGradient id="${id}-glass-shade" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.1"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="${id}-glass-sheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.88"/>
      <stop offset="28%" stop-color="#FFFFFF" stop-opacity="0.48"/>
      <stop offset="62%" stop-color="#FFFFFF" stop-opacity="0.16"/>
      <stop offset="84%" stop-color="#FFFFFF" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="${id}-glass-glow" cx="12%" cy="10%" r="94%" fx="4%" fy="4%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.86"/>
      <stop offset="24%" stop-color="#FFFFFF" stop-opacity="0.5"/>
      <stop offset="55%" stop-color="#FFFFFF" stop-opacity="0.18"/>
      <stop offset="82%" stop-color="#FFFFFF" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}-glass-depth" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="58%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.14"/>
    </linearGradient>
    <linearGradient id="${id}-glass-border" x1="0" y1="0" x2="${size}" y2="${size}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.98"/>
      <stop offset="24%" stop-color="#FFFFFF" stop-opacity="0.82"/>
      <stop offset="58%" stop-color="#FFFFFF" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.08"/>
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
