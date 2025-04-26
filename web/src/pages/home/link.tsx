import { Copy, Trash } from "@phosphor-icons/react";
import { Button, Text } from "@/components";
import { useLinkQueries } from "@/queries/links";
import type { Link as LinkType } from "@/types/Link";

interface LinkProps {
  data: LinkType;
}

export function Link({ data }: LinkProps) {
  const { deleteLinkMutation } = useLinkQueries();

  const handleDeleteLink = async () => {
    try {
      await deleteLinkMutation(data.id);
      // adicionar um modal de confirmação
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopyLink = async () => {
    try {
      const fullUrl = `${window.location.origin}/${data.shortUrl}`;
      await navigator.clipboard.writeText(fullUrl);
      console.log("Link copiado com sucesso:", fullUrl);
      // Aqui também pode disparar um toast de sucesso se quiser
    } catch (error) {
      console.error("Erro ao copiar link:", error);
    }
  };

  return (
    <div className="flex flex-col border-t border-gray-200 md:grid grid-cols-[70%,10%,20%] p-2">
      <div className="flex flex-col">
        <Text size="md" className="text-blue-base">
          {window.location.origin}/{data.shortUrl}
        </Text>
        <Text size="sm" className="text-gray-500">
          {data.originalUrl}
        </Text>
      </div>
      <div className="w-full m-auto">
        <Text size="sm" className="text-gray-500">
          {data.accessNumber} acessos
        </Text>
      </div>
      <div className="flex flex-row gap-2 text-gray-600 items-center lg:my-auto md:ml-auto">
        <Button
          type="button"
          variant="icon-button"
          className="w-full md:w-8"
          onClick={handleCopyLink}
        >
          <Copy size={16} className="m-auto" />
        </Button>
        <Button
          type="button"
          variant="icon-button"
          className="w-full md:w-8"
          onClick={handleDeleteLink}
        >
          <Trash size={16} className="m-auto" />
        </Button>
      </div>
    </div>
  );
}
