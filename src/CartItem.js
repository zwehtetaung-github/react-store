import { Box, Button, Container, Divider, Grid, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { increaseQuantity, decreaseQuantity, clearCart } from "./action";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function CartItem() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(state => state.cart.items);

    const handleIncreaseQuantity = (productId) => {
        dispatch(increaseQuantity(productId));
    };

    const handleDecreaseQuantity = (productId) => {
        dispatch(decreaseQuantity(productId));
    };

    const handleClearCart= () => {
        dispatch(clearCart());
    };

    const total = cartItems.reduce((totalPrice, item) => {
        return totalPrice + item.price * item.quantity;
    }, 0);

    const isLgScreen = useMediaQuery('(min-width: 1000px)');

    return (

        <Container xs={12} sx={{ minHeight: "100vh", mt: 20 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Box sx={{ display: "flex", flexDirection: "column", p: 2}}>
                        <Box sx={{ 
                            display: "flex",
                            flexDirection: "row",
                        }}>
                            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "700"}}>
                                Cart
                            </Typography>
                            <IconButton
                                edge="end"
                                sx={{ color: grey[900]}}
                                onClick={() => {
                                    handleClearCart();
                                }}
                            >
                                <RemoveShoppingCartIcon />
                            </IconButton>
                        </Box>
                        {cartItems.map(item => {
                            return (
                                <Box
                                    key={item._id}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        mt: 2,
                                        mb: 2,
                                    }}
                                >
                                    <img 
                                        src={item.imgPath}
                                        alt={item.name}
                                        style={{ width: "100px", height: "80px", objectFit: "cover", marginRight: "10px" }}
                                    />
                                    <Typography variant="h6" sx={{ xs: 4,mr: 5}}>{item.name}</Typography>
                                    <Typography variant="body1" sx={{ xs: 4, flex: 1, textAlign: "right"}}>$ {(item.price * item.quantity).toFixed(2)}</Typography>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleIncreaseQuantity(item._id)}
                                        sx={{ borderRadius: "2px", minWidth: 0, width: "40px", height: "40px", ml: 1 }}
                                    >
                                        <AddIcon />
                                    </Button>
                                    <Typography variant="body1" sx={{ ml: 1 }}>{item.quantity}</Typography>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleDecreaseQuantity(item._id)}
                                        sx={{ borderRadius: "2px", minWidth: 0, width: "40px", height: "40px", ml: 1}}
                                    >
                                        <RemoveIcon />
                                    </Button>
                                    <IconButton color="error" sx={{ ml: 1}}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            );
                        })}
                        <Box sx={{ mt: 2}}>
                            <Button
                                md={4}
                                onClick={() => {
                                    navigate(`/`)
                                }}
                                startIcon={<ArrowBackIosNewIcon />}
                            >
                                Continuous Shopping
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={1}>
                    <Divider orientation="vertical" flexItem sx={{ height: "100%"}}/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: "700"}}>Summary</Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                            <Typography variant="body1">SubTotal Price:</Typography>
                            <Typography variant="body1">$ {total.toFixed(2)}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                            <Typography variant="body1">Shipping Fee:</Typography>
                            <Typography variant="body1">$ 00.00</Typography>
                        </Box>
                    </Box>
                    <Divider orientation="horizontal"/>
                </Grid>
            </Grid>
        </Container>
    );
}