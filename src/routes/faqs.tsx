import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	Database,
	FileText,
	HelpCircle,
	Lock,
	ShieldCheck,
	Zap,
} from "lucide-react";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { createSeo } from "../lib/seo";

const FAQS = [
	{
		question: "Is my data safe?",
		answer:
			"Yes, 100%. Your Resume Builder is a 'local-first' application. This means all your data is stored directly in your browser's local storage. We never upload your personal information to any server, and we don't even have a database to store it in.",
		icon: <ShieldCheck className="size-5 text-green-600" />,
	},
	{
		question: "How do I save my progress?",
		answer:
			"Your changes are automatically saved to your browser as you type. You can close the window and come back later, and your data will still be there (as long as you don't clear your browser's cache or site data).",
		icon: <Database className="size-5 text-blue-600" />,
	},
	{
		question: "Can I use this on different devices?",
		answer:
			"Since your data is stored locally in your browser, it doesn't sync across devices automatically. To move your resume to another device, use the 'Export to JSON' feature in the actions menu, then 'Import from JSON' on your other device.",
		icon: <Zap className="size-5 text-amber-600" />,
	},
	{
		question: "How does the PDF export work?",
		answer:
			"We use a combination of modern web technologies to generate a high-quality PDF directly in your browser. The layout is optimized for A4 paper and ensures that your contact information repeats clearly at the top of every page.",
		icon: <FileText className="size-5 text-purple-600" />,
	},
	{
		question: "Is it really free?",
		answer:
			"Yes, it's completely free and open source. There are no subscriptions, no premium features hidden behind paywalls, and no advertisements. It's built by developers, for everyone.",
		icon: <HelpCircle className="size-5 text-pink-600" />,
	},
	{
		question: "What is Markdown import?",
		answer:
			"Markdown is a simple way to format text. If you already have your resume in a text format or another builder, you can often paste it into our Markdown importer to quickly populate your professional history without starting from scratch.",
		icon: <Lock className="size-5 text-gray-600" />,
	},
];

export const Route = createFileRoute("/faqs")({
	head: () =>
		createSeo({
			title: "FAQs",
			description:
				"Frequently asked questions about Your Resume Builder - privacy, saving, PDF export, and more.",
			jsonLd: {
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: FAQS.map((faq) => ({
					"@type": "Question",
					name: faq.question,
					acceptedAnswer: {
						"@type": "Answer",
						text: faq.answer,
					},
				})),
			},
		}),
	component: FaqsPage,
});

function FaqsPage() {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
			<SiteHeader />

			<main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:py-20">
				<div className="space-y-12">
					{/* Header */}
					<div className="space-y-4 text-left">
						<Link
							to="/"
							className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-4"
						>
							<ArrowLeft className="size-4" />
							Back to Builder
						</Link>
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
							Frequently Asked Questions
						</h1>
					</div>

					{/* FAQ Accordion */}
					<div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden text-left max-w-xl mx-auto">
						<Accordion type="single" collapsible className="w-full">
							{FAQS.map((faq) => (
								<AccordionItem
									key={faq.question}
									value={faq.question}
									className="last:border-0 w-full"
								>
									<AccordionTrigger className="hover:no-underline py-5 px-6">
										<div className="flex items-center gap-3 w-full min-w-0">
											<div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shrink-0">
												{faq.icon}
											</div>
											<span className="text-left font-semibold text-gray-900 dark:text-white">
												{faq.question}
											</span>
										</div>
									</AccordionTrigger>
									<AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed px-6 pl-11 pb-6">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>

					{/* Support / GitHub */}
					<div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 space-y-4 text-center">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white">
							Still have questions?
						</h3>
						<p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
							If you've found a bug or have a feature request, please feel free
							to open an issue on our GitHub repository.
						</p>
						<div className="pt-4">
							<Button asChild variant="outline">
								<a
									href="https://github.com/MattPua/resume-builder"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2"
								>
									<HelpCircle className="size-4" />
									View on GitHub
								</a>
							</Button>
						</div>
					</div>

					{/* Call to Action */}
					<div className="text-center pt-8">
						<Button asChild size="lg" className="px-8 py-6 text-lg">
							<Link to="/">Start Building Your Resume</Link>
						</Button>
					</div>
				</div>
			</main>

			<SiteFooter />
		</div>
	);
}
