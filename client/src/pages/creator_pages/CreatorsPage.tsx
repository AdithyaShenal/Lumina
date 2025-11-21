import { useQuery } from "@tanstack/react-query";
import CreatorCard, {
  type Creator,
} from "../../components/creator_comp/CreatorCard";
import axios from "axios";

const CreatorsPage = () => {
  const {
    data: creators,
    error,
    isError,
    isLoading,
  } = useQuery<Creator[], Error>({
    queryKey: ["creators"],
    queryFn: () =>
      axios
        .get("http://localhost:4001/api/search/all", {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  if (isError) return <div>{error.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="3xl:ml-12">
        <h4 className="text-sky-900">Discover Creators</h4>
        <p className="mt-3 text-gray-500">
          Explore and follow talented photographers from around the world
        </p>
      </div>
      <div className="mt-5 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-10">
        {creators?.length === 0 ? (
          <div>No creators yet</div>
        ) : (
          creators?.map((creator) => (
            <CreatorCard creatorData={creator} key={creator._id} />
          ))
        )}
      </div>
    </>
  );
};

export default CreatorsPage;
