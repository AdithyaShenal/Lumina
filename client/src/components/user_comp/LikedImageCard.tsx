const LikedImageCard = ({ src }: { src: string }) => {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.18)] hover:shadow-lg transition-shadow duration-300 break-inside-avoid p-1 group">
      <img
        src={src}
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

export default LikedImageCard;
