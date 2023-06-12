// import { useEffect, useState } from "react";
// import { getProducts } from "../apiCall";
// import { Grid } from "@mui/material";

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [isHovered, setIsHovered] = useState(false);

//   const handleHover = () => {
//     setIsHovered(!isHovered);
//   };

//   useEffect(() => {
//     (async () => {
//       const products = await getProducts();
//       if (products) {
//         setProducts(products);
//       }
//     })();
//   }, []);

//   return (
//     <Grid
//       display="grid"
//       gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
//       gap={6}
//     >
//       {products.map((product) => (
//         <Grid
//           key={product._id}
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           marginBottom="50px"
//         >
//           <img
//             style={{
//               display: "block",
//               width: "100%",
//               height: "auto",
//               maxWidth: "100%",
//               objectFit: 'cover',
//               transition: "transform 0.3s ease",
//               transform: isHovered ? "scale(1.1)" : "scale(1)",
//             }}
//             src={product.imgPath}
//             alt={product.name}
//             onMouseEnter={handleHover}
//             onMouseLeave={handleHover}
//           />

//           <h3>{product.name}</h3>
//           <span>Ks {product.price}</span>
//           <span>{product.description}</span>
//         </Grid>
//       ))}
//     </Grid>
//   );
// }

import { useEffect, useState } from "react";
import { getProducts } from "./apiCall";
import { Grid, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "./Utils/Loading";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(-1);
  const [isLoading, setLoading]   = useState(true);

  const navigate = useNavigate();

  const handleHover = (index) => {
    setIsHovered(index);
  };

  useEffect(() => {
    (async () => {
      const products = await getProducts();
      if (products) {
        setProducts(products);
        setLoading(false);
      }
    })();
  }, []);

  return isLoading ? (
      <Grid container spacing={6}>
        {[...Array(4)].map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}>
            <Skeleton variant="rectangular" animation="wave" width="100%" height={0} style={{ paddingBottom: '100%' }} />
            <Skeleton variant="text" animation="wave" width="60%" height={30} style={{ marginBottom: 10 }} />
            <Skeleton variant="text" animation="wave" width="50%" height={20} />
            <Skeleton variant="text" animation="wave" width="70%" height={20} />
          </Grid>
        ))}
      </Grid>    
    ) : (
      <Grid container spacing={6}>
        {products.map((product, index) => (
          <Grid
            key={product._id}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
          >
            <Grid
              style={{
                width: "100%",
                height: 0,
                paddingBottom: "100%",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(-1)}
            >
              <img
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  transform: isHovered === index ? "scale(1.1)" : "scale(1)",
                }}
                src={product.imgPath}
                alt={product.name}
                onClick={() => {
                  navigate(`/products/${product._id}`);
                }}
              />
            </Grid>

            <Typography variant="h5" align="center" sx={{ mt: 1, fontWeight: "600"}}>{product.name}</Typography>
            <Typography component="p" align="center">$ {product.price}</Typography>
          </Grid>
        ))}
      </Grid>
    );
}
