import axiosInstance from "@/lib/axios/axiosInstance";

export const loginApi = async (token: string): Promise<any> => {
  const data = await axiosInstance.post(
    `/api/User/SSOLogin`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};
