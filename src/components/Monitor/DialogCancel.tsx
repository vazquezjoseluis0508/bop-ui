


import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface Props {
    openConfirmDialog: boolean;
    setOpenConfirmDialog: (open: boolean) => void;
    cancelPedido: () => void;
}


export const DialogCancel = ({ openConfirmDialog, setOpenConfirmDialog, cancelPedido }: Props) => {
    return (
        <Dialog
            open={openConfirmDialog}
            onClose={() => setOpenConfirmDialog(false)}
        >
            <DialogTitle>Cancelar Pedido</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro de que deseas cancelar este pedido?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
                    No
                </Button>
                <Button onClick={cancelPedido} color="secondary">
                    Sí, cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}


