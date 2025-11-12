import { NavLink } from "react-router-dom";
import MobileNavBar from "./MobileNavBar";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";

const NavBar = () => {
  const [mobMenuCollapse, setMobMenuCollapse] = useState<boolean>(false);
  const [burgerButton, setBurgerButton] = useState<boolean>(false);

  return (
    <>
      <nav
        className="
          relative
          top-0 
          flex
          bg-white
          md:shadow-sm
          border-b
          border-gray-300
          shadow-gray-300/85
          text-sky-900
          justify-center items-center
          "
      >
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 p-4">
            <div className="font-bold text-lg md:text-2xl cursor-pointer active:scale-97">
              Lumina
            </div>
          </div>
          <form className="flex gap-2">
            <input
              type="text"
              className="
                hidden
                md:block
                py-2
                px-4
                rounded-full
                bg-gray-100
                backdrop-blur-md  
                outline-sky-900
                placeholder-sky-900/20
                "
              placeholder="search photo"
            />
            <div className="hidden md:block rounded-full bg-gray-300 text-white hover:bg-gray-400 active:scale-97 p-3 transition-all">
              <IoIosSearch size={22} />
            </div>
          </form>
        </div>

        {/* Nav Buttons */}
        <div className="flex-1 md:flex items-center justify-end gap-2 mr-2 hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-2 px-4 cursor-pointer rounded-full flex items-center transition-all active:scale-97 ${
                isActive
                  ? "bg-sky-100 font-bold"
                  : "hover:bg-sky-100 font-semibold"
              }`
            }
          >
            Explore
          </NavLink>

          <NavLink
            to="/you"
            className={({ isActive }) =>
              `py-2 px-4 cursor-pointer rounded-full flex items-center transition-all active:scale-97 ${
                isActive
                  ? "bg-sky-100 font-bold"
                  : "hover:bg-sky-100 font-semibold"
              }`
            }
          >
            You
          </NavLink>

          <NavLink
            to="/creators"
            className={({ isActive }) =>
              `py-2 px-4 cursor-pointer rounded-full flex items-center transition-all active:scale-97 ${
                isActive
                  ? "bg-sky-100 font-bold"
                  : "hover:bg-sky-100 font-semibold"
              }`
            }
          >
            Creators
          </NavLink>

          <NavLink
            to="/you"
            className={({ isActive }) =>
              `cursor-pointer ml-8 p-2 flex items-center rounded-full transition-all active:scale-97 ${
                isActive
                  ? "bg-sky-100 font-bold"
                  : "hover:bg-sky-100 font-semibold"
              }`
            }
          >
            <AiOutlineUser size={32} />
          </NavLink>
        </div>

        <button
          className="block md:hidden ml-auto pr-4 cursor-pointer active:scale-95"
          onClick={() => {
            mobMenuCollapse === false
              ? setMobMenuCollapse(true)
              : setMobMenuCollapse(false);

            burgerButton === false
              ? setBurgerButton(true)
              : setBurgerButton(false);
          }}
        >
          <div
            className={
              burgerButton === true
                ? "bg-zinc-200 rounded-full w-8 h-1 transition-all top-2 rotate-45 relative"
                : "bg-zinc-200 rounded-full w-8 h-1 transition-all "
            }
          ></div>
          <div
            className={
              burgerButton === true
                ? "bg-zinc-200 rounded-full w-8 h-1 mt-1.5 transition-all opacity-0"
                : "bg-zinc-200 rounded-full w-8 h-1 mt-1.5 transition-all opacity-100"
            }
          ></div>
          <div
            className={
              burgerButton === true
                ? "bg-zinc-200 rounded-full w-8 h-1 mt-1.5 transition-all -top-3 -rotate-45 relative"
                : "bg-zinc-200 rounded-full w-8 h-1 mt-1.5 transition-all"
            }
          ></div>
        </button>
        {mobMenuCollapse === true ? (
          <div
            className="w-[20rem]
             right-3 
             top-14 
             drop-shadow-md 
             absolute 
             border 
             border-gray-200 
             bg-white 
             rounded-lg 
             md:hidden
             flex-col
             z-999
             "
          >
            <NavLink
              to="/"
              onClick={() => {
                setMobMenuCollapse(false);
                setBurgerButton(false);
              }}
            >
              <button className="w-full py-4 text-center hover:bg-sky-100 font-bold cursor-pointer active:scale-98">
                Explore
              </button>
            </NavLink>
            <NavLink
              to="/you"
              onClick={() => {
                setMobMenuCollapse(false);
                setBurgerButton(false);
              }}
            >
              <button className="w-full py-4 text-center hover:bg-sky-100 font-bold cursor-pointer active:scale-98">
                You
              </button>
            </NavLink>
            <NavLink
              to="/creators"
              onClick={() => {
                setMobMenuCollapse(false);
                setBurgerButton(false);
              }}
            >
              <button className="w-full py-4 text-center hover:bg-sky-100 font-bold cursor-pointer active:scale-98">
                Creators
              </button>
            </NavLink>
            <NavLink
              to="/you"
              onClick={() => {
                setMobMenuCollapse(false);
                setBurgerButton(false);
              }}
            >
              <button className="w-full py-4 text-center hover:bg-sky-100 font-bold cursor-pointer active:scale-98">
                <AiOutlineUser size={28} className="m-auto" />
              </button>
            </NavLink>
          </div>
        ) : (
          <></>
        )}
      </nav>
      <MobileNavBar />
    </>
  );
};

export default NavBar;

// items-center (aligning Horizontally - - - )
