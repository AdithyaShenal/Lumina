import { Link, Outlet } from "react-router-dom";

const ActivitiesTab = () => {
  return (
    <>
      <div
        className="w-auto h-12
        rounded-2xl 
        mt-2 px-1
        shadow-[0px_0px_5px_rgba(0,0,0,0.18)]
        flex
        justify-around
        items-center
        gap-2
        text-sky-900
        bg-gray-100
        "
      >
        <Link
          to="/you"
          className="
            text-center
            w-full
            p-2
            rounded-xl
            bg-white
            hover:bg-sky-900
            hover:text-sky-50
            transition-all
            "
        >
          Your Photos
        </Link>
        <Link
          to="/you/liked_photos"
          className="
            text-center
            w-full
            p-2
            rounded-xl
            bg-white
            hover:bg-sky-900
            hover:text-sky-50
            transition-all
            "
        >
          Liked Photos
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default ActivitiesTab;
