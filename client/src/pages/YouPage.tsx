import ProfilePic from "../assets/test_pic.jpg";
import BackgroundImage from "../assets/background_img.jpg";

const YouPage = () => {
  return (
    <>
      <div className="w-full h-[30vh] rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.18)]">
        <div
          style={{ backgroundImage: `url(${BackgroundImage})` }}
          className="w-full h-1/2 bg-center bg-cover rounded-t-2xl"
        ></div>
        <div className="relative w-full h-1/2 bg rounded-b-2xl">
          <div
            onClick={() => {}}
            style={{ backgroundImage: `url(${ProfilePic})` }}
            className="absolute
              w-32 h-32 
              bg-amber-200 
              bg-cover 
              -top-15 
              rounded-full 
              m-4
              active:scale-99
              cursor-pointer
              border
              border-sky-900
              shadow-[0px_0px_5px_rgba(0,0,0,0.18)]
              md:w-40 md:h-40 md:-top-22"
          ></div>
          <div className="w-auto h-10 mt-2 ml-52">
            <span className="text-2xl font-bold">Adithya Shenal</span>
          </div>
          <div className="w-auto h-10 ml-52">
            <span className="text-gray-500">washenal55@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="w-auto h-12 rounded-2xl mt-2 shadow-[0px_0px_5px_rgba(0,0,0,0.18)]"></div>
    </>
  );
};

export default YouPage;
