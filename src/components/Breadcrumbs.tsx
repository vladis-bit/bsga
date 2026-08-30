import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type Crumb = { name: string; url: string };

const toPath = (url: string) => url.replace(/^https?:\/\/[^/]+/, "") || "/";

/**
 * Visible breadcrumb navigation mirroring the BreadcrumbList schema emitted by
 * <SEO breadcrumbs={...} />. Keep both lists identical.
 */
const Breadcrumbs = ({ items, className = "" }: { items: Crumb[]; className?: string }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={`container mx-auto px-4 pt-20 sm:px-6 sm:pt-24 ${className}`}>
      <Breadcrumb>
        <BreadcrumbList className="text-xs text-muted-foreground sm:text-sm">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <Fragment key={item.url}>
                {i > 0 && (
                  <BreadcrumbSeparator className="opacity-60">
                    <ChevronRight />
                  </BreadcrumbSeparator>
                )}
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-medium">{item.name}</BreadcrumbPage>
                  ) : (
                    <Link to={toPath(item.url)} className="transition-colors hover:text-gold">
                      {item.name}
                    </Link>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
