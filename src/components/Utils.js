// thios function for format date like: Wed Nov 24 2021
export const formatDate = (date) => {
  const ddate = new Date(date);

  return ddate.toDateString();
};

export const getUserData = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) return user;
}

export const API_BASE_URL = `https://api.realworld.io/api/articles`;
export const LOGIN_API = `https://api.realworld.io/api/users/login`;
