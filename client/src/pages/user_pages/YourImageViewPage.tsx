import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { CiShare2 } from "react-icons/ci";
import { GoTools } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import type { Photo } from "../../components/YourImageCard";

const YourImageViewPage = () => {
  const { post_id } = useParams();
  const postId = post_id ? decodeURIComponent(post_id) : undefined;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const useDeletePhoto = useMutation({
    mutationFn: (post_id: string) =>
      axios
        .delete("http://xlocalhost:4002/api/posts", {
          data: { post_id },
          withCredentials: true,
        })
        .then((res) => res.data),

    onSuccess: () => {
      toast.success("Photo deleted");
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      navigate("/you");
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const {
    data: post,
    error,
    isError,
    isLoading,
  } = useQuery<Photo, Error>({
    queryKey: ["user", "post", postId],
    queryFn: () =>
      axios
        .get(`http://localhost:4002/api/queries/user/${postId}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
    // enabled: !!post_id, // Query only runs when post_id is a truthy valu
  });

  if (isError) return <div>{error.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Toaster />
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
            Statistics of the image
          </div>
          <div className="">
            <div className="flex flex-col gap-3 px-4 py-6 shadow-[0px_0px_5px_rgba(0,0,0,0.18)] rounded-2xl">
              <button
                className="border
                w-full
                p-2 
                rounded-full 
                flex 
                items-center
                justify-center
                gap-1 
                hover:bg-black
                hover:text-sky-50
                transition-all
                text-black
                "
              >
                <GoTools size={16} />
                <span className=""> Update</span>
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
                onClick={() => {
                  if (post?.post_id) useDeletePhoto.mutate(post.post_id);
                }}
                className="border 
                border-red-500
                w-full
                p-2 
                rounded-full 
                flex 
                items-center 
                justify-center
                gap-1         
                hover:bg-red-500
                hover:text-sky-50
                transition-all
                text-red-500
                "
              >
                <AiOutlineDelete size={16} />
                <span className="">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourImageViewPage;
