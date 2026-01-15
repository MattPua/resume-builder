import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Component, type ReactNode } from "react";
import { Button } from "./ui/button";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode | ((props: { error: Error; reset: () => void }) => ReactNode);
	onReset?: () => void;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null });
		if (this.props.onReset) {
			this.props.onReset();
		}
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				if (typeof this.props.fallback === "function") {
					return this.props.fallback({
						error: this.state.error || new Error("Unknown error"),
						reset: this.handleReset,
					});
				}
				return this.props.fallback;
			}

			return (
				<div className="p-6 border border-red-200 dark:border-red-900/50 rounded-xl bg-red-50/50 dark:bg-red-900/10 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
					<div className="flex flex-col items-center text-center gap-4">
						<div className="size-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
							<AlertTriangle className="size-6" />
						</div>
						<div className="space-y-1">
							<h3 className="text-base font-bold text-red-900 dark:text-red-200">
								Section Error
							</h3>
							<p className="text-sm text-red-700 dark:text-red-400 max-w-xs">
								{this.state.error?.message || "An unexpected error occurred"}
							</p>
						</div>
						<Button
							onClick={this.handleReset}
							size="sm"
							variant="outline"
							className="gap-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
						>
							<RefreshCcw className="size-3.5" />
							Try Again
						</Button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
