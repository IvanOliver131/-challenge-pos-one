import { LogoNotFound } from "@/assets";
import { Text } from "@/components";

export default function ErrorPage() {
  return (
    <div className="h-screen flex justify-center max-w-[500px] items-center m-auto p-2">
      <div className="bg-white px-12 py-16 rounded-lg flex flex-col items-center gap-6">
        <LogoNotFound />
        <Text size="xl" className="text-gray-600">
          Link não encontrado
        </Text>
        <Text className="text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{" "}
          <a href="/" className="text-blue-base font-bold">
            brev.ly.
          </a>
        </Text>
      </div>
    </div>
  );
}
