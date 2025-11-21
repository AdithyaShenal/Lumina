import CreatorStatTab from "../../components/creator_comp/CreatorStatTab";
import CreatorActivitiesTab from "../../components/creator_comp/CreatorActivitiesTab";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { type Creator } from "../../components/creator_comp/CreatorCard";
import { Outlet, useParams } from "react-router-dom";

const CreatorProfile = () => {
  const { creator_id } = useParams();

  const { data: creator, isLoading } = useQuery<Creator, AxiosError<any>>({
    queryKey: ["creator", creator_id],
    queryFn: () =>
      axios
        .get(`http://localhost:4001/api/search/id/${creator_id}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full h-[40vh] rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.18)]">
        <div
          style={{
            backgroundImage: `url(https://picsum.photos/1280/720?random=1)`,
          }}
          className="w-full h-3/4 bg-center bg-cover rounded-t-2xl"
        ></div>
        <div className="relative w-full h-1/4 bg rounded-b-2xl">
          <div
            onClick={() => {}}
            style={{ backgroundImage: `url(${creator?.profile_image?.url})` }}
            className="absolute
              w-32 h-32 
              bg-amber-200 
              bg-cover 
              -top-25
              rounded-full 
              m-4
              active:scale-99
              cursor-pointer
              border-2
              border-sky-50
              shadow-[0px_0px_10px_rgba(0,0,0,0.50)]
              md:w-40 md:h-40 md:-top-35"
          ></div>
          <div className="w-auto ml-45 mt-2 md:ml-52">
            <span className="text-xl font-bold">{`${creator?.first_name} ${creator?.last_name}`}</span>
          </div>
          <div className="w-auto ml-45 md:ml-52">
            <span className="text-gray-500">{creator?.email}</span>
          </div>
        </div>
      </div>
      <CreatorStatTab />
      <CreatorActivitiesTab />
      <Outlet context={creator_id} />
    </>
  );
};

export default CreatorProfile;
