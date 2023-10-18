import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

interface IFormInput {
    rating: number;
    feedback: string;
    calificar: (rating: number, feedback: string) => void;
}

interface IProps {
    open: boolean;
    onClose: () => void;
    calificar: (rating: number, feedback: string) => void;
}

export const RatingComponent = ({ open, onClose }: IProps) => {
    const { handleSubmit, control } = useForm<IFormInput>();

    const onSubmit = (data: IFormInput) => {
        console.log(data);
        // Envía la calificación y el feedback al servidor
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Califica tu experiencia</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Por favor, evalúa la calidad del servicio que has recibido.
                </DialogContentText>
                <Controller
                    name="rating"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                        <Rating
                            name="simple-controlled"
                            value={field.value}
                            onChange={(e, newValue) => field.onChange(newValue)}
                            size="large" // Hace las estrellas más grandes
                            sx={{
                                '& .MuiRating-icon': {
                                    marginLeft: '5px',
                                },
                                '& .MuiRating-icon:first-child': {
                                    marginLeft: '0px',
                                }
                            }}
                        />
                    )}
                />
                <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    inputProps={{
                        maxLength: 200,
                    }}
                    fullWidth
                    placeholder="Déjanos un comentario para saber cómo podemos mejorar."
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button color="secondary" onClick={handleSubmit(onSubmit)}>
                    Enviar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
