import { Editor } from "@monaco-editor/react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type CostRecommendation } from "~/StubbedRecommendations";

export default function CostRecommendationsTable({
  data,
  className,
}: {
  data: CostRecommendation[];
  className?: string;
}) {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedRecommendationId, setSelectedRecommendationId] = useState<
    string | null
  >(null);
  const total = data.reduce((acc, cur) => acc + cur.estimatedMonthlySavings, 0);
  const router = useRouter();

  // const openDetailsDialog = (recommendationId: string) => {
  //   setSelectedRecommendationId(recommendationId);
  //   setDetailsDialogOpen(true);
  // };

  // using nextjs way with router
  const goToRecommendationPage = async (recommendationId: string) => {
    await router.push(`/recommendation/${recommendationId}`);
  };

  const goToChatPage = async (recommendationId: string) => {
    await router.push(`/chat/${recommendationId}`);
  };

  return (
    <>
      <Table className={className}>
        {/* <TableCaption>A list of your recommendations.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Potential Savings</TableHead>
            <TableHead>Recommendations</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.recommendationId}>
              <TableCell className="w-[200px]">
                {row.currentResourceType}
              </TableCell>
              <TableCell className="w-[140px]">
                ${row.estimatedMonthlySavings}
              </TableCell>
              <TableCell>{row.recommendedResourceSummary}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      onClick={() => goToChatPage(row.recommendationId)}
                    >
                      Learn More
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        goToRecommendationPage(row.recommendationId)
                      }
                    >
                      Apply Change
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">${total}</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
      <CostRecommendationDetailsDialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        selectedRecommendation={data.find(
          (r) => r.recommendationId === selectedRecommendationId,
        )}
      />
    </>
  );
}

function CostRecommendationDetailsDialog(props: {
  open: boolean;
  onClose: () => void;
  selectedRecommendation: CostRecommendation | undefined;
}) {
  // we don't have access to the document on the first render
  const documentWidth = 1346;
  const [editorWidth, setEditorWidth] = useState<number>(documentWidth / 2); // Initial width of the editor
  const [containerWidth, setContainerWidth] = useState<number>(documentWidth); // Assume some initial container width or calculate dynamically
  const [isResizing, setIsResizing] = useState<boolean>(false);

  // Dynamically calculate the chat window width
  const chatWindowWidth = containerWidth - editorWidth;

  // Handler to start resizing
  const startResizing = (mouseDownEvent: React.MouseEvent<HTMLDivElement>) => {
    mouseDownEvent.preventDefault();
    setIsResizing(true);
  };

  // Handler to stop resizing
  const stopResizing = () => {
    setIsResizing(false);
  };

  // Handler for resizing
  const resize = (mouseMoveEvent: MouseEvent) => {
    if (isResizing) {
      // Calculate new width for the editor
      const documentWidth = document.body.clientWidth * 0.05;

      const newWidth =
        mouseMoveEvent.clientX - (document.body.offsetLeft + documentWidth);
      // Update editor width and ensure it does not exceed the container's width
      if (newWidth > 0 && newWidth < containerWidth) {
        setEditorWidth(newWidth);
      }
    }
  };

  // Add event listeners for mousemove and mouseup when isResizing is true and remove them when it is false
  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    }

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  // if the documentwidth changes, then update the containerWidth
  useEffect(() => {
    setContainerWidth(documentWidth);
  }, [documentWidth]);

  // Optionally, update containerWidth based on the actual container size, e.g., on window resize

  return (
    <Dialog open={props.open} onOpenChange={props.onClose}>
      <DialogContent className="h-[90%] w-fit max-w-[100%]">
        <DialogHeader>
          <DialogTitle>
            {props.selectedRecommendation?.recommendedResourceType}
          </DialogTitle>
          <div className="flex h-full gap-4" style={{ width: "100%" }}>
            <div style={{ width: `${editorWidth}px` }}>
              <Editor
                width={`${editorWidth}px`}
                language="hcl"
                theme="vs-dark"
                value={props.selectedRecommendation?.TerraformScript}
                options={{
                  minimap: { enabled: false },
                }}
              />
            </div>
            <div
              className="cursor-col-resize"
              onMouseDown={startResizing}
              style={{ width: "5px", backgroundColor: "gray" }}
            />
            <div style={{ width: `${chatWindowWidth}px` }}>
              <ChatWindow />
            </div>
          </div>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ChatWindow() {
  return <div className="border-1 h-full border border-black">Chat</div>;
}
