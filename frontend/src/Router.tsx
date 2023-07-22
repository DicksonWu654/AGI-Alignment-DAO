import { createBrowserRouter, Outlet } from "react-router-dom";
import { Create } from "./pages/Create";
import { View } from "./pages/View";
import { Layout } from "./components/Layout";
import { App } from "./App";
import { Landing } from "./pages/Landing";
import { Contract, providers } from "ethers";
import agiABI from "./abi/AGI.json";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader: async ({ params }) => {
            const AGIContract = new Contract(
                '0x76Ae665579968fFf75222B11C27a3AeF85FD5477',
                agiABI,
                new providers.JsonRpcProvider('https://rpc.ankr.com/polygon_mumbai')
            )

            return AGIContract;
        },
        children: [
            {
                path: "/",
                element: <Landing />,
            },
            {
                path: "/view",
                element: <View />,
            },
            {
                path: "/create",
                element: <Create />,
            }
        ]
    }
])

export default router;