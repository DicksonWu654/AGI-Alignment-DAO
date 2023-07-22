import { Box } from "@chakra-ui/react"
import { Navbar } from "./Navbar"
import { Outlet } from "react-router-dom"

export const Layout = () => {

    return (
        <Box w={'100vw'} overflowX={'hidden'} h={'100vh'}>
            <Navbar />
            <Outlet />
        </Box>
    )
}