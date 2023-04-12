import Blogs from "./Blog";
import BlogDetail from "./BlogDetail";
import routeURL from "config/routeURL";

export default {
  routes: [
    {
      auth: false,
      path: routeURL.web.blogs(),
      component: Blogs,
    },
    {
      auth: false,
      path: routeURL.web.blog_detail(),
      component: BlogDetail,
    },
  ],
};
