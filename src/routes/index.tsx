import { createFileRoute } from "@tanstack/react-router";
import { ResumeBuilder } from "../components/ResumeBuilder";
import { createSeo } from "../lib/seo";

export const Route = createFileRoute("/")({
	head: () =>
		createSeo({
			title: "Home",
			description:
				"Build your professional resume in minutes with absolute privacy. An open source, local-first tool for high-quality CV creation and PDF export.",
		}),
	component: App,
});

function App() {
	return <ResumeBuilder />;
}
