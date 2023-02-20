import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid, IconButton } from '@mui/material';
import { menuDelDia } from '../constants';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { searchImages } from '../services/google.service';
import { getFromLocalStorage, storeInLocalStorage } from '../services/cache.service';





export const  MenuDelDia = () => {
    const [ data, setData ] = React.useState<any>([])
    const [seleccionado, setSeleccionado] = React.useState(null);

    const handleSeleccionar = (id) => {
        if (id === seleccionado) {
          setSeleccionado(null); // deseleccionar si se hace clic en una tarjeta ya seleccionada
        } else {
          setSeleccionado(id); // seleccionar la tarjeta que se hace clic
        }
        console.log(id)
      };
    


    // obtener data 
    const getData = async () => {
        const data = await Promise.all(menuDelDia.map(async (item, index) => {
            try {
               
                const cachedResults = getFromLocalStorage(item.name);

                let image = ''
    
                if (cachedResults) {
                    console.log("Resultados obtenidos del caché:", cachedResults);
                    image = cachedResults
                } else {
                    // Hacer una nueva solicitud a la API de búsqueda
                    const results = await searchImages(item.name);
                
                    // Almacenar los resultados en el caché
                    storeInLocalStorage(item.name, results);
                
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
                console.log(error)
            }
            
        }))
        return data
    }


    React.useEffect(() => {
        getData().then((data) => {
            setData(data)
        })
    }, [])




  return (

    <>
    <Box margin={2} >
        <Grid container spacing={2}>
        {data.map((item, index) => {
            return (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                    key={item.id} 
                    onClick={() => handleSeleccionar(item.id)}
                    elevation={seleccionado === item.id ? 10 : 24}
                    sx={{
                        border: seleccionado === item.id ? '4px solid' : 'none' ,
                        borderColor: seleccionado === item.id ? 'primary.light' : 'default',
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
                        {item.name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton aria-label="add to favorites">
                            {
                                seleccionado === item.id ?
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