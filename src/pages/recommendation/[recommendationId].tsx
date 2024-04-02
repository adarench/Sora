import { Editor } from "@monaco-editor/react";
import { Button } from "components/ui/button";
import { useRouter } from "next/router";
import { use, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { StubbedRecommendations } from "~/StubbedRecommendations";
import { Layout } from "~/components/Layout";
import { createRoot } from "react-dom/client";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { ChatWindow } from "~/components/ChatWindow";
import { api } from "~/utils/api";
import { CircularProgress, DialogTitle } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "components/ui/dialog";

import * as monaco from "monaco-editor";

export default function RecommendationPage() {
  const router = useRouter();
  const recommendationId = router.query.recommendationId as string;
  const editorRef = useRef<HTMLDivElement>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApplyChange = () => {
    setLoading(true);
    setTimeout(() => {
      setShowSuccessDialog(true);
      setLoading(false);
    }, 5000);
  };

  useEffect(() => {
    // Client-side check to ensure window is defined before initializing Monaco Editor
    if (typeof window !== "undefined") {
      // Since Monaco Editor and its API are browser-only, we require it inside useEffect
      // Assuming getRecommendation function is defined elsewhere in your component or imported
      const recommendationScript =
      getRecommendation(recommendationId)?.TerraformScript ?? "";

      const editorInstance = monaco.editor.create(editorRef.current!, {
        value: recommendationScript,
        language: "hcl",
        theme: "vs-dark",
        minimap: { enabled: false },
        
      });
      interface ContentWidget {
        domNode?: HTMLElement;
        root?: ReturnType<typeof createRoot>;
        getDomNode: () => HTMLElement;
        getId: () => string;
        getPosition: () => { position: { lineNumber: number; column: number }; 
        preference: monaco.editor.ContentWidgetPositionPreference[] }; // Adjust the return type according to your needs
      }
      

      const contentWidget: ContentWidget = {
        getDomNode: function () {
          if (!this.domNode) {
            this.domNode = document.createElement("div");
            this.domNode.innerHTML = "";
            const root = createRoot(this.domNode);
            root.render(<Overlay />);
            this.root = root;
          }
          return this.domNode;
        },

        getId: function () {
          return "my.content.widget";
        },
        /*getDomNode: function () {
           return this.domNode;
         },*/
        getPosition: function () {
          return {
            position: {
              lineNumber: 34,
              column: 16,
            },
            preference: [
              monaco.editor.ContentWidgetPositionPreference.ABOVE,
              // monaco.editor.ContentWidgetPositionPreference.BELOW,
            ],
          };
        },
      };
      requestAnimationFrame(() => {
        editorInstance.addContentWidget(contentWidget);
      });

      return () => {
        editorInstance.dispose();
        if (contentWidget.root) {
          contentWidget.root.unmount(); // Properly unmounts the React component
        }
      };
    }
  }, [recommendationId]);

  const getRecommendation = (recommendationId: string) => {
    const recommendation = StubbedRecommendations.filter(
      (recommendation) => recommendation.recommendationId === recommendationId,
    );
    return recommendation[0]; // Ensure you handle the case where no recommendation is found
  };

  return (
    <Layout>
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-[calc(100vh-150px)] w-[750px]">
          <div ref={editorRef} className="editor-container h-full w-full"></div>
        </div>
        <div className="flex w-[750px] justify-start gap-4">
          <Button variant="secondary">Run Sim</Button>
          <Button
            variant="secondary"
            onClick={handleApplyChange}
            className="flex w-[120px] items-center justify-center"
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Apply Change"
            )}
          </Button>
        </div>
      </div>
      <SuccessDialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
      />
    </Layout>
  );
}

const Overlay = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="secondary">
          <Lightbulb size={16} />
          What&apos;s This?
          <Lightbulb size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[370px]">
        <Tabs defaultValue="recommendation">
          <TabsList className="flex w-fit justify-center">
            <TabsTrigger value="recommendation">
              This Recommendation
            </TabsTrigger>
            <TabsTrigger value="terraform">Terraform</TabsTrigger>
            <TabsTrigger value="sora">Ask Sora</TabsTrigger>
          </TabsList>
          <TabsContent value="recommendation" className="text-sm">
            <RecommendationsTab />
          </TabsContent>
          <TabsContent value="terraform"></TabsContent>
          <TabsContent value="sora" className="h-[300px]">
            <ChatWindow />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

const RecommendationsTab = () => {
  const [learnMoreStage, setLearnMoreStage] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      {RecommendationMessages.map((message, index) => {
        if (index < learnMoreStage) {
          return <div key={index}>{message}</div>;
        }
      })}

      {learnMoreStage <= RecommendationMessages.length - 1 ? (
        <Button
          variant="secondary"
          onClick={() => setLearnMoreStage(learnMoreStage + 1)}
          className="w-fit bg-slate-100"
        >
          Learn More
        </Button>
      ) : null}
    </div>
  );
};

const RecommendationMessages = [
  "Based on your current usage, we believe you can downsize your current EC2 instance and be just as efficient. The t3.medium instance would suit your needs. Make sure your workloads CPU and memory requirements don't exceed a t3.medium.",
  "CPU and Memory: \n\nm5.xlarge offers 4 vCPU's and 16 GB of memory, which is ideal for larger applications. T3.medium provides 2 vCPU's and 4GB of memory which is morefitting for medium sized loads. ",
  "Use Case: \n\nm5.xlarge is best for memory intensive apps, while t3 medium is good from smaller environments",
  "Real Life Scenario: \n\nDigital marketing firm x reduced thier aws bill by 22% after downsizing to t3 medium for their CMS.\n\n[link]",
  "Personalized Feedback: \n\nSince your workload is mostly periodical in nature, t3 medium can be cost effective. if you're worried about usage spikes, use AWS auto scaling as a supplement here.\n\nFor more information click the ask Sora tab above!",
];

const SuccessDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your infrastructure has been updated.</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={onClose}>
            Return to Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};