import { createBrowserRouter } from "react-router-dom";
import ExplorePage from "../pages/ExplorePage";
import YouPage from "../pages/user_pages/YouPage";
import Layout from "../pages/Layout";
import CreatorsPage from "../pages/creator_pages/CreatorsPage";
import LikedPhotos from "../components/user_comp/LikedPhotos";
import YourPhotos from "../components/user_comp/YourPhotos";
import ImageViewPage from "../pages/creator_pages/ImageViewPage";
import YourImageViewPage from "../pages/user_pages/YourImageViewPage";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import LoginPage from "../pages/LoginPage";
import PublicRoutes from "./PublicRoutes";
import RegisterPage from "../pages/RegisterPage";
import PhotoUploadPage from "../pages/user_pages/PhotoUploadPage";
import SettingsPage from "../pages/user_pages/SettingsPage";
import CreatorProfile from "../pages/creator_pages/CreatorProfile";
import CreatorPhotos from "../components/creator_comp/CreatorPhotos";
import CreatorFollowers from "../components/creator_comp/CreatorFollowers";
import CreatorFollowing from "../components/creator_comp/CreatorFollowing";
import YouFollowing from "../components/user_comp/YouFollowing";
import YouFollowers from "../components/user_comp/YouFollowers";

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
              { path: "following", element: <YouFollowing /> },
              { path: "followers", element: <YouFollowers /> },
            ],
          },
          { path: "settings", element: <SettingsPage /> },
          { path: "upload", element: <PhotoUploadPage /> },
          { path: "creators", element: <CreatorsPage /> },
          {
            path: "creator_profile/:creator_id",
            element: <CreatorProfile />,
            children: [
              { index: true, element: <CreatorPhotos /> },
              { path: "followers", element: <CreatorFollowers /> },
              { path: "following", element: <CreatorFollowing /> },
            ],
          },
          { path: "view_image/:post_id", element: <ImageViewPage /> },
          { path: "view_your_image/:post_id", element: <YourImageViewPage /> },
        ],
      },
    ],
  },
]);

export default router;
