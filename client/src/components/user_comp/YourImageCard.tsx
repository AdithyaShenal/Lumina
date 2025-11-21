import { useNavigate } from "react-router-dom";
import usePhotoStore from "../../stores/usePhotoStore";

export interface Photo {
  post_id: string;
  user_id: string;
  image_url: string;
  time_stamp: string;
  caption: string;
  location: string;
  post_type?: string;
}

interface ImageCardProps {
  imageData: Photo;
}

const YourImageCard = ({ imageData }: ImageCardProps) => {
  const { setPhoto } = usePhotoStore();

  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        setPhoto(imageData);
        navigate(`/view_your_image/${encodeURIComponent(imageData.post_id)}`);
      }}
      className="relative overflow-hidden rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.18)] hover:shadow-lg transition-shadow duration-300 break-inside-avoid p-1 group"
    >
      <img
        src={imageData.image_url}
        alt="explore"
        loading="lazy"
        className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-102"
        title="Go to settings"
      />

      <button className="absolute  bottom-1 left-1/2 -translate-x-1/2 text-xs bg-white/10 px-1 transition-all duration-300 group-hover:bg-white/70">
        Nature is awesome, beloved.
      </button>
    </div>
  );
};

export default YourImageCard;
