import { Link } from "react-router-dom";
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
        className="sticky 
          top-0 
          flex
          bg-[oklch(98.4% 0.003 247.858)]
          md:shadow-sm
          border-b
          border-gray-300
          shadow-gray-300/85
          text-sky-900
          flex justify-center items-center
          relative
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

        <div className="flex-1 md:flex items-center justify-end gap-2 mr-2 hidden">
          <Link to="/">
            <div className="py-2 px-4 cursor-pointer rounded-full hover:bg-sky-100 flex items-center transition-all font-bold active:scale-97">
              Home
            </div>
          </Link>
          <Link to="/you">
            <div className="py-2 px-4 cursor-pointer rounded-full hover:bg-sky-100 flex items-center transition-all font-bold active:scale-97">
              You
            </div>
          </Link>

          <Link to="/explore">
            <div className="py-2 px-4 cursor-pointer rounded-full hover:bg-sky-100 flex items-center transition-all font-bold active:scale-97">
              <Link to="/explore">Explore</Link>
            </div>
          </Link>

          <Link to="/trending">
            <div className="py-2 px-4 cursor-pointer rounded-full hover:bg-sky-100 flex items-center transition-all font-bold active:scale-97">
              <Link to="/trending">Trending</Link>
            </div>
          </Link>
          <div className="cursor-pointer ml-8 hover:bg-sky-100 p-2 flex items-center rounded-full transition-all active:scale-97">
            <Link to="/">
              <AiOutlineUser size={32} />
            </Link>
          </div>
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
             "
          >
            <button></button>
            <button className="w-full py-4 text-center hover:bg-sky-100 font-bold cursor-pointer active:scale-98">
              Home
            </button>
            <button className="w-full py-4 text-center hover:bg-sky-100 font-bold cursor-pointer active:scale-98">
              You
            </button>
            <button className="w-full py-4 text-center hover:bg-sky-100 font-bold cursor-pointer active:scale-98">
              Explore
            </button>
            <button className="w-full py-4 text-center hover:bg-sky-100 font-bold cursor-pointer active:scale-98">
              Trending
            </button>
            <button className="w-full py-4 text-center hover:bg-sky-100 font-bold cursor-pointer active:scale-98">
              <AiOutlineUser size={28} className="m-auto" />
            </button>
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
