import { Download, Link } from "@phosphor-icons/react";
import { Text, Button } from "@/components";
import { Links } from "./links";
import { useLinkQueries } from "@/queries/links";
import { useToast } from "@/hooks/use-toast";

export function MyLinks() {
  const {
    links: { data, hasNextPage, fetchNextPage, isFetchingNextPage },
    downloadLinksMutation,
  } = useLinkQueries();
  const { success, notifyError } = useToast();

  const handleDownloadCSV = async () => {
    try {
      const { linksCsvUrl } = await downloadLinksMutation();
      const link = document.createElement("a");

      link.href = linksCsvUrl;
      link.download = "";
      link.target = "_blank";

      document.body.appendChild(link);

      link.click();
      link.remove();

      success("Download realizado com sucesso!");
    } catch (error) {
      console.log("Erro ao realizar o download:", error);

      notifyError("Erro ao realizar o download:");
    }
  };

  const allLinks = data?.pages.flatMap((page) => page.links) ?? [];

  return (
    <form className="p-8 bg-white rounded flex flex-col flex-1 h-full">
      <header className="flex justify-between mb-5">
        <Text size="lg">Meus links</Text>
        <Button
          type="button"
          styleButton="icon-button"
          className="max-w-[100px]"
          onClick={handleDownloadCSV}
          disabled={!data}
        >
          <div className="flex justify-center items-center gap-1 p-1">
            <Download height={16} width={16} />
            <Text size="sm" className="font-semibold">
              Baixar CSV
            </Text>
          </div>
        </Button>
      </header>

      <section className="flex-1 overflow-y-auto">
        {allLinks.length > 0 ? (
          <>
            <Links data={allLinks} />

            {hasNextPage && (
              <div className="flex justify-center mt-4">
                <Button
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <hr className="h-px mt-5 mb-4 bg-gray-200 border-0" />
            <div className="flex flex-col items-center justify-center h-[102px]">
              <Link className="text-gray-400" height={32} width={32} />
              <Text
                size="xs"
                className="font-semibold text-gray-400 gap-3 uppercase"
              >
                Ainda não existem links cadastrados
              </Text>
            </div>
          </>
        )}
      </section>
    </form>
  );
}
