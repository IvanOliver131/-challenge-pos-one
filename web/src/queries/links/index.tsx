import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addLink,
  deleteLink,
  downloadCSVLinks,
  getLinks,
} from "@/services/links";
import { queryClient } from "@/services/query-client";

export function useLinkQueries() {
  const links = useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
  });

  const { mutateAsync: addLinkMutation } = useMutation({
    mutationFn: addLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const { mutateAsync: deleteLinkMutation } = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const { mutateAsync: downloadLinksMutation } = useMutation({
    mutationFn: downloadCSVLinks,
  });

  return {
    links,
    addLinkMutation,
    deleteLinkMutation,
    downloadLinksMutation,
  };
}
