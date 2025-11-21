import { create } from "zustand";

interface Photo {
  post_id: string;
  user_id: string;
  image_url: string;
  time_stamp: string;
  caption: string;
  location: string;
  post_type?: string;
}

interface PhotoStore {
  imageData: Photo | null;
  setPhoto: (newPhotoData: Photo) => void;
  resetPhoto: () => void;
}

const usePhotoStore = create<PhotoStore>((set) => ({
  imageData: null,

  setPhoto: (newPhotoData) =>
    set(() => ({
      imageData: newPhotoData,
    })),

  resetPhoto: () =>
    set(() => ({
      imageData: null,
    })),
}));

export default usePhotoStore;
