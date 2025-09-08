import './App.css'
import Navbar from "./components/Navbar.tsx";
import {Outlet} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"

export default function AppLayout() {


    return (
        <>
            <Toaster position="top-center"  toastOptions={{className:" w-full max-w-2xl"}} richColors closeButton />
            <Navbar />
            <Outlet />
        </>
    )
}

