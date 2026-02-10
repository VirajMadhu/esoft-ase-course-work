import api from "./axios";

export const getAccount = async () => {
  const res = await api.get("/account");
  return res.data;
};

export const updateAccount = async (data: any) => {
  const res = await api.put("/account", data);
  return res.data;
};

export const changePassword = async (data: any) => {
  const res = await api.put("/account/password", data);
   return res.data;
};
 
export const deactivateAccount = async () => {
 const res = await api.delete("/account");
  return res.data;
};
