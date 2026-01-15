import { useState, useRef } from "react";
import { Paperclip, Globe, Brain, PenTool, Mic, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMode = "ask" | "think" | "canvas";

const AIChatInterface = () => {
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<ChatMode>("ask");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (message.trim() || selectedFile) {
      console.log("Sending message:", message, "File:", selectedFile?.name, "Mode:", mode);
      setMessage("");
      setSelectedFile(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const getPlaceholder = () => {
    switch (mode) {
      case "think":
        return "Premýšľaj hlboko...";
      case "canvas":
        return "Vytvor niečo nové...";
      default:
        return "Napíš svoju otázku...";
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-4 shadow-lg">
        {/* Selected File Preview */}
        {selectedFile && (
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">
            <Paperclip className="h-4 w-4" />
            <span className="truncate">{selectedFile.name}</span>
            <button
              onClick={() => setSelectedFile(null)}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
        )}

        {/* Text Input Area */}
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={getPlaceholder()}
          className="min-h-[80px] bg-transparent border-0 resize-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Bottom Controls */}
        <div className="flex items-center justify-between mt-2">
          {/* Left Icons */}
          <div className="flex items-center gap-1">
            {/* Mic Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-background border border-border hover:bg-muted text-foreground shadow-sm"
            >
              <Mic className="h-5 w-5" />
            </Button>

            {/* Upload File */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
            >
              <Paperclip className="h-5 w-5" />
            </Button>

            {/* Ask Mode */}
            <Button
              variant="ghost"
              onClick={() => setMode("ask")}
              className={cn(
                "h-9 px-3 rounded-full transition-all flex items-center gap-1.5",
                mode === "ask"
                  ? "text-primary border border-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Globe className="h-5 w-5" />
              {mode === "ask" && (
                <span className="text-sm font-medium">Ask</span>
              )}
            </Button>
            
            <div className="w-px h-5 bg-border/50 mx-1" />
            
            {/* Think Mode */}
            <Button
              variant="ghost"
              onClick={() => setMode("think")}
              className={cn(
                "h-9 px-3 rounded-full transition-all flex items-center gap-1.5",
                mode === "think"
                  ? "text-primary border border-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Brain className="h-5 w-5" />
              {mode === "think" && (
                <span className="text-sm font-medium">Think</span>
              )}
            </Button>

            {/* Canvas Mode */}
            <Button
              variant="ghost"
              onClick={() => setMode("canvas")}
              className={cn(
                "h-9 px-3 rounded-full transition-all flex items-center gap-1.5",
                mode === "canvas"
                  ? "text-primary border border-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <PenTool className="h-5 w-5" />
              {mode === "canvas" && (
                <span className="text-sm font-medium">Canvas</span>
              )}
            </Button>
          </div>

          {/* Send Button */}
          <Button
            size="icon"
            onClick={handleSubmit}
            disabled={!message.trim() && !selectedFile}
            className="h-10 w-10 rounded-full bg-gold hover:bg-gold/90 text-primary shadow-sm disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
