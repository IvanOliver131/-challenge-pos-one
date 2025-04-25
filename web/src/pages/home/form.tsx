import { Button, Input, Text } from "@/components";

import { type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Warning } from "@phosphor-icons/react";
import { useLinkQueries } from "@/queries/links";
import type { LinkData } from "@/types/Link";

const schema = yup
  .object({
    originalLink: yup.string().required("Campo obrigatório"),
    shortLink: yup.string().required("Campo obrigatório"),
  })
  .required();

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LinkData>({
    resolver: yupResolver(schema),
  });
  const { addLinkMutation } = useLinkQueries();

  const onSubmit: SubmitHandler<LinkData> = (data) => addLinkMutation(data);

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
          error={!!errors.originalLink}
          errorMessage={
            <div className="flex items-center gap-1">
              <Warning size={16} /> {errors.originalLink?.message}
            </div>
          }
          {...register("originalLink")}
        />
        <Input
          title="link encurtado"
          placeholder="brev.ly/"
          error={!!errors.shortLink}
          errorMessage={
            <div className="flex items-center gap-1">
              <Warning size={16} /> {errors.shortLink?.message}
            </div>
          }
          {...register("shortLink")}
        />
      </div>
      <Button disabled={!isValid || isSubmitting}>Salvar link</Button>
    </form>
  );
}
