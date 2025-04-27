import { createBrowserRouter } from "react-router";
import { Home, ErrorPage, Redirect } from "./pages";

const Router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/not-found",
    element: <ErrorPage />,
  },
  {
    path: "/:shortUrl",
    element: <Redirect />,
  },
]);

export default Router;
