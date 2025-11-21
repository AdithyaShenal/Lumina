import { useParams } from "react-router-dom";
import CreatorCardMinimal from "../../components/creator_comp/CreatorCardMinimal";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type Image } from "../ExplorePage";

const ImageViewPage = () => {
  const { post_id } = useParams();
  const postId = decodeURIComponent(post_id || "");

  const {
    data: post,
    error,
    isError,
    isLoading,
  } = useQuery<Image, Error>({
    queryKey: ["posts", postId],
    queryFn: () =>
      axios
        .get(`http://localhost:4002/api/queries/user/${postId}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  if (isError) {
    console.log(error);
    return <div>{error.message}</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,20rem)] gap-4">
        <div className=" rounded-2xl">
          <img
            src={post?.image_url}
            alt="Image"
            loading="lazy"
            className="rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.18)]"
          />
          <div className="mt-5">
            <h4>{post?.caption}</h4>
            <p className="mt-3 text-gray-500">{post?.location}</p>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-4">
          <div className="rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.18)]">
            <CreatorCardMinimal />
          </div>
          <div className="">
            <div className="flex flex-col gap-3 px-4 py-6 shadow-[0px_0px_5px_rgba(0,0,0,0.18)] rounded-2xl">
              <button
                className="border
                w-full
                border-sky-900 
                p-2 
                rounded-full 
                flex 
                items-center
                justify-center
                gap-1 
                hover:bg-sky-900
                hover:text-sky-50
                transition-all
                text-sky-900
                "
              >
                <IoMdHeartEmpty size={18} />
                <span className=""> Like</span>
              </button>
              <button
                className="border 
                border-sky-900
                w-full 
                p-2 
                rounded-full 
                flex 
                items-center 
                justify-center
                gap-1 
                hover:bg-sky-900
                hover:text-sky-50
                transition-all
                text-sky-900
                "
              >
                <CiShare2 size={20} />
                <span className="">Share</span>
              </button>
              <button
                className="border 
                border-sky-900 
                w-full
                p-2 
                rounded-full 
                flex 
                items-center 
                justify-center
                gap-1         
                hover:bg-sky-900
                hover:text-sky-50
                transition-all
                text-sky-900
                "
              >
                <IoCloudDownloadOutline size={18} />
                <span className="">Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageViewPage;
