import routeURL from "config/routeURL";
import HomePage from "./index";
import AddItem from "./ItemAdd";
import EditItem from "./ItemEdit";

export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.promotion(),
      component: HomePage,
    },
    {
      auth: true,
      path: routeURL.cms.promotion_add(),
      component: AddItem,
    },
    {
      auth: true,
      path: routeURL.cms.promotion_edit(),
      component: EditItem,
    },
  ],
};