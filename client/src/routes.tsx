import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import YouPage from "./pages/YouPage";
import Layout from "./pages/Layout";
import Trending from "./pages/Trending";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/you", element: <YouPage /> },
      { path: "/explore", element: <ExplorePage /> },
      { path: "/trending", element: <Trending /> },
    ],
  },
]);

export default router;
