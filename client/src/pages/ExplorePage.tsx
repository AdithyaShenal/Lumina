import { useQuery } from "@tanstack/react-query";
import ImageCard from "../components/creator_comp/ImageCard";
import { NavLink } from "react-router-dom";
import axios from "axios";

const menuItems = [
  "All",
  "Nature",
  "Wild",
  "Autumn",
  "Cities",
  "Water",
  "Sky",
  "Sea",
];

export interface Image {
  post_id: string;
  user_id: string;
  image_url: string;
  image_name?: string;
  time_stamp: string;
  caption?: string;
  location?: string;
  post_type?: string;
}

const ExplorePage = () => {
  const {
    data: timeline,
    isLoading,
    isError,
    error,
  } = useQuery<Image[], Error>({
    queryKey: ["timeline"],
    queryFn: () =>
      axios
        .get<Image[]>("http://lumina.com/api/queries/posts/all", {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  console.log(timeline);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Query Error:", error);
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded-lg">
        Error loading timeline data! Check the server at
        {error && <p className="text-sm mt-2">{error.message}</p>}
      </div>
    );
  }

  return (
    <div className="">
      <h4 className="text-sky-900">Explore</h4>
      <p className="mt-3 text-gray-500">
        Discover amazing photos from talented photographers
      </p>
      <div className="flex gap-2 mt-10 overflow-x-scroll scroll-smooth no-scrollbar">
        {menuItems.map((text) => (
          <NavLink
            key={text}
            to=""
            className="border
                    duration-400
                    border-gray-400
                    w-16
                    text-sky-900  
                    p-2 
                    rounded-full
                    font-semibold
                    flex 
                    items-center
                    justify-center
                    gap-1 
                    text-sm             
                    hover:bg-sky-900
                    hover:text-sky-50
                    transition-all
                    "
          >
            <span>{text}</span>
          </NavLink>
        ))}
      </div>

      <div className="mt-5 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {timeline &&
          timeline.length > 0 &&
          timeline.map((image) => (
            <ImageCard key={image.post_id} imageData={image} />
          ))}

        {timeline && timeline.length === 0 && (
          <i className="text-gray-500">
            You have not followed any creators yet.
          </i>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
