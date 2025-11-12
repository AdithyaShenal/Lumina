import { useState } from "react";
import { PiLeafFill } from "react-icons/pi";

const ImageCard = ({ src }: { src: string }) => {
  const [like, setLike] = useState<boolean>(false);

  return (
    <div className="relative overflow-hidden rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.18)] hover:shadow-lg transition-shadow duration-300 break-inside-avoid p-1 group">
      <img
        src={src}
        alt="explore"
        loading="lazy"
        className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-102"
      />

      {/* Avatar circle */}
      <div className="absolute left-3 bottom-3 w-12 h-12 rounded-full bg-gray-200 border-2 border-sky-900"></div>

      {/* Caption overlay */}
      <div className="absolute bottom-4 left-16 text-xs bg-white/10 px-1 transition-all duration-300 group-hover:bg-white/70">
        Nature is awesome, beloved.
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
