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
		: `${baseTitle} | Open Source & Private | 100% Local & Secure`;

	const baseDescription =
		"Create a professional resume with total privacy using Your Resume Builder. An open source, 100% local tool where nothing is uploaded and all data stays in your browser. Free, fast, and secure with high-quality PDF export.";
	const fullDescription = description || baseDescription;

	const baseKeywords =
		"Your Resume Builder, open source resume builder, private resume builder, local resume creator, secure CV maker, free resume builder, no upload resume, professional resume, PDF resume, markdown resume";
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
