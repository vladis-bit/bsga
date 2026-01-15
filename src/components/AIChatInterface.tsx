import { useState } from "react";
import { Paperclip, Globe, Settings, Images, Mic } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AIChatInterface = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-4 shadow-lg">
        {/* Text Input Area */}
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Napíš svoju otázku..."
          className="min-h-[80px] bg-transparent border-0 resize-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        {/* Bottom Controls */}
        <div className="flex items-center justify-between mt-2">
          {/* Left Icons */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
            >
              <Globe className="h-5 w-5" />
            </Button>
            
            <div className="w-px h-5 bg-border/50 mx-1" />
            
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
            >
              <Images className="h-5 w-5" />
            </Button>
          </div>

          {/* Mic Button */}
          <Button
            size="icon"
            className="h-10 w-10 rounded-full bg-background border border-border hover:bg-muted text-foreground shadow-sm"
          >
            <Mic className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
