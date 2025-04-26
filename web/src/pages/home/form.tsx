import { Button, Input, Text } from "@/components";

import { type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Warning } from "@phosphor-icons/react";
import { useLinkQueries } from "@/queries/links";
import type { LinkData } from "@/types/Link";

const schema = yup
  .object({
    originalUrl: yup
      .string()
      .required("Campo obrigatório")
      .url("O valor inserido deve ser uma URL válida"),
    shortUrl: yup.string().required("Campo obrigatório"),
  })
  .required();

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<LinkData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { addLinkMutation } = useLinkQueries();

  const onSubmit: SubmitHandler<LinkData> = async (data) => {
    try {
      await addLinkMutation(data);

      reset();
      // adicionar toast de sucesso
    } catch (error) {
      // adicionar toast de erro
      console.log(error);
    }
  };

  return (
    <form
      className="h-96 p-8 bg-white rounded flex flex-col gap-6 w-full md:w-[380px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Text size="lg">Novo Link</Text>
      <div className="flex flex-col gap-4">
        <Input
          title="link original"
          placeholder="www.exemplo.com"
          error={!!errors.originalUrl}
          errorMessage={
            <div className="flex items-center gap-1">
              <Warning size={16} /> {errors.originalUrl?.message}
            </div>
          }
          {...register("originalUrl")}
        />
        <Input
          title="link encurtado"
          placeholder="brev.ly/"
          error={!!errors.shortUrl}
          errorMessage={
            <div className="flex items-center gap-1">
              <Warning size={16} /> {errors.shortUrl?.message}
            </div>
          }
          {...register("shortUrl")}
        />
      </div>
      <Button disabled={!isValid || isSubmitting}>Salvar link</Button>
    </form>
  );
}
