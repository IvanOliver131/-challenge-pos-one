import { Button, Text } from "@/components";

interface ModalConfirmProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ModalConfirm({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
}: ModalConfirmProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full flex flex-col gap-4">
        <Text size="xl" className="font-bold text-center text-gray-700">
          {title}
        </Text>
        <Text className="text-center text-gray-500">{description}</Text>
        <div className="flex gap-4 mt-4">
          <Button
            type="button"
            className="w-full bg-gray-200 text-gray-500 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            styleButton="default"
            className="w-full"
            onClick={onConfirm}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
