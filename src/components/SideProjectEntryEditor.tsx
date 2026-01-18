import {
	ArrowUpDown,
	ChevronDown,
	Eye,
	EyeOff,
	GripVertical,
	Trash2,
} from "lucide-react";
import { useRef, useState } from "react";
import type { SideProjectEntry } from "../types/resume";
import { SectionInput } from "./SectionInput";
import { TextInput } from "./TextInput";
import { Button } from "./ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface SideProjectEntryEditorProps {
	entry: SideProjectEntry;
	index: number;
	onChange: (index: number, entry: SideProjectEntry) => void;
	onDelete: (index: number) => void;
	dragAttributes?: React.HTMLAttributes<HTMLButtonElement>;
	dragListeners?: React.HTMLAttributes<HTMLButtonElement>;
	isOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export const SideProjectEntryEditor = ({
	entry,
	index,
	onChange,
	onDelete,
	dragAttributes,
	dragListeners,
	isOpen: controlledIsOpen,
	onOpenChange: controlledOnOpenChange,
}: SideProjectEntryEditorProps) => {
	const [internalIsOpen, setInternalIsOpen] = useState(true);
	const isOpen =
		controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
	const setIsOpen = controlledOnOpenChange || setInternalIsOpen;
	const bulletPointsRef = useRef<HTMLTextAreaElement>(null);
	const draftRef = useRef<HTMLTextAreaElement>(null);
	const [activeTab, setActiveTab] = useState<string>("live");

	const handleFieldChange = (
		field: keyof SideProjectEntry,
		value: string | boolean,
	) => {
		onChange(index, { ...entry, [field]: value });
	};

	const currentYear = new Date().getFullYear().toString();
	const isHidden = entry.visible === false;

	const handleSwapDraft = () => {
		const currentLive = entry.bulletPoints;
		const currentDraft = entry.bulletPointsDraft || "";
		onChange(index, {
			...entry,
			bulletPoints: currentDraft,
			bulletPointsDraft: currentLive,
		});
	};

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className={`border rounded-lg ${isHidden ? "border-amber-300 dark:border-amber-700 border-dashed border-2 bg-amber-50/50 dark:bg-amber-950/30" : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"}`}
		>
			<div className="p-4">
				<CollapsibleTrigger className="flex items-center justify-between w-full mb-2 cursor-pointer gap-4">
					<div className="flex items-center gap-2 min-w-0">
						{dragListeners && dragAttributes && (
							<button
								type="button"
								className="cursor-grab active:cursor-grabbing touch-none shrink-0"
								{...dragListeners}
								{...dragAttributes}
								onClick={(e) => e.stopPropagation()}
							>
								<GripVertical className="h-4 w-4 text-gray-400" />
							</button>
						)}
						<div className="flex items-center gap-2 min-w-0">
							<h4 className={`font-semibold truncate text-left ${isHidden ? "text-gray-500 dark:text-gray-500 line-through" : "text-gray-800 dark:text-gray-200"}`}>
								{entry.title || `Side Project #${index + 1}`}
							</h4>
							{isHidden && (
								<span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 rounded-full shrink-0">
									Hidden
								</span>
							)}
						</div>
					</div>
					<div className="flex items-center gap-3 shrink-0">
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										handleFieldChange("visible", entry.visible === false);
									}}
									className="p-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
								>
									{entry.visible !== false ? (
										<Eye className="h-4 w-4" />
									) : (
										<EyeOff className="h-4 w-4" />
									)}
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									{entry.visible !== false
										? "Hide in preview"
										: "Show in preview"}
								</p>
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										onDelete(index);
									}}
									className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
									aria-label="Delete side project entry"
								>
									<Trash2 className="size-4" />
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Delete entry</p>
							</TooltipContent>
						</Tooltip>
						<ChevronDown
							className={`h-4 w-4 text-gray-500 transition-transform ${
								isOpen ? "transform rotate-180" : ""
							}`}
						/>
					</div>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="flex flex-col gap-4">
						<TextInput
							label="Project Title"
							value={entry.title}
							onChange={(value) => handleFieldChange("title", value)}
							placeholder="My Awesome Project"
						/>
						<TextInput
							label="URL (optional)"
							type="url"
							value={entry.titleUrl || ""}
							onChange={(value) => handleFieldChange("titleUrl", value)}
							placeholder="https://project.com"
						/>
						<div className="grid grid-cols-2 gap-3">
							<TextInput
								label="Start Date"
								value={entry.startDate}
								onChange={(value) => handleFieldChange("startDate", value)}
								placeholder="2020"
							/>
							<TextInput
								label="End Date"
								value={entry.endDate}
								onChange={(value) => handleFieldChange("endDate", value)}
								placeholder={`${currentYear} or Now`}
							/>
						</div>

						<Tabs
							value={activeTab}
							onValueChange={setActiveTab}
							className="w-full"
						>
							<TabsList className="grid w-full grid-cols-3">
								<TabsTrigger value="live">Live</TabsTrigger>
								<TabsTrigger
									value="draft"
									className="data-[state=active]:!bg-amber-50/50 dark:data-[state=active]:!bg-amber-950/30 data-[state=active]:!text-foreground data-[state=active]:border-amber-300 dark:data-[state=active]:border-amber-700 data-[state=active]:border-dashed data-[state=active]:border-2"
								>
									Draft
								</TabsTrigger>
								<TabsTrigger
									value="notes"
									className="data-[state=active]:!bg-amber-50/50 dark:data-[state=active]:!bg-amber-950/30 data-[state=active]:!text-foreground data-[state=active]:border-amber-300 dark:data-[state=active]:border-amber-700 data-[state=active]:border-dashed data-[state=active]:border-2"
								>
									Notes
								</TabsTrigger>
							</TabsList>
							<TabsContent value="live" className="mt-2 space-y-4">
								<SectionInput
									ref={bulletPointsRef}
									label="Bullet Points"
									value={entry.bulletPoints}
									onChange={(value) => handleFieldChange("bulletPoints", value)}
									placeholder="- Key feature or achievement\n- Technology used\n- Impact or result"
								/>
							</TabsContent>
							<TabsContent value="draft" className="mt-2 space-y-4">
								<div className="flex flex-col gap-3">
									<div className="flex items-center justify-between">
										<p className="text-xs text-muted-foreground">
											This draft is not shown in the preview.
										</p>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={handleSwapDraft}
											className="h-8 gap-1.5"
										>
											<ArrowUpDown className="size-3.5" />
											Swap with Live
										</Button>
									</div>
									<SectionInput
										ref={draftRef}
										value={entry.bulletPointsDraft || ""}
										onChange={(value) =>
											handleFieldChange("bulletPointsDraft", value)
										}
										placeholder="Draft bullet points..."
									/>
								</div>
							</TabsContent>
							<TabsContent value="notes" className="mt-2 space-y-4">
								<div className="flex flex-col gap-3">
									<p className="text-xs text-muted-foreground">
										Private notes for your reference.
									</p>
									<SectionInput
										value={entry.notes || ""}
										onChange={(value) => handleFieldChange("notes", value)}
										placeholder="Private notes..."
									/>
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</CollapsibleContent>
			</div>
		</Collapsible>
	);
};
