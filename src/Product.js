import { 
    Box, 
    Typography, 
    Grid, 
    Skeleton, 
    Container, 
    Card, 
    Button, 
    useMediaQuery 
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "./apiCall";
import { addToCart } from "./action";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Carousel from "react-material-ui-carousel";

import { useDispatch, useSelector } from "react-redux";

export default function Product() {
    const { id } = useParams();
    const [product, setProduct]     = useState([]);
    const [ isLoading, setLoading ] = useState(true);

    const isLgScreen = useMediaQuery('(min-width: 1000px)' );
    const marginTop = isLgScreen ? 10 : 5 ;

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    useEffect(() => {
        (async () => {
            const product = await getProduct(id);

            if(product) {
                setProduct(product);
                setLoading(false);
            }
        })();
    }, [id]);

    return (
            <Container 
                maxWidth="lg" 
                sx={{ 
                    paddingLeft: { xs: "0", lg: "24px" },
                    paddingRight: { xs: "0", lg: "24px"},
                    mb: 5,    
                }}
            >
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm sx={{ position: "relative" }}>
                        {isLoading && (
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    height: {
                                        xs: "calc(100vh - 128px)",
                                        sm: "calc(100vh - 64px)",
                                    },
                                }}
                            />
                        )}
                        <Carousel
                            sx={{ width: "100%"}} 
                            autoPlay={false}
                            duration={500}
                            animation="slide"
                            navButtonsAlwaysInvisible={true}
                            swipe={false}
                        >
                            <Box
                                key={product._id}
                                component="img"
                                src={product.imgPath}
                                alt={product.name}
                                sx={{
                                    height: {
                                        xs: "calc(100vh - 128px)",
                                        sm: "calc(100vh - 64px)",
                                    },
                                    marginTop,                                    
                                    width: "100%",
                                    objectFit: "cover",
                                    objectPosition: "top center",
                                }}
                            />
                        </Carousel>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Container 
                            maxWidith= "xs"
                            sx={{ 
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                height: "100%",
                            }}
                        >
                            <Typography variant="h5" sx={{ mt: 1, fontWeight: "700" }}>
                                {product.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{ mt: 1 }}
                                component="p"
                            >
                                {product.description}
                            </Typography>
                            
                            <Box
                                display="flex"
                                flexDirection="row"
                                sx={{ 
                                    justifyContent: "space-between",
                                    marginTop: 3
                                }}  
                            >
                                <Typography variant="h5">
                                    $ {product.price}
                                </Typography>
                                <Button
                                    size="large"
                                    variant="outlined"
                                    sx={{
                                        width: "50%",
                                    }}
                                    onClick={() => {
                                        handleAddToCart(product);
                                    }}
                                    startIcon={<ShoppingCartIcon />}
                                ></Button>
                            </Box>
                        </Container>
                    </Grid>

                </Grid>
            </Container>
        );
}