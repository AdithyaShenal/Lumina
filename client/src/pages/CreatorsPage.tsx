import CreatorCard from "../components/CreatorCard";

const images = [
  "https://picsum.photos/1280/720?random=1",
  "https://picsum.photos/1280/720?random=2",
  "https://picsum.photos/1280/720?random=3",
  "https://picsum.photos/1280/720?random=4",
  "https://picsum.photos/1280/720?random=5",
  "https://picsum.photos/1280/720?random=6",
  "https://picsum.photos/1280/720?random=7",
  "https://picsum.photos/1280/720?random=8",
  "https://picsum.photos/1280/720?random=9",
  "https://picsum.photos/1280/720?random=10",
  "https://picsum.photos/1280/720?random=11",
  "https://picsum.photos/1280/720?random=12",
  "https://picsum.photos/1280/720?random=13",
  "https://picsum.photos/1280/720?random=14",
  "https://picsum.photos/1280/720?random=15",
];

const CreatorsPage = () => {
  return (
    <>
      <div className="mt-5 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img, index) => (
          <CreatorCard image_url={img} key={index} />
        ))}
      </div>
    </>
  );
};

export default CreatorsPage;
