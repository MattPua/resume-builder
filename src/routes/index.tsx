import { createFileRoute } from "@tanstack/react-router";
import { ResumeBuilder } from "../components/ResumeBuilder";
import { createSeo } from "../lib/seo";

export const Route = createFileRoute("/")({
	head: () =>
		createSeo({
			title: "Free Resume Builder – ATS-Friendly, No Signup Required",
			description:
				"Build a professional, ATS-friendly resume online for free. No signup, no tracking. Your data stays on your device.",
		}),
	component: App,
});

function App() {
	return <ResumeBuilder />;
}
