import Login from "./index";
import routeURL from "config/routeURL";

export default {
	routes: [
		{
			auth: false,
			path: routeURL.web.client_register(),
			component: Login,
		},
		
	],
};
