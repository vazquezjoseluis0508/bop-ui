import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { IMenuPersonal } from '../hook/types';

interface IFormInput {
    rating: number;
    feedback: string;
}

interface IProps {
    open: boolean;
    onClose: () => void;
    calificar: (rating: number, feedback: string) => void;
    reserva: IMenuPersonal | null;
}

export const RatingComponent = ({ open, onClose, calificar, reserva }: IProps) => {
    const { handleSubmit, control } = useForm<IFormInput>({
        defaultValues: {
            rating: reserva?.rating || 0,
            feedback: reserva?.feedback || ''
        }
    });

    const onSubmit = (data: IFormInput) => {
        calificar(data.rating, data.feedback);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Califica tu experiencia</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Por favor, evalúa la calidad del servicio que has recibido.
                </DialogContentText>
                <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                        <Rating
                            name="simple-controlled"
                            value={field.value}
                            onChange={(e, newValue) => field.onChange(newValue)}
                            size="large"
                            sx={{
                                '& .MuiRating-icon': {
                                    marginLeft: '10px',
                                },
                                '& .MuiRating-icon:first-child': {
                                    margin: '7px',
                                }
                            }}
                        />
                    )}
                />
                <Controller
                    name="feedback"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            multiline
                            name="feedback"
                            rows={4}
                            variant="outlined"
                            inputProps={{
                                maxLength: 200,
                            }}
                            fullWidth
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Déjanos un comentario para saber cómo podemos mejorar."
                        />
                    )}
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
