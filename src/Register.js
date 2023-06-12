import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { register } from "./apiCall";
import { useRef, useState } from "react";

export default function Register() {
    const name      = useRef();
    const email     = useRef();
    const password  = useRef();

    const [err, setErr]       = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="sm">
            <Box 
                sx={{ 
                    boxShadow: 3,
                    px: 8,
                    py: 6,
                    marginTop: 20,
                    marginBottom: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center" 
                }}
            >
            <Typography component="h1" variant="h5">
                Create an account
            </Typography>
            
            <Box sx={{ mt: 1}}>

                {err &&<Alert severity="warning" sx={{ my: 2}}>{errMsg}</Alert>}

                <form 
                    onSubmit={e => {
                        e.preventDefault();

                        (async () => {
                            let user = await register(
                                name.current.value,
                                email.current.value,
                                password.current.value
                            );
                            if(user) {
                                navigate("/login", {
                                    state: "Register successful.",
                                });
                            } else {
                                setErr(true);
                                setErrMsg("Register failed, please try again.");
                            }
                        })();
                    }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="User name"
                        inputRef={name}
                    />
                    
                    <TextField 
                        margin="normal"
                        required
                        fullWidth
                        label="Email address"
                        type="email"
                        inputRef={email}
                    />

                    <TextField 
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        inputRef={password}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, height: 50 }}
                        style={{ backgroundColor: grey[900] }}
                    >
                        Register
                    </Button>
                </form>
                <Typography sx={{ mt: 2}} align="center">
                    Already a member?
                    <Link to={"/login"} variant="button" style={{ color: "black", textDecoration: "none" }}>
                        {" Login"}
                    </Link>
                </Typography>
            </Box>
        </Box>
        </Container>
    );
}