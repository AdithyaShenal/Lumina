import StatTab from "../../components/user_comp/StatTab";
import ActivitiesTab from "../../components/user_comp/ActivitiesTab";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Outlet } from "react-router-dom";

interface CurrentUser {
  _id: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_image?: {
    url?: string;
    blob_name?: string;
  };
  email: string;
  phone_number?: string;
  age?: number;
  location?: string;
  interests?: string[];
}

const YouPage = () => {
  const { data: user, isLoading } = useQuery<CurrentUser, AxiosError<any>>({
    queryKey: ["currentUser"],
    queryFn: () =>
      axios
        .get("http://localhost:4000/api/users/me", { withCredentials: true })
        .then((res) => res.data),
  });

  console.log(user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full h-[40vh] rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.18)]">
        <div
          style={{
            backgroundImage: `url(https://picsum.photos/1280/720?random=1)`,
          }}
          className="w-full h-3/4 bg-center bg-cover rounded-t-2xl"
        ></div>
        <div className="relative w-full h-1/4 bg rounded-b-2xl">
          <div
            onClick={() => {}}
            style={{ backgroundImage: `url(${user?.profile_image?.url})` }}
            className="absolute
              w-32 h-32 
              bg-amber-200 
              bg-cover 
              -top-25
              rounded-full 
              m-4
              active:scale-99
              cursor-pointer
              border-2
              border-sky-50
              shadow-[0px_0px_10px_rgba(0,0,0,0.50)]
              md:w-40 md:h-40 md:-top-35"
          ></div>
          <div className="w-auto ml-45 mt-2 md:ml-52">
            <span className="text-xl font-bold">{`${user?.first_name} ${user?.last_name}`}</span>
          </div>
          <div className="w-auto ml-45 md:ml-52">
            <span className="text-gray-500">{user?.email}</span>
          </div>
        </div>
      </div>
      <StatTab />
      <ActivitiesTab />
      <Outlet context={user?._id} />
    </>
  );
};

export default YouPage;
