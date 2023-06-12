import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "./apiCall";

export default function Profile({ authUser}) {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await getUser(id);
            if(res) return setUser(res);
        })();
    }, [id]);

    return (
        <Box sx={{ my: 5, minHeight: '100vh', flex: 1, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
			<Box sx={{ height: 200, background: "grey", mb: 2 }}></Box>

			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box>
					<Typography sx={{ fontWeight: "bold"}}>
						Name: {user.name}
					</Typography>
                    <Typography sx={{ mt: 1, fontSize: "0.9em", fontWeight: "bold"}}>
							Email: {user.email}
					</Typography>
					<Typography sx={{ mt: 1, fontSize: "0.9em", fontWeight: "bold"}}>
                        {user.created}
					</Typography>	
				</Box>
                <Box>
					{user._id === authUser._id ? (
						<Button
							variant="contained"
							onClick={() => {
								navigate("/edit");
							}}>
							Edit Profile
						</Button>
					) : (
                        ''
						// <FollowButton user={user} />
					)}
				</Box>
            </Box>
        </Box>
    );
}