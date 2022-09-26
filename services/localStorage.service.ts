export const setTokens = (token: any) => {
  localStorage.setItem("token", token);
};

export const removeTokens = () => {
  localStorage.removeItem("token");
};
