import { loginApi } from "@/api/auth";
import { useAuthActions } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
  const { setToken } = useAuthActions();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (token: string) => {
      return loginApi(token);
    },
    onSuccess: (data) => {
      setToken(data.token);
      navigate({ to: "/dashboard" });
    },
  });
};
