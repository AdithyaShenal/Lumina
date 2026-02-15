import { useQuery } from "@tanstack/react-query";
import YouFollowingCard from "./YouFollowingCard";
import axios from "axios";
import type { Creator } from "../creator_comp/CreatorCard";
// import { useOutletContext } from "react-router-dom";

const YouFollowing = () => {
  // const user_id = useOutletContext<string>();

  const {
    data: creators,
    isError,
    error,
    isLoading,
  } = useQuery<Creator[], Error>({
    queryKey: ["following"],
    queryFn: () =>
      axios
        .get(`http://lumina.com/api/followers/following`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  console.log(creators);

  if (isError) return <div>{error.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="mt-5 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-10">
        {creators?.length === 0 ? (
          <div className="mt-3 text-gray-500">Not following yet</div>
        ) : (
          creators?.map((creator) => (
            <YouFollowingCard creatorData={creator} key={creator._id} />
          ))
        )}
      </div>
    </>
  );
};

export default YouFollowing;
