type Variant = 'gradient' | 'grid' | 'solid';

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

const variants = ['gradient', 'grid', 'solid'] as const satisfies readonly Variant[];

const solidPalettes = [
	{ background: '#F8F3EA', foreground: '#6F4700', accent: '#F2B94B' },
	{ background: '#EEF4FF', foreground: '#2645A8', accent: '#7BA4FF' },
	{ background: '#EEF8F3', foreground: '#176B45', accent: '#5FC48A' },
	{ background: '#FFF4E6', foreground: '#A14F00', accent: '#FFB457' },
	{ background: '#F5F0FF', foreground: '#6046B6', accent: '#A78BFA' },
	{ background: '#F7F7F2', foreground: '#4A5300', accent: '#CCD36E' },
	{ background: '#EEF7F8', foreground: '#00707B', accent: '#70D4DF' },
	{ background: '#FFF0F3', foreground: '#AA1E3B', accent: '#FF7A96' },
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

const gridColors = ['#00686c', '#ff9915', '#32c2b9', '#edecb3', '#fad928'] as const;

export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);

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
	const fontSize = Math.round(size * 0.36);
	const y = Math.round(size * 0.53);
	const textOverlay =
		showInitials && variant === 'grid' ? `<rect width="${size}" height="${size}" fill="#000000" opacity="0.28"/>` : '';
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
