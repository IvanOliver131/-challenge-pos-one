import { Copy, Trash } from "@phosphor-icons/react";
import { Button, Text } from "@/components";
import { useLinkQueries } from "@/queries/links";

export function Link() {
  const { deleteLinkMutation } = useLinkQueries();

  const handleDeleteLink = async () => {
    try {
      await deleteLinkMutation();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col border-t border-gray-200 md:grid grid-cols-[70%,10%,20%] p-2">
      <div className="flex flex-col">
        <Text size="md" className="text-blue-base">
          brev.ly/Portfolio-Dev
        </Text>
        <Text size="sm" className="text-gray-500">
          devsite.portfolio.com.br/devname-123456
        </Text>
      </div>
      <div className="w-full m-auto">
        <Text size="sm" className="text-gray-500">
          30 acessos
        </Text>
      </div>
      <div className="flex flex-row gap-2 text-gray-600 items-center lg:my-auto md:ml-auto">
        <Button variant="icon-button" className="w-full md:w-8">
          <Copy size={16} className="m-auto" />
        </Button>
        <Button
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
