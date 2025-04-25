import { LogoIcon } from "@/assets";
import { Text } from "@/components";

export default function Redirect() {
  return (
    <div className="h-screen flex justify-center max-w-[500px] items-center m-auto p-2">
      <div className="bg-white px-12 py-16 rounded-lg flex flex-col items-center gap-6">
        <LogoIcon />
        <Text size="xl" className="text-gray-600">
          Redirecionando...
        </Text>
        <Text className="text-gray-500">
          O link será aberto automaticamente em alguns instantes. Não foi
          redirecionado?
          <a href="/" className="text-blue-base font-bold">
            Acesse aqui
          </a>
        </Text>
      </div>
    </div>
  );
}
