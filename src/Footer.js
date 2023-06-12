import { Box, Card, Container, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    return (
      <Box xs={12} sx={{ mt: "auto", backgroundColor: "#455a64"}}>
        <Container
          maxWidth= "lg"
          sx={{
            position: "relative",
            display: "flex",
            height: "200px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "700", zIndex: 1 }}>
            STORE FOOTER
          </Typography>
          <Card 
            variant="flex"
            flex="row"
            sx={{
              width: "150px",
              justifyContent: "space-between",
              zIndex: 1,
              backgroundColor: "#455a64",
            }}
          >
            <Typography 
              variant="subtitle1"
              color="inherit"
              sx={{ mr: 1, textDecoration: "none" }}
              component={Link}
              to="/"
            >
              Home
            </Typography>
            <Typography 
              variant="subtitle1"
              color="inherit"
              sx={{ mr: 1, textDecoration: "none" }}
              component={Link}
              to="/"
            >
              Shop
            </Typography>
            <Typography 
              variant="subtitle1"
              color="inherit"
              sx={{ mr: 1, textDecoration: "none" }}
              component={Link}
              to="/"
            >
              About
            </Typography>
          </Card>
          
          <Card variant="flex" sx={{ justifyContent: "center", backgroundColor: "#455a64" }}>
            <IconButton
              href="https://www.fackbook.com/simple.is.12/"
              color="inherit"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookOutlinedIcon fontSize="medium" />
            </IconButton>
            <IconButton
              href="https://www.instagram.com/andrei._dorobantu/"
              color="inherit"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon fontSize="medium" />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/andrei-ovidiu-dorobantu-56a316140/"
              color="default"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon fontSize="medium" />
            </IconButton>
          </Card>
          <Typography
            variant="body2"
            color="inherit"
            sx={{ textAlign: "center", zIndex: 1}}
          >
            Copyright &copy; 2023 React Store
          </Typography>
        </Container>
      </Box>
    );
  }
  