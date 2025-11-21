import { NavLink } from "react-router-dom";

const CreatorActivitiesTab = () => {
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
          end
          to="."
          className={({ isActive }) =>
            `text-center w-full p-2 rounded-xl transition-all
              hover:bg-sky-900 hover:text-sky-50
              text-xs md:text-[1rem]
              ${isActive ? "bg-sky-900 text-sky-50" : "bg-white"}
            `
          }
        >
          Photos
        </NavLink>

        <NavLink
          to="following"
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
          to="followers"
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
    </>
  );
};

export default CreatorActivitiesTab;
