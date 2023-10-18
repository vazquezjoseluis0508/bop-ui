import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Grid, IconButton, Rating } from '@mui/material';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { useMenuStore } from '../store/menus';
import { Controller } from 'react-hook-form';

type MenuDelDiaProps = {
    register: any;
    name: string;
    watch: any;
    control: any;
    fechaSeleccionada: string;
    errors: string;
    selectedMenu: number;
    reserva: any;
}


export const MenuDelDia = ({ name, register, watch, control, fechaSeleccionada, errors, selectedMenu, reserva }: MenuDelDiaProps) => {
    const menus = useMenuStore(state => state.menus)

    const data = menus.filter((item) => item.fecha_menu.substring(0, 10) === fechaSeleccionada)

    const [seleccionado, setSeleccionado] = React.useState<number>(selectedMenu);

    console.log('reserva: ', reserva)

    const handleSeleccionar = (id) => {

        // if (id === seleccionado) {
        //   setSeleccionado(0); // deseleccionar si se hace clic en una tarjeta ya seleccionada
        // } else {
        setSeleccionado(id); // seleccionar la tarjeta que se hace clic
        // }
    };


    React.useEffect(() => {
        setSeleccionado(selectedMenu)
    }, [fechaSeleccionada, selectedMenu])

    return (

        <>
            {errors !== '' &&
                <Typography color="error" variant="body2" component="p" align="center" >
                    {errors}
                </Typography>
            }
            <Box margin={2} >

                <Grid container spacing={2}>
                    {data.map((item, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index}>


                                <Controller
                                    name={name}
                                    control={control}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <Card
                                            key={item.idMenuPersonal}
                                            onClick={() => {
                                                handleSeleccionar(item.idMenuPersonal)
                                                onChange(item.idMenuPersonal)
                                            }}
                                            elevation={seleccionado === item.idMenuPersonal ? 10 : 24}
                                            sx={{
                                                border: seleccionado === item.idMenuPersonal ? '4px solid' : 'none',
                                                borderColor: seleccionado === item.idMenuPersonal ? 'primary.light' : 'default',
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                alt="green iguana"
                                                height="100"
                                                width="50"
                                                image={item.image}
                                            />
                                            <CardContent
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    height: '80px',
                                                }}
                                            >

                                                <Typography variant="body2" color="text.secondary">
                                                    {item.descripcion}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                {
                                                    reserva?.rating !== null && reserva?.rating > 0 && (
                                                        <Controller
                                                            name="rating"
                                                            control={control}
                                                            defaultValue={reserva?.rating}
                                                            render={({ field }) => (
                                                                <Rating
                                                                    name="simple-controlled"
                                                                    value={field.value}
                                                                    size="large"
                                                                    readOnly
                                                                    sx={{
                                                                        '& .MuiRating-icon:hover': {
                                                                            backgroundColor: 'transparent', // Anula el fondo al pasar el cursor sobre las estrellas
                                                                        }
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    )
                                                }


                                            </CardActions>
                                        </Card>
                                    )}
                                />

                            </Grid>
                        )
                    }
                    )}
                </Grid>

            </Box>
        </>
    );
}