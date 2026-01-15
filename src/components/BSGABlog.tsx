import { Newspaper } from "lucide-react";

const BSGABlog = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Newspaper className="h-16 w-16 text-gold mb-4" />
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        BSGA Blog
      </h2>
      <p className="text-muted-foreground">
        Už čoskoro...
      </p>
    </div>
  );
};

export default BSGABlog;
