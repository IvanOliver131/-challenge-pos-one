import { Link } from "./link";
import type { Link as LinkType } from "@/types/Link";

interface LinksProps {
  data: LinkType[];
}

export function Links({ data }: LinksProps) {
  return (
    <div className="flex flex-col max-h-[360px] overflow-auto">
      {data.map((link) => {
        return <Link key={link.id} data={link} />;
      })}
    </div>
  );
}
