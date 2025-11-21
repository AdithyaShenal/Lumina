import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import CreatorCard from "./CreatorCard";
import { type Creator } from "../../components/creator_comp/CreatorCard";

const CreatorFollowers = () => {
  const creator_id = useOutletContext<string>();

  const {
    data: creators,
    isError,
    error,
    isLoading,
  } = useQuery<Creator[], Error>({
    queryKey: ["followers", creator_id],
    queryFn: () =>
      axios
        .get(`http://localhost:4001/api/followers/${creator_id}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  if (isError) return <div>{error.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="mt-5 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-10">
        {creators?.length === 0 ? (
          <div>No followers yet</div>
        ) : (
          creators?.map((creator) => (
            <CreatorCard creatorData={creator} key={creator._id} />
          ))
        )}
      </div>
    </>
  );
};

export default CreatorFollowers;
