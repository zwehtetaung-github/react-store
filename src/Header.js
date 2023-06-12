import { AppBar, Avatar, Badge, Box, Button, Card, IconButton, Menu, MenuItem, Select, Toolbar, Typography, useMediaQuery } from "@mui/material";

import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { amber, grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Header({ auth, setAuth, authUser, setAuthUser, toggleDrawer }) {
    
    const navigate = useNavigate();
    const location = useLocation();

    const cartItems = useSelector(state => state.cart.items.length);

    const isLgScreen = useMediaQuery('(min-width: 1000px)' );
    const backgroundColor = isLgScreen ? "#FFFFFF" : "#455a64" ;

    const [angr, setAngr] = useState(null);

    const handleClick = (event) => {
        setAngr(event.currentTarget);
    };

    const handleClose = () => {
        setAngr(null);
    }

    return (
        <Box>
            <Box sx={{ flexGrow: 1}} >
            <AppBar position="fixed" sx={{ boxShadow: "none"}}>
                <Box
                    sx={{ 
                        display: { xs: "none", sm: "none", md: "flex", lg: "flex"},
                        flexBasis: 0,
                        minWidth: 300,
                        justifyContent: "space-evenly",
                        backgroundColor: "#455a64",
                    }}
                >
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                        <PhoneEnabledIcon sx={{ marginRight: "0.5rem" }}/>+959968834110
                    </Typography>
                </Box>
                <Toolbar sx={{ backgroundColor }}>
                    {location.pathname === "/" ? (
                        <Box>
                            <IconButton
                                size="large"
                                edge="start"
                                sx={{ mr: 2, color: grey[900], display: { lg: "none", md: "block"} }}
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Card
                                variant="flex"
                                flex="row"
                                sx={{ display: { xs: "none",  md: "none", lg: "flex"}}}
                            >
                                <Typography
                                    variant="h7"
                                    color="black"
                                    sx={{
                                        mr: 1, 
                                        textDecoration: "none",
                                        fontWeight: 700,
                                    }}
                                    component={Link}
                                    to="/"
                                >
                                    Home
                                </Typography>
                                <Typography
                                    variant="h7"
                                    color="black"
                                    sx={{ 
                                        mr: 1,
                                        textDecoration: "none",
                                        fontWeight: 700,
                                    }}
                                    component={Link}
                                    to="/"
                                >
                                    Shop
                                </Typography>
                                <Typography
                                    variant="h7"
                                    color="black"
                                    sx={{ 
                                        mr: 1,
                                        textDecoration: "none",
                                        fontWeight: 700,
                                    }}
                                    component={Link}
                                    to="/"
                                >
                                    About us
                                </Typography>
                            </Card>
                        </Box>
                    ) : (
                        <IconButton
                            size="large"
                            edge="start"
                            sx={{ mr: 2, color: grey[900] }}
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    
                    <Typography 
                        variant="h6" 
                        align="center" 
                        sx={{ 
                            color: grey[900], 
                            flexGrow: 1, 
                            display: { xs: "none", sm: "none", md: "block", lg: "block", xl: "block"}, 
                            textDecoration: "none",
                            }}
                        component={Link}
                        to="/"
                    >
                        React Store
                    </Typography>

                    {auth ? (
                        // <IconButton 
                        //     sx={{ mr: 1, color: grey[900], display: { xs: "none", md: "none", lg: "flex" } }}
                        //     onClick={() => {
                        //         navigate(`/profile/${authUser._id}`);
                        //     }}
                        // >   
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                            {/* <Typography sx={{ fontSize: '300'}}>{authUser.name}</Typography>  */}
                            <IconButton>
                                <AccountCircleIcon onClick={handleClick} sx={{color: grey[900], width: 25, height: 25}}/>
                            </IconButton>

                            <Menu
                                angr={angr}
                                open={Boolean(angr)}
                                onClose={handleClose}
                                sx={{ maxWidth: 100}}
                            >
                                <MenuItem onClick={() => {
                                    setAuth(false);
                                    setAuthUser({});
                                    navigate(`/`)
                                }}>
                                    Logout
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    navigate(`/profile/${authUser._id}`)
                                }}>
                                    Profile
                                </MenuItem>
                            </Menu>
                        </Box>
                        // </IconButton>
                    ) : (
                        <IconButton 
                            sx={{ mr: 1, color: grey[900], display: { xs: "none", md: "none", lg: "flex" } }}
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            <PersonIcon />
                        </IconButton>
                    )}

                    <IconButton 
                        sx={{ mr: 1, color: grey[900], display: { xs: "none", md: "none", lg: "flex" } }}
                    >
                        <SearchIcon />
                    </IconButton>

                    {/* <IconButton 
                        color="inherit"
                        sx={{ mr: 1}}
                    >
                        <FavoriteBorderIcon />
                    </IconButton> */}

                    <IconButton 
                        edge="end"
                        sx={{ mr: 1, color: grey[900], marginLeft: { xs: 'auto', sm: 'auto' } }}
                        onClick={() => {
                            navigate("/cart");
                        }}
                    >
                        <Badge badgeContent={cartItems} color="primary">
                            <LocalMallIcon />
                        </Badge>
                    </IconButton>
                
                </Toolbar>
            </AppBar>
            </Box>
        </Box>
    );
}