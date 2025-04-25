import { Download, Link } from "@phosphor-icons/react";
import { Text, Button } from "@/components";
import { Links } from "./links";
import { useLinkQueries } from "@/queries/links";

export function MyLinks() {
  const { links, downloadLinksMutation } = useLinkQueries();

  const handleDownloadCSV = () => {
    downloadLinksMutation();
  };

  return (
    <form className="p-8 bg-white rounded flex flex-col flex-1 h-full">
      <header className="flex justify-between mb-5">
        <Text size="lg">Meus links</Text>
        <Button
          variant="icon-button"
          className="max-w-[100px]"
          onClick={handleDownloadCSV}
          disabled={!links.data}
        >
          <div className="flex justify-center items-center gap-1 p-1">
            <Download height={16} width={16} />
            <Text size="sm" className="font-semibold">
              Baixar CSV
            </Text>
          </div>
        </Button>
      </header>

      <section>
        {/* <hr className="h-px mt-5 mb-4 bg-gray-200 border-0" /> */}
        {/* not found */}
        {/* <div className="flex flex-col items-center justify-center h-[102px]">
          <Link className="text-gray-400" height={32} width={32} />
          <Text
            size="xs"
            className="font-semibold text-gray-400 gap-3 uppercase"
          >
            ainda não existem links cadastrados
          </Text>
        </div> */}
        {/* list links */}
        <Links />
      </section>
    </form>
  );
}
