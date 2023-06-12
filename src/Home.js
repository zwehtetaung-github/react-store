import { Box, Divider } from "@mui/material";
import SliderCarousel from "./SliderCarousel";
import ProductList from "./ProductList";

export default function Home() {

    return (
            <Box sx={{ mt: 5 }} style={{ minHeight: '100vh', flex: 1 }} >
                <SliderCarousel />
                <Box  sx={{ mt: 5, mx: { lg: 12, md: 6, sm: 4, xs: 3 } }}>
                    <ProductList />
                </Box>
                <Divider />    
            </Box>
            
    );
}
