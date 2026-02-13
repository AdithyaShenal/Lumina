// import LikedImageCard from "./LikedImageCard";

const LikedPhotos = () => {
  return (
    <>
      <p className="mt-3 text-gray-500">Photos you liked</p>
      <div className="mt-5 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {/* {images.map((img, i) => (
          <LikedImageCard key={i} src={img} />
        ))} */}
      </div>
    </>
  );
};

export default LikedPhotos;
