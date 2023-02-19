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
import { menuDelDia, unsplash_ACCESS_KEY, unsplash_API_URL } from '../constants';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import axios from 'axios';



interface ImageResult {
  link: string;
}



export const  MenuDelDia = () => {

    const accessKey = unsplash_ACCESS_KEY; // Reemplaza con tu clave de acceso a la API de Unsplash
    const unsplash_URL = unsplash_API_URL;

    const get_image = async (query: string): Promise<string> => {
        try {
        const url = `${unsplash_URL}/search/photos?query=${query}&client_id=${accessKey}`;
        const response = await axios.get(url)
        console.log("results: ",response.data.results)
        const image = response.data.results[0].urls.small
        return image.toString()
        } catch (error) {
            console.log(error)
            return ''
        }

    }


    // obtener data 
    const getData = async () => {
        const data = await Promise.all(menuDelDia.map(async (item, index) => {
            const image = await get_image(item.name)
            return {
                ...item,
                image: image
            }
        }))
        return data
    }

    const [data, setData] = React.useState<any>([])

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