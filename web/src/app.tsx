import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/query-client";
import { RouterProvider } from "react-router";
import Router from "./router";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <div className="h-dvh">
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </div>
  );
}
