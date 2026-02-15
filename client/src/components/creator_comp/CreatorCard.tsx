import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  creatorData: Creator;
}

export interface Creator {
  _id: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_image?: {
    url?: string;
    blob_name?: string;
  };
  background_image?: string;
  email: string;
  phone_number?: string;
  location?: string;
  interests?: string[];
}

const CreatorCard = ({ creatorData }: Props) => {
  const navigate = useNavigate();

  const useFollowCreator = useMutation({
    mutationFn: () =>
      axios
        .post(
          `http://lumina.com/api/followers/${creatorData._id}`,
          {},
          { withCredentials: true },
        )
        .then((res) => res.data),

    onSuccess: (response) => {
      if (response?.message === "Already following") {
        toast.success("Already following");
      } else {
        toast.success(
          `Following ${creatorData.first_name} ${creatorData.last_name}`,
        );
      }
    },
  });

  return (
    <>
      <Toaster />
      <div className="mx-auto relative w-full max-w-xs p-1 rounded-xl bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.18)] hover:shadow-lg transition-all duration-300 break-inside-avoid">
        <div
          style={{
            backgroundImage: `url(${
              creatorData.background_image ? creatorData.background_image : ""
            })`,
          }}
          className="h-40 bg-cover bg-center w-full rounded-t-xl bg-sky-900"
        ></div>
        <div className=" h-2/3 overflow-hidden rounded-b-xl flex flex-col gap-2 text-center justify-center items-center p-2">
          <div className="absolute w-24 h-24 bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.18)] rounded-full top-12 left-1/2 -translate-x-1/2"></div>
          <div
            onClick={() => navigate(`/creator_profile/${creatorData._id}`)}
            className="font-bold cursor-pointer hover:scale-101"
          >{`${creatorData.first_name} ${creatorData.last_name}`}</div>
          <div className="text-xs text-gray-600">{creatorData.email}</div>
          <div className="flex justify-center gap-2">
            <div className="text-sm text-gray-600">
              <span className="font-bold text-lg">{156}</span> photos
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-bold text-lg">{12.4}</span> K followers
            </div>
          </div>

          <button
            onClick={() => useFollowCreator.mutate()}
            className="
            border 
            border-sky-900 
            p-2
            font-bold
            w-full
            rounded-full 
            flex 
            items-center
            justify-center
            gap-1 
            text-sm
            bg-sky-800
            text-sky-50
            transition-all
            hover:bg-sky-900
            cursor-pointer
            "
          >
            Follow
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatorCard;
