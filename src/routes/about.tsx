import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	Database,
	FileText,
	Github,
	Lock,
	ShieldCheck,
	Zap,
} from "lucide-react";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/about")({
	component: AboutPage,
});

function AboutPage() {
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
							About Your Resume Builder
						</h1>
					</div>

					{/* Features Grid */}
					<div className="grid gap-8 sm:grid-cols-2">
						<div className="space-y-3">
							<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
								<Lock className="size-6" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								Total Privacy
							</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								Nothing is ever uploaded to a server. We don't collect, see, or
								store any of your personal information. Your data stays 100% in
								your browser.
							</p>
						</div>

						<div className="space-y-3">
							<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
								<Zap className="size-6" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								Content First
							</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								Focus on your achievements while we handle the layout. No more
								fighting with MS Word formatting or rigid Canva templates.
							</p>
						</div>

						<div className="space-y-3">
							<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
								<Database className="size-6" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								Auto-Saving
							</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								Your changes are automatically saved to your browser's local
								storage. You can close the tab and return later to continue
								where you left off.
							</p>
						</div>

						<div className="space-y-3">
							<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
								<FileText className="size-6" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								PDF Export
							</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								Download high-quality, multi-page PDFs.
							</p>
						</div>
					</div>

					{/* Why Build This? */}
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 space-y-4">
						<h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
							<ShieldCheck className="size-6 text-green-600" />
							Why Build This?
						</h3>
						<div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-4">
							<p>
								Most online resume builders require an account, charge a
								subscription, or track your data. We believe your professional
								history is personal and shouldn't be a product.
							</p>
							<p>
								Your Resume Builder is a completely free, open-source
								alternative. It was built to solve the "MS Word formatting
								nightmare" while maintaining absolute data sovereignty for the
								user.
							</p>
						</div>
						<div className="pt-4">
							<Button asChild variant="outline">
								<a
									href="https://github.com/MattPua/resume-builder"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2"
								>
									<Github className="size-4" />
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
