import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Grid, IconButton } from '@mui/material';
// import { menuDelDia } from '../constants';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { searchImages } from '../services/google.service';
import { getFromLocalStorage, storeInLocalStorage } from '../services/cache.service';
import { useMenu } from '../hook/useMenu';
import { IMenu } from '../models/menus';



export const  MenuDelDia = ({ date }) => {

    const { menus, handleGetMenus } = useMenu()

    const [ data, setData ] = React.useState<IMenu[]>([])
    const [seleccionado, setSeleccionado] = React.useState(null);

    const handleSeleccionar = (id) => {
        if (id === seleccionado) {
          setSeleccionado(null); // deseleccionar si se hace clic en una tarjeta ya seleccionada
        } else {
          setSeleccionado(id); // seleccionar la tarjeta que se hace clic
        }
      };

    const convertDate = (date) => {
        const fecha = new Date(date)
        return fecha.toISOString().substring(0, 10)
    }

    const getData = async () => {
        const platos_del_dia = menus.menus.filter((item) => {
            if (convertDate(item.fecha_menu) === convertDate(date)) {
                return item
            }
        })

        console.log("platos_del_dia: ", platos_del_dia)

        const data: IMenu[] = await Promise.all(platos_del_dia.map(async (item, index) => {
            try {
                const cachedResults = getFromLocalStorage(item.descripcion);
                let image = ''
                if (cachedResults) {
                    console.log("Resultados obtenidos del caché:", cachedResults);
                    image = cachedResults
                } else {
                    const results = await searchImages(item.descripcion);
                    // Almacenar los resultados en el caché
                    storeInLocalStorage(item.descripcion, results);
                    console.log("Resultados obtenidos de la API:", results);
                    image = results
                }

                if (image === '') {
                    image = './img/menu22.png'
                }

                return {
                    ...item,
                    image: image
                }

            } catch (error) {
                console.log("get_data: ",error)
            }
            return item
            
        }))

        console.log(data)
        return data
    }


    React.useEffect(() => {
        handleGetMenus()

        
    }, [])

    React.useEffect(() => {
        console.log("date: ", date)
        getData().then((data) => {
            setData(data)
        })
    }, [date])



  return (

    <>
    <Box margin={2} >
        <Grid container spacing={2}>
        {data.map((item, index) => {
            return (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                    key={item.idMenuPersonal} 
                    onClick={() => handleSeleccionar(item.idMenuPersonal)}
                    elevation={seleccionado === item.idMenuPersonal ? 10 : 24}
                    sx={{
                        border: seleccionado === item.idMenuPersonal ? '4px solid' : 'none' ,
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
                        <IconButton aria-label="add to favorites">
                            {
                                seleccionado === item.idMenuPersonal ?
                                <FavoriteSharpIcon sx={{color: 'primary.main' }}/>
                                :
                                <FavoriteSharpIcon sx={{color: 'grey.500' }}/>
                            }
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
            )
        }
        )}
        </Grid>

    </Box>
    </>
  );
}