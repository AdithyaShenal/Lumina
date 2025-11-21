import { TbListDetails } from "react-icons/tb";

const CreatorStatTab = () => {
  return (
    <>
      <>
        <div
          className="w-auto h-15
        rounded-2xl 
        mt-2 px-4
        shadow-[0px_0px_5px_rgba(0,0,0,0.18)]
        flex
        justify-between
        items-center
        text-sky-900
        "
        >
          <div className="flex gap-4">
            <div className="flex-col items-center justify-center">
              <div className="text-center font-bold text-xl">25</div>
              <div className="text-center text-gray-400 text-sm">Photos</div>
            </div>
            <div className="flex-col items-center justify-center">
              <div className="text-center font-bold text-xl">1.2K</div>
              <div className="text-center text-gray-400 text-sm">Followers</div>
            </div>
            <div className="flex-col items-center justify-center">
              <div className="text-center font-bold text-xl">7.3K</div>
              <div className="text-center text-gray-400 text-sm">Following</div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <button
              className="border 
              border-sky-900 
              p-2 
              rounded-full 
              flex 
              items-center 
              gap-1 
              text-sm             
              hover:bg-sky-900
              hover:text-sky-50
              transition-all"
            >
              <TbListDetails />
              <span className="hidden md:block">Portfolio</span>
            </button>
          </div>
        </div>
      </>
    </>
  );
};

export default CreatorStatTab;
