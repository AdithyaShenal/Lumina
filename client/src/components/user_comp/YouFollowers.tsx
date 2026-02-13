import { useQuery } from "@tanstack/react-query";
import type { Creator } from "./YouFollowingCard";
import axios from "axios";
// import { useOutletContext } from "react-router-dom";
import YouFollowerCard from "./YouFollowerCard";

const YouFollowers = () => {
  // const user_id = useOutletContext<string>();

  const {
    data: creators,
    isError,
    error,
    isLoading,
  } = useQuery<Creator[], Error>({
    queryKey: ["followers"],
    queryFn: () =>
      axios
        .get(`http://localhost:4001/api/followers`, {
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
          <div className="mt-3 text-gray-500">No followers yet</div>
        ) : (
          creators?.map((creator) => (
            <YouFollowerCard creatorData={creator} key={creator._id} />
          ))
        )}
      </div>
    </>
  );
};

export default YouFollowers;
