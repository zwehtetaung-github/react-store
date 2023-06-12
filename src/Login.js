import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { login } from "./apiCall";
import { useRef, useState } from "react";

export default function Login({ setAuth, setAuthUser }) {
    const email = useRef();
    const password = useRef();

    const [err, setErr]       = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="sm">
            <Box 
                sx={{ 
                    boxShadow: 3,
                    px: 8,
                    py: 8,
                    marginTop: 20,
                    marginBottom: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center" 
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                <Box sx={{ mt: 1}}>
                    {location.state && 
                        <Alert severity="success" sx={{ my: 2 }}>
                            {location.state}
                        </Alert>
                    }

                    {err &&<Alert severity="warning" sx={{ my: 2}}>{errMsg}</Alert>}

                    <form 
                        onSubmit={e => {
                            e.preventDefault();

                            (async () => {
                                let result = await login(
                                    email.current.value,
                                    password.current.value
                                );
                                if(result) {
                                    setAuth(true);
                                    setAuthUser(result.user);
                                    navigate("/");
                                } else {
                                    setErr(true);
                                    setErrMsg("Email or password incorrect.");
                                }
                            })();
                        }}
                    >
                    <TextField 
                        margin="normal"
                        required
                        fullWidth
                        label="Email address"
                        type="email"
                        autoComplete="email"
                        inputRef={email}
                    />

                    <TextField 
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        inputRef={password}
                    />

                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={12}md={6} lg={6} >
                            <FormControlLabel
                                control={<Checkbox style={{ color: grey[800]}} />}
                                label="Remember me"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography align="right">
                                <Link href="#" variant="body2" style={{ color: "black", textDecoration: 'none' }}>
                                    Lost your password?
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, height: 50 }}
                        style={{ backgroundColor: grey[900] }}
                    >
                        Login
                    </Button>
                    </form>


                    <Typography sx={{ mt: 2}} align="center">
                        Not a member?
                        <Link to={"/register"} variant="button" style={{ color: "black", textDecoration: "none" }}>
                            {" Register"}
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}