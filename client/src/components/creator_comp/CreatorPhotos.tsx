import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ImageCard from "./ImageCard";
import { useOutletContext } from "react-router-dom";

interface Photo {
  post_id: string;
  user_id: string;
  image_url: string;
  time_stamp: string;
  caption: string;
  location: string;
  post_type?: string;
}

const CreatorPhotos = () => {
  const creator_id = useOutletContext<string>();

  const {
    data: photos,
    isError,
    error,
    isLoading,
  } = useQuery<Photo[], Error>({
    queryKey: ["creatorPhotos"],
    queryFn: () =>
      axios
        .get(`http://localhost:4002/api/queries/user/posts/${creator_id}`, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((error) => console.log(error)),
  });

  if (isError) return <div>{error.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <p className="mt-3 text-gray-500">Your photos</p>
      <div className="mt-5 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos?.map((photo) => (
          <ImageCard key={photo.post_id} imageData={photo} />
        ))}
      </div>
    </>
  );
};

export default CreatorPhotos;
