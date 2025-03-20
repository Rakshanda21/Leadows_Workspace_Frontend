import async from "./components/Async";
import Layout from "./components/Layout";
import Asset from "./components/Organization Components/Asset";
import Branches from "./components/Organization Components/Branches";
import Customer from "./components/Organization Components/Customer";
import Departments from "./components/Organization Components/Departments";
import Inventory from "./components/Organization Components/Inventory";
import LogIn from "./components/Organization Components/Login";
import LoginProcessingPage from "./components/Organization Components/LoginProcessingPage";
import Roles from "./components/Organization Components/Role";
import MyUsers from "./components/Organization Components/Users";
import Vendor from "./components/Organization Components/Vendor";
import NetworkError from "./components/static/NetworkError";
import UnauthorizedPage from "./components/static/UnauthorizedPage";

// Guards
const AuthGuard = async(() => import("./components/guards/AuthGuard"));

const routes = [
    {
        path: "/",
        element: <LogIn />,
    },

    {
        path: "/validate",
        element: (
            <AuthGuard>
                <LoginProcessingPage />
            </AuthGuard>
        ),
    },

    {
        path: "/",
        element: (
            <AuthGuard>
                <Layout />
            </AuthGuard>
        ),
        children: [
            {
                path: "/users",
                element: <MyUsers />,
            },
            {
                path: "/branches",
                element: <Branches />,
            },
            {
                path: "/departments",
                element: <Departments />,
            },
            {
                path: "/roles",
                element: <Roles />,
            },
            {
                path: "/vendor",
                element: <Vendor />,
            },
            {
                path: "/asset",
                element: <Asset />,
            },
            {
                path: "/inventory",
                element: <Inventory />,
            },
            {
                path: "/customers",
                element: <Customer />,
            },
        ],
    },
    {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
    },
    {
        path: "/network-error",
        element: <NetworkError />,
    },
];

export default routes;
