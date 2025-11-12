interface Props {
  image_url: string;
}

const CreatorCard = ({ image_url }: Props) => {
  return (
    <>
      <div className="relative w-full max-w-xs p-2 rounded-xl bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.18)] hover:shadow-lg transition-all duration-300 break-inside-avoid">
        <img
          src={image_url}
          className="h-1/3 bg-cover w-full rounded-t-xl"
          loading="lazy"
        ></img>
        <div className=" h-2/3 overflow-hidden rounded-b-xl flex flex-col gap-2 text-center justify-center items-center p-2">
          <div className="absolute w-24 h-24 bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.18)] rounded-full top-12 left-1/2 -translate-x-1/2"></div>
          <div className="font-bold">Alex Rivera</div>
          <div className="text-xs text-gray-600">washenal55@gmail.com</div>
          <div className="text-xs text-gray-600">Cannon EOS 770D</div>
          <div className="flex justify-center gap-2">
            <div className="text-sm text-gray-600">
              <span className="font-bold text-lg">{156}</span> photos
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-bold text-lg">{12.4}</span> K followers
            </div>
          </div>

          <button
            className="
            border 
            border-sky-900 
            p-2
            font-bold
            w-full
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
            Follow
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatorCard;
