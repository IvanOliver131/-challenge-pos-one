import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // biome-ignore lint/style/useNumberNamespace: <explanation>
      staleTime: Infinity,
    },
  },
});
