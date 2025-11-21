import { useState } from "react";
import { PiLeafFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { type Image } from "../../pages/ExplorePage";

interface Props {
  imageData: Image;
}

const ImageCard = ({ imageData }: Props) => {
  const [like, setLike] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.18)] hover:shadow-lg transition-shadow duration-300 break-inside-avoid p-1 group">
      <img
        onClick={() => {
          navigate(`/view_image/${encodeURIComponent(imageData.post_id)}`);
        }}
        src={imageData.image_url}
        alt="explore"
        loading="lazy"
        className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-102"
      />

      <div className="absolute left-3 bottom-3 w-12 h-12 rounded-full bg-gray-200 border-2 border-sky-900"></div>

      <div className="absolute bottom-4 left-16 text-xs bg-white/10 px-1 transition-all duration-300 group-hover:bg-white/70">
        {}
      </div>
      <div
        className="absolute bottom-4 right-3 w-8 h-8 p-1 bg-gray-500/50 rounded-full flex items-center justify-center"
        onClick={() => (like === false ? setLike(true) : setLike(false))}
      >
        <PiLeafFill
          size={28}
          color={like === true ? "#16A34A" : "white"}
          title="Like"
        />
      </div>
    </div>
  );
};

export default ImageCard;
