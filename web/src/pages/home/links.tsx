import { useLinkQueries } from "@/queries/links";
import { Link } from "./link";

export function Links() {
  const { links } = useLinkQueries();

  console.log(links);

  return (
    <div className="flex flex-col max-h-[360px] overflow-auto">
      <Link />
      <Link />
      <Link />
      <Link />
      <Link />
      <Link />
      <Link />
      <Link />
      <Link />
      <Link />
    </div>
  );
}
