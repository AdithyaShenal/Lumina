import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () =>
      axios.post(
        "http://lumina.com/api/logout",
        {},
        {
          withCredentials: true,
        },
      ),

    onSuccess: () => {
      toast.success("Logging out...");
      queryClient.clear();
      navigate("/login");
    },
  });
};
