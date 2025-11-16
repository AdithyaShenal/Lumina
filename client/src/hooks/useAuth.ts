// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const useAuth = () => {
//   return useQuery({
//     queryKey: ["user"],
//     queryFn: () =>
//       axios
//         .get("http://localhost:4000/api/users/me", { withCredentials: true })
//         .then((res) => res.data),

//     retry: false,
//   });
// };

// export default useAuth;

// useAuth.ts
import { useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";

const useAuth = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/users/me", {
          withCredentials: true,
        });
        // Return the actual user data on success
        return res.data;
      } catch (error) {
        // If it's an Axios error and the status is 401, treat it as unauthenticated
        // by throwing an error, so React Query sets 'data' to undefined and 'isError' to true.
        if (isAxiosError(error) && error.response?.status === 401) {
          throw new Error("Unauthorized");
        }
        // Throw any other error to be handled by React Query's error state
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    // Prevent retries on failure (you already have this)
    retry: false,
    // Set a sensible staleTime (e.g., 5 minutes) to avoid refetching on every render
    // *unless* you need real-time status.
    staleTime: 1000 * 60 * 5,
  });
};

export default useAuth;
