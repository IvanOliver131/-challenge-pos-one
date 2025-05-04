import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import {
  addLink,
  deleteLink,
  downloadCSVLinks,
  getLinks,
} from "@/services/links";
import { queryClient } from "@/services/query-client";
import { getLink } from "@/services/links/get-link";

export function useLinkQueries() {
  const links = useInfiniteQuery({
    queryKey: ["links", "infinite"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getLinks(pageParam);
      return {
        links: response.links,
        total: response.total,
        currentPage: pageParam,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce(
        (acc, p) => acc + (p.links?.length || 0),
        0
      );
      const hasMore = totalLoaded < lastPage.total;
      return hasMore ? lastPage.currentPage + 1 : undefined;
    },
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

  const { mutateAsync: getLinkMutation } = useMutation({
    mutationFn: getLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  return {
    links,
    addLinkMutation,
    deleteLinkMutation,
    downloadLinksMutation,
    getLinkMutation,
  };
}
