interface SeoProps {
	title?: string;
	description?: string;
	keywords?: string;
	image?: string;
	url?: string;
	type?: string;
	jsonLd?: Record<string, unknown>;
}

export const createSeo = ({
	title,
	description,
	keywords,
	image = "https://your-resume-builder.com/og-image.jpeg",
	url = "https://your-resume-builder.com",
	type = "website",
	jsonLd,
}: SeoProps) => {
	const baseTitle = "Your Resume Builder";
	const fullTitle = title
		? `${title} | ${baseTitle}`
		: `Free Resume Builder – ATS-Friendly, No Signup Required`;

	const baseDescription =
		"Build a professional, ATS-friendly resume online for free. No signup, no tracking. Your data stays on your device.";
	const fullDescription = description || baseDescription;

	const baseKeywords =
		"free resume builder, resume builder free, online resume builder free, ATS friendly resume builder, resume builder no signup, resume builder no account required, build resume online without signing up, privacy focused resume builder, local resume builder browser based, resume builder for developers";
	const fullKeywords = keywords ? `${keywords}, ${baseKeywords}` : baseKeywords;

	const meta = [
		{ title: fullTitle },
		{ name: "description", content: fullDescription },
		{ name: "keywords", content: fullKeywords },
		// OG
		{ property: "og:title", content: fullTitle },
		{ property: "og:description", content: fullDescription },
		{ property: "og:type", content: type },
		{ property: "og:image", content: image },
		{ property: "og:url", content: url },
		// Twitter
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: fullTitle },
		{ name: "twitter:description", content: fullDescription },
		{ name: "twitter:image", content: image },
	];

	const scripts = jsonLd
		? [
				{
					type: "application/ld+json",
					children: JSON.stringify(jsonLd),
				},
			]
		: [];

	return { meta, scripts };
};
