import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/react-query";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import AppLayout from "./AppLayout.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 1000 * 30, // 30s
            refetchOnWindowFocus: false,
        },
    },
});
const router = createBrowserRouter([{
    path: '/',
    element: <AppLayout/>,
    children: [
        {
            index: true,
            element: <Home/>,
        },
        {
            path: "home",
            element: <Home/>,
        },
    ],
    errorElement: <NotFound/>,
}, {
    path: '/home',
    element: <Home/>
},


])
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>

        </QueryClientProvider>
    </StrictMode>,
)
