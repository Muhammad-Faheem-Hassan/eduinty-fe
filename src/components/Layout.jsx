import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Topbar handleDrawerToggle={handleDrawerToggle} />
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    // On desktop, add margin so it doesn't overlap with sidebar
                    ml: { sm: "240px" },
                    width: { xs: "100%", sm: `calc(100% - 240px)` },
                    transition: "margin 0.3s ease, width 0.3s ease",
                }}
            >
                <Toolbar />
                 <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
