import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PhotoUploadPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const useUploadPhoto = useMutation({
    mutationFn: (post: any) =>
      axios
        .post("http://localhost:4002/api/posts", post, {
          withCredentials: true,
        })
        .then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      toast.success("Upload successful");
      navigate("/you");
    },

    onError: (error) => {
      let message = "Upload failed. Please check your login status";

      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          message = "Authentication required. Please log in.";
        } else {
          message = error.response?.data.message || error.response.statusText;
        }
      }
      toast.error(message);
    },
  });

  const { register, handleSubmit } = useForm();
  const photoRegister = register("photo");
  const [preview, setPreview] = useState<string | null>(null);

  const submitHandler = (data: FieldValues) => {
    const formData = new FormData();
    formData.append("caption", data.caption);
    formData.append("location", data.location);

    const file = data.photo?.[0];

    if (file) {
      formData.append("post_image", file);
    } else {
      console.error("No file selected.");
      // Optional: Show an error to the user
      return;
    }

    useUploadPhoto.mutate(formData);
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(submitHandler)} className="max-w-2xl m-auto">
        <h4 className="text-sky-900">Upload photo</h4>
        <p>Share your amazing photography with the world</p>
        <div className="shadow-[0px_0px_5px_rgba(0,0,0,0.18)] w-full rounded-xl my-8 p-8">
          <h5>Photo Details</h5>
          <p>Fill in the information about your photo</p>
          <p className="mt-4 font-bold text-sm">Photo</p>

          <label
            htmlFor="fileInput"
            className="w-full h-60 flex flex-col items-center justify-center
          rounded-sm border-dashed border border-gray-300 bg-gray-50
          cursor-pointer hover:border-gray-400 transition-all overflow-hidden p-4
          
          "
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className=" h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">
                Click to upload a photo
              </span>
            )}
          </label>

          <input
            {...photoRegister}
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
              photoRegister.onChange(e);
            }}
          />

          <p className="mt-8 font-bold text-sm">Caption</p>
          <input
            {...register("caption")}
            type="text"
            className="w-full bg-gray-50 p-2 border border-gray-300 rounded-sm outline-sky-200 hover:border-sky-200 transition-all placeholder:text-sm"
            placeholder="Please keep caption shorter"
          />

          <p className="mt-8 font-bold text-sm placeholder:text-sm">Location</p>
          <input
            {...register("location")}
            type="text"
            className="w-full bg-gray-50 p-2 border border-gray-300 rounded-sm outline-sky-200 hover:border-sky-200 transition-all placeholder:text-sm"
            placeholder="Place where you captured the photo"
          />

          <p className="mt-8 font-bold text-sm">
            Tags
            <span className="ml-4 text-gray-400 font-medium"></span>
          </p>
          <input
            {...register("tags")}
            type="text"
            className="w-full bg-gray-50 p-2 border border-gray-300 rounded-sm 
              outline-sky-200 hover:border-sky-200 transition-all
              placeholder:text-sm
              "
            placeholder="e.g., Nature, Landscape, Travel (comma separated)"
          />
          <p className="text-xs text-gray-500 ml-1 mt-1">
            Add tags to help people discover your photo (Maximum 3 tags)
          </p>

          <button
            type="submit"
            className="
              mt-8
              text-center w-full p-2 rounded-sm transition-all
              hover:bg-sky-950
              text-xs md:text-sm
              bg-sky-900 text-sky-50 cursor-pointer"
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default PhotoUploadPage;
