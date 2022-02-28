import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import SinglePost from "./components/SinglePost";

const routes = [
  {
    url: "/",
    component: Dashboard,
  },
  {
    url: "/login",
    component: Login,
  },
  {
    url: "/post/:slug",
    component: SinglePost,
  }
];

export default routes;
