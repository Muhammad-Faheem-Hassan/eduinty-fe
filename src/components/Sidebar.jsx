import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from "@mui/material";
import { Home, Person, Settings, School } from "@mui/icons-material";
import Logo from "../assets/logo.png";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <Home />, path: "/" },
  { text: "Users", icon: <Person />, path: "/users/list" },
  { text: "Campus", icon: <School />, path: "/campus/list" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
];


const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const drawerContent = (
    <div>
      {/* <Toolbar /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",  // horizontal center
          alignItems: "center",      // vertical center
          height: 80,               // adjust this height to control spacing
        }}
      >
        <img
          src={Logo}
          alt="EdUnity Logo"
          style={{
            height: 40,
            objectFit: "contain",
          }}
        />
      </div>
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton key={index} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better mobile performance
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
export { drawerWidth };
