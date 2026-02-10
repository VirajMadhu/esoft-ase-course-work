import api from "./axios";

export const getAccount = async () => {
  const res = await api.get("/account");
  return res.data;
};

export const updateAccount = async (data: any) => {
  return api.put("/account", data);
};

export const changePassword = async (data: any) => {
  return api.put("/account/password", data);
};

export const deactivateAccount = async () => {
  return api.delete("/account");
};
