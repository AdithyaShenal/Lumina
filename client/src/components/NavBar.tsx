import { Link } from "react-router-dom";
import { PiUserCircleDuotone } from "react-icons/pi";

const NavBar = () => {
  return (
    <>
      <nav
        className="sticky top-0 flex
          bg-linear-to-r 
          bg-[oklch(98.4% 0.003 247.858)]
          shadow-sm
          shadow-gray-300/85
          text-white
          "
      >
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 p-4">
            <div className="font-bold text-2xl text-gray-600">Lumina</div>
          </div>
          <form className="flex gap-2">
            <input
              type="text"
              className="
                text-sky-900
                py-2
                px-4
                rounded-4xl
                border-sky-300/30
                bg-gray-100
                backdrop-blur-md  
                outline-sky-500
                placeholder-sky-900/20

                "
              placeholder="search photo"
            />
            <button className="py-2 px-4 cursor-pointer bg-gray-300 rounded-4xl hover:bg-gray-400 hover:text-white flex items-center transition-all">
              search
            </button>
          </form>
        </div>

        <div className="flex-1 flex items-center justify-end gap-2 mr-2">
          <Link to="/">
            <div className="py-2 px-4 cursor-pointer bg-sky-500 rounded-4xl hover:bg-sky-600 hover:text-white flex items-center transition-all">
              Home
            </div>
          </Link>
          <Link to="/you">
            <div className="py-2 px-4 cursor-pointer bg-sky-500 rounded-4xl hover:bg-sky-600 hover:text-white flex items-center transition-all">
              You
            </div>
          </Link>

          <Link to="/explore">
            <div className="py-2 px-4 cursor-pointer bg-sky-500 rounded-4xl hover:bg-sky-600 hover:text-white flex items-center transition-all">
              <Link to="/explore">Explore</Link>
            </div>
          </Link>

          <Link to="/trending">
            <div className="py-2 px-4 cursor-pointer bg-sky-500 rounded-4xl hover:bg-sky-600 hover:text-white flex items-center transition-all">
              <Link to="/trending">Trending</Link>
            </div>
          </Link>
          <div className="text-gray-500 hover:text-sky-700 cursor-pointer ml-8">
            <Link to="/">
              <PiUserCircleDuotone size={50} />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

// items-center (aligning Horizontally - - - )
