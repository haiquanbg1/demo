import config from '~/config';

// Pages
import Home from "~/pages/Home";
import GetTicket from "~/pages/GetTicket";
import Register from "~/pages/Register";


// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.getTicket, component: GetTicket },
    { path: config.routes.register, component: Register, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };