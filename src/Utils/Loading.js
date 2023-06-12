import { CircularProgress, Grid } from "@mui/material";

export default function Loading() {
    return (
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress /> {/* Loading indicator */}
        </Grid>
    );
}