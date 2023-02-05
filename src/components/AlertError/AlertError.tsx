import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@mui/material";
import { useState } from "react";

export const AlertError = ({ message }: { message: string }) => {
    const [open, setOpen] = useState(false);
    
    
    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={() =>setOpen(false)}>
                <Alert onClose={() =>setOpen(false)} severity="error">
                {message}
                </Alert>
            </Snackbar>
        </div>
    );
    };