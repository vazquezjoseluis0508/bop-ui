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

  const menuDelDia = [
    { id: 1, name: 'Pollo grillado con vegetales.', icon: 'FastfoodTwoTone', image:'https://www.cardamomo.news/__export/1619467998593/sites/debate/img/2021/04/26/ensalada_de_pollo_a_la_plancha_crop1619464936823.jpeg_554688468.jpeg' },
    { id: 2, name: 'Rissoto con champignone.', icon: 'RamenDiningRounded' , image:'https://cdn0.recetasgratis.net/es/posts/9/0/9/risotto_de_champinones_74909_orig.jpg'},
    { id: 3, name: 'Tortilla de papa.', icon: 'LunchDiningTwoTone', image: 'https://locosxlaparrilla.com/wp-content/uploads/2015/02/Receta-recetas-locos-x-la-parrilla-locosxlaparrilla-tortilla-tortilla-de-papa.png' },
    { id: 4, name: 'Tarta de vegetales.', icon: 'DinnerDiningTwoTone', image:'https://www.hazteveg.com/img/recipes/full/201601/R21-29305.jpg' },
    { id: 5, name: 'Empanada de espinaca y queso.', icon: 'RamenDiningRounded', image:'https://www.johaprato.com/files/styles/flexslider_full/public/empanadas_espinaca.png?itok=4mYQtPJz' },
    { id: 6, name: 'Carne al horno con papas grilladas.', icon: 'FastfoodTwoTone', image: 'https://unareceta.com/wp-content/uploads/2018/04/receta-de-lomo-al-horno-con-verduras.jpg' }

  ]

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
import { Grid } from '@mui/material';

export const  MenuDelDia = () => {
  return (

    <>
    <Grid container spacing={2}>
    {menuDelDia.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 400 }} key={item.id}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="100"
                    width="50"
                    image={item.image}
                />
                <CardContent>
                    
                    <Typography variant="body2" color="text.secondary">
                    {item.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Seleccionar Este!</Button>
                </CardActions>
            </Card>
        </Grid>
    ))}
    </Grid>
    

    
    </>
  );
}