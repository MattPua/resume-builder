import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "../components/ThemeProvider";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Private & Free Resume Builder | 100% Local & Secure",
			},
			{
				name: "description",
				content: "Create a professional resume with total privacy. Focus on your content while we handle the professional layout. 100% local, nothing is uploaded, and all data stays in your browser. Free, fast, and secure with high-quality PDF export.",
			},
			{
				name: "keywords",
				content: "private resume builder, local resume creator, secure CV maker, free resume builder, no upload resume, professional resume, PDF resume, markdown resume",
			},
			{
				property: "og:title",
				content: "Private & Free Resume Builder",
			},
			{
				property: "og:description",
				content: "Build a professional resume with total privacy. 100% local, secure, and free. No data ever leaves your browser.",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:image",
				content: "/logo512.png",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: "Private & Free Resume Builder",
			},
			{
				name: "twitter:description",
				content: "100% local and private resume builder. Create a professional CV in minutes without uploading any personal data.",
			},
			{
				name: "twitter:image",
				content: "/logo512.png",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				href: "/favicon.ico",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/logo192.png",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		"name": "Private & Free Resume Builder",
		"description": "Create a professional resume with total privacy. 100% local, secure, and free. No data ever leaves your browser.",
		"applicationCategory": "DesignApplication",
		"operatingSystem": "All",
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD"
		},
		"featureList": [
			"100% Private & Local",
			"High-quality PDF Export",
			"Multi-page Support",
			"Auto-saving in Browser",
			"Backup & Transfer via JSON",
			"No Account Required"
		]
	};

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body>
				<ThemeProvider defaultTheme="dark" storageKey="resume-builder-theme">
					{children}
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
					<Scripts />
				</ThemeProvider>
			</body>
		</html>
	);
}
