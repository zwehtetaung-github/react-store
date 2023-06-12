import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
	Home as HomeIcon,
	Login as LoginIcon,
	PersonAdd as PersonAddIcon,
	Logout as LogoutIcon,
	Person as PersonIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";


export default function SideDrawer({ auth, setAuth, authUser, setAuthUser, drawerState, toggleDrawer }) {
	const navigate = useNavigate();

	const list = () => (
		<Box
			sx={{ width: {
				xs: '100%',
				sm: '100%',
				md: '50%',
				lg: '50%',
			  },
			}}
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			{auth ? (
				<List>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								navigate("/");
							}}>
							<ListItemIcon sx={{ color: grey[900]}}>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="Home" sx={{ fontWeight: "bold"}} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								navigate(`/profile/${authUser._id}`);
							}}>
							<ListItemIcon sx={{ color: grey[900]}}>
								<PersonIcon />
							</ListItemIcon>
							<ListItemText primary="Profile" sx={{ fontWeight: "bold"}} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								setAuth(false);
								setAuthUser({});
								localStorage.removeItem("token");
								navigate('/');
							}}>
							<ListItemIcon sx={{ color: grey[900]}} >
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText primary="Logout" sx={{ fontWeight: "bold"}} />
						</ListItemButton>
					</ListItem>
				</List>
				) : (
				<List>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								navigate("/");
							}}>
							<ListItemIcon sx={{ color: grey[900]}} >
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="Home" sx={{ fontWeight: "bold"}} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								navigate("/login");
							}}>
							<ListItemIcon sx={{ color: grey[900]}} >
								<LoginIcon />
							</ListItemIcon>
							<ListItemText primary="Login" sx={{ fontWeight: "bold"}} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								navigate("/register");
							}}>
							<ListItemIcon sx={{ color: grey[900]}} >
								<PersonAddIcon />
							</ListItemIcon>
							<ListItemText primary="Register" sx={{ fontWeight: "bold"}}/>
						</ListItemButton>
					</ListItem>
				</List>
			)}
		</Box>
	);

	return (
		<Drawer anchor="left" 
				open={drawerState} 
				onClose={toggleDrawer(false)} 
		>
			{list()}
		</Drawer>
	);
}
