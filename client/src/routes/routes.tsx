import { createBrowserRouter } from "react-router-dom";
import ExplorePage from "../pages/ExplorePage";
import YouPage from "../pages/YouPage";
import Layout from "../pages/Layout";
import CreatorsPage from "../pages/CreatorsPage";
import LikedPhotos from "../components/LikedPhotos";
import YourPhotos from "../components/YourPhotos";
import ImageViewPage from "../pages/ImageViewPage";
import YourImageViewPage from "../pages/YourImageViewPage";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import LoginPage from "../pages/LoginPage";
import PublicRoutes from "./PublicRoutes";
import RegisterPage from "../pages/RegisterPage";
import PhotoUploadPage from "../pages/PhotoUploadPage";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },

  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
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
          { path: "upload", element: <PhotoUploadPage /> },
          { path: "creators", element: <CreatorsPage /> },
          { path: "view_image/:src", element: <ImageViewPage /> },
          { path: "view_your_image/:src", element: <YourImageViewPage /> },
        ],
      },
    ],
  },
]);

export default router;
