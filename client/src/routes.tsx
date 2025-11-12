import { createBrowserRouter } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";
import YouPage from "./pages/YouPage";
import Layout from "./pages/Layout";
import CreatorsPage from "./pages/CreatorsPage";
import LikedPhotos from "./components/LikedPhotos";
import YourPhotos from "./components/YourPhotos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ExplorePage /> },
      {
        path: "you",
        element: <YouPage />,
        children: [
          { index: true, element: <YourPhotos /> },
          { path: "liked_photos", element: <LikedPhotos /> },
        ],
      },
      { path: "creators", element: <CreatorsPage /> },
    ],
  },
]);

export default router;
