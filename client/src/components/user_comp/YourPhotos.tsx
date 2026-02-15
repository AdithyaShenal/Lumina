import { useQuery } from "@tanstack/react-query";
import YourImageCard from "./YourImageCard";
import axios from "axios";

// This should be deleted and, export the interface from <YourImageCard>
interface Photo {
  post_id: string;
  user_id: string;
  image_url: string;
  time_stamp: string;
  caption: string;
  location: string;
  post_type?: string;
}

const YourPhotos = () => {
  const {
    data: photos,
    isLoading,
    isError,
    error,
  } = useQuery<Photo[], Error>({
    queryKey: ["userPosts"],
    queryFn: () =>
      axios
        .get("http://lumina.com/api/queries/user/posts/all", {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  if (!photos || photos?.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 border border-gray-200 rounded-lg mt-5">
        You haven't uploaded any photos yet.
      </div>
    );
  }

  return (
    <>
      <p className="mt-3 text-gray-500">Your photos</p>
      <div className="mt-5 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos?.map((photo) => (
          <YourImageCard key={photo.post_id} imageData={photo} />
        ))}
      </div>
    </>
  );
};

export default YourPhotos;
