export const isLogin = () => !!localStorage.getItem("accessToken");
export const isAdmin = () => !!localStorage.getItem("role");
