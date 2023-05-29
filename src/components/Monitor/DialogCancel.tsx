import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react';

interface Props {
    openConfirmDialog: boolean;
    setOpenConfirmDialog: (open: boolean) => void;
    cancelPedido: (cancelReason: string) => void;
}

export const DialogCancel = ({ openConfirmDialog, setOpenConfirmDialog, cancelPedido }: Props) => {
    const [cancelReason, setCancelReason] = useState('');

    const handleSubmit = () => {
        cancelPedido(cancelReason);
        setCancelReason(''); // Limpia el campo de texto después de enviar
    };

    return (
        <Dialog
            open={openConfirmDialog}
            onClose={() => {
                setOpenConfirmDialog(false);
                setCancelReason(''); // Limpia el campo de texto al cerrar el diálogo
            }}
        >
            <DialogTitle>Cancelar Pedido</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro de que deseas cancelar este pedido?
                </DialogContentText>
                <TextField
                    multiline
                    rows={4}
                    value={cancelReason}
                    onChange={event => setCancelReason(event.target.value)}
                    variant="outlined"
                    inputProps={{
                        maxLength: 200,
                    }}
                    fullWidth
                    placeholder="Describe brevemente el motivo de cancelación o devolución"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpenConfirmDialog(false);
                    setCancelReason(''); // Limpia el campo de texto al hacer clic en "No"
                }} color="primary">
                    No
                </Button>
                <Button onClick={handleSubmit} color="secondary">
                    Sí, cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
