import { NavLink, Outlet } from "react-router-dom";

const ActivitiesTab = () => {
  return (
    <>
      <div
        className="h-12
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
        <NavLink
          to="/you"
          className={({ isActive }) =>
            `text-center w-full p-2 rounded-xl transition-all
              hover:bg-sky-900 hover:text-sky-50
              text-xs md:text-[1rem]
              ${isActive ? "bg-sky-900 text-sky-50" : "bg-white"}
            `
          }
        >
          Your Photos
        </NavLink>
        <NavLink
          to="/you/liked_photos"
          className={({ isActive }) =>
            `text-center w-full p-2 rounded-xl transition-all
              hover:bg-sky-900 hover:text-sky-50
              text-xs md:text-[1rem]
              ${isActive ? "bg-sky-900 text-sky-50" : "bg-white"}
            `
          }
        >
          Liked Photos
        </NavLink>
        <NavLink
          to=""
          className={({ isActive }) =>
            `text-center w-full p-2 rounded-xl transition-all
              hover:bg-sky-900 hover:text-sky-50
              text-xs md:text-[1rem]
              ${isActive ? "bg-sky-900 text-sky-50" : "bg-white"}
            `
          }
        >
          Following
        </NavLink>
        <NavLink
          to=""
          className={({ isActive }) =>
            `text-center w-full p-2 rounded-xl transition-all
              hover:bg-sky-900 hover:text-sky-50
              text-xs md:text-[1rem]
              ${isActive ? "bg-sky-900 text-sky-50" : "bg-white"}
            `
          }
        >
          Followers
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default ActivitiesTab;
