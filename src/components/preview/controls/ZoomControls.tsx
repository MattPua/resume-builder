import { RotateCcw } from "lucide-react";
import { Button } from "../../ui/button";
import { Slider } from "../../ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

interface ZoomControlsProps {
	zoomLevel: number;
	onZoomChange: (value: number) => void;
	onResetZoom: () => void;
}

export const ZoomControls = ({
	zoomLevel,
	onZoomChange,
	onResetZoom,
}: ZoomControlsProps) => {
	return (
		<div className="flex items-center gap-3">
			<Slider
				value={[zoomLevel]}
				onValueChange={(value) => onZoomChange(value[0])}
				min={0.5}
				max={2}
				step={0.1}
				className="w-32"
			/>
			<div className="flex items-center gap-1 text-xs text-muted-foreground min-w-[3rem] justify-end">
				{Math.round(zoomLevel * 100)}%
			</div>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						onClick={onResetZoom}
						disabled={zoomLevel === 1}
						className="size-8"
					>
						<RotateCcw className="size-4" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Reset zoom</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
};
