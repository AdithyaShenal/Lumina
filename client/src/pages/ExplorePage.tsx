import ImageCard from "../components/ImageCard";
import { Link } from "react-router-dom";

const menuItems = ["All", "Nature", "Wild", "Autumn", "Cities", "Water"];

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
    <div className="px-2">
      <div className="flex gap-2 ml-2">
        {menuItems.map((text) => (
          <Link
            to=""
            className="
            border 
            border-sky-900 
            p-2
            font-bold
            min-w-12
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
            {text}
          </Link>
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
