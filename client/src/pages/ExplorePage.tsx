import ImageCard from "../components/ImageCard";
import { Link, NavLink } from "react-router-dom";

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

const ExplorePage = () => {
  // Example image URLs (you can later fetch from API)
  const images = [
    "https://picsum.photos/1280/720?random=1",
    "https://picsum.photos/1280/720?random=2",
    "https://picsum.photos/1280/720?random=3",
    "https://picsum.photos/1280/720?random=4",
    "https://picsum.photos/1280/720?random=5",
    "https://picsum.photos/1280/720?random=6",
    "https://picsum.photos/1280/720?random=7",
    "https://picsum.photos/1280/720?random=8",
    "https://picsum.photos/1280/720?random=9",
    "https://picsum.photos/1280/720?random=10",
    "https://picsum.photos/1280/720?random=11",
    "https://picsum.photos/1280/720?random=12",
    "https://picsum.photos/1280/720?random=13",
    "https://picsum.photos/1280/720?random=14",
    "https://picsum.photos/1280/720?random=15",
  ];

  return (
    <div className="">
      <h4 className="text-sky-900">Explore</h4>
      <p className="mt-3 text-gray-500">
        Discover amazing photos from talented photographers
      </p>
      <div className="flex gap-2 mt-10 overflow-x-scroll scroll-smooth no-scrollbar">
        {menuItems.map((text, index) => (
          <NavLink
            key={index}
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

      {/* Masonry grid */}
      <div className="mt-5 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img, i) => (
          <ImageCard key={i} src={img} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
