import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Text } from "../../components/text";

export function Form() {
  return (
    <form className="h-[340px] p-8 bg-white rounded flex flex-col gap-6 w-full md:w-[380px]">
      <Text size="lg">Novo Link</Text>
      <div className="flex flex-col gap-4">
        <Input title="link original" placeholder="www.exemplo.com" />
        <Input title="link encurtado" placeholder="brev.ly/" />
      </div>
      <Button disabled>Salvar link</Button>
    </form>
  );
}
