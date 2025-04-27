import { Copy, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { Button, Text } from "@/components";
import { ModalConfirm } from "./modal-confirm";
import { useLinkQueries } from "@/queries/links";
import type { Link as LinkType } from "@/types/Link";
import { useToast } from "@/hooks/use-toast";

interface LinkProps {
  data: LinkType;
}

export function Link({ data }: LinkProps) {
  const { deleteLinkMutation } = useLinkQueries();
  const { success, notifyError } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteLink = async () => {
    try {
      await deleteLinkMutation(data.id);
      success("Link deletado com sucesso!");
    } catch (error) {
      console.log(error);
      notifyError("Erro ao deletar link");
    }
  };

  const handleCopyLink = async () => {
    try {
      const fullUrl = `${window.location.origin}/${data.shortUrl}`;
      await navigator.clipboard.writeText(fullUrl);
      success("Link copiado com sucesso!");
    } catch (error) {
      console.error("Erro ao copiar link:", error);
      notifyError("Erro ao copiar link");
    }
  };

  return (
    <>
      <div className="flex flex-col border-t border-gray-200 md:grid grid-cols-[70%,10%,20%] p-2">
        <div className="flex flex-col">
          <Text size="md" className="text-blue-base">
            {window.location.origin}/{data.shortUrl}
          </Text>
          <Text size="sm" className="text-gray-500 break-words">
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
            styleButton="icon-button"
            className="w-full md:w-8"
            onClick={handleCopyLink}
          >
            <Copy size={16} className="m-auto" />
          </Button>
          <Button
            type="button"
            styleButton="icon-button"
            className="w-full md:w-8"
            onClick={() => setIsModalOpen(true)}
          >
            <Trash size={16} className="m-auto" />
          </Button>
        </div>
      </div>

      <ModalConfirm
        isOpen={isModalOpen}
        title="Deletar link"
        description="Tem certeza que deseja deletar este link? Essa ação não pode ser desfeita."
        onConfirm={() => {
          handleDeleteLink();
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
}
