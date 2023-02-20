// import * as React from 'react'
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import ListItemButton from '@mui/material/ListItemButton'
// import ListItemText from '@mui/material/ListItemText'
// import ListItemAvatar from '@mui/material/ListItemAvatar'
// import Checkbox from '@mui/material/Checkbox'
// import Avatar from '@mui/material/Avatar'
// import { FoodIcon } from './FoodIcon'
// import { Box, Radio } from '@mui/material'

// export const MenuDelDia = () => {
//   const [checked, setChecked] = React.useState<number | null>(null)

//   const handleToggle = (value: number) => () => {
//     setChecked(value)
//   }

//   return (
//     <Box margin={1} padding={2}>
//         <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//             {menuDelDia.map((item, index) => {
//               const labelId = `checkbox-list-secondary-label-${index}`
//               return (
//                     <label key={index}>
//                         <ListItem
//                             key={item.id}
//                             secondaryAction={
//                                 <Radio
//                                     edge="end"
//                                     name="radio-buttons-menu"
//                                     onChange={handleToggle(item.id)}
//                                     checked={checked === item.id}
//                                     inputProps={{ 'aria-labelledby':labelId}}
//                                     color='secondary'
//                                     key={item.id}
//                                 />
//                             }
//                             disablePadding
//                         >
//                             <ListItemButton>
//                                 <ListItemAvatar>
//                                     <Avatar >
//                                         <FoodIcon icon={item.icon}  />
//                                     </Avatar>
//                                 </ListItemAvatar>
//                                 <ListItemText id={labelId} primary={item.name} />
//                             </ListItemButton>
//                         </ListItem>
//                     </label>
//               )
//             })}
//         </List>
//         </Box>
//   )
// }


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
    const [query, setQuery] = React.useState('');
    const [images, setImages] = React.useState([]);
    const [ data, setData ] = React.useState<any>([])


    // Ejemplo de uso
  
    
  
    


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

                console.log('image', image)

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
                <Card sx={{ maxWidth: 400 }} key={item.id} elevation={24}>
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
                            {/* <CheckCircleOutlineIcon /> */}
                            {/* <FavoriteTwoToneIcon /> */}
                            <FavoriteSharpIcon sx={{
                                color: 'grey.500',
                            }}/>
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