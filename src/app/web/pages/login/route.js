import routeURL from "config/routeURL";
import Login from "./index";
export default {
	routes: [
		{
			exact: true,
			auth: false,
			path: routeURL.web.client_login(),
			component: Login,
		},
	],
};