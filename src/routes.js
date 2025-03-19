import async from "./components/Async";
import Layout from "./components/Layout";
import Branches from "./components/Organization Components/Branches";
import Departments from "./components/Organization Components/Departments";
import LogIn from "./components/Organization Components/Login";
import LoginProcessingPage from "./components/Organization Components/LoginProcessingPage";
import MyUsers from "./components/Organization Components/Users";
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
