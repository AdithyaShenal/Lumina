import { IoIosSearch } from "react-icons/io";

const MobileNavBar = () => {
  return (
    <nav className="md:hidden flex p-2 shadow-sm items-center gap-2">
      <input
        type="text"
        placeholder="search photos"
        className="text-sm
                py-2 px-4
                w-full
                rounded-full
                bg-gray-100  
                outline-sky-900
                placeholder-sky-900/20
                "
      />
      <div className="rounded-full bg-gray-300 text-white hover:bg-gray-400 active:scale-97 p-2 transition-all">
        <IoIosSearch size={22} />
      </div>
    </nav>
  );
};

export default MobileNavBar;
