import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { FoodIcon } from '../FoodIcon';
import { Radio } from '@mui/material';


export const CheckboxListSecondary = () => {
    const [checked, setChecked] = React.useState<number | null>(null);

    const menuDelDia = [
        { id: 1, name: "Pollo grillado con vegetales.", icon: 'FastfoodTwoTone'},
        { id: 2, name: "Rissoto con champignone.", icon: 'RamenDiningRounded' },
        { id: 3, name: "Tortilla de papa.", icon: 'LunchDiningTwoTone'},
        { id: 4, name: "Tarta de vegetales.", icon : 'DinnerDiningTwoTone'},
        { id: 5, name: "Empanada de espinaca y queso.", icon: 'RamenDiningRounded'},
        { id: 6, name: "Carne al horno con papas grilladas.", icon: 'FastfoodTwoTone'},
        
      ]


    const handleToggle = (value: number) => () => {
        setChecked(value);
    };

    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {menuDelDia.map((item, index) => {
                const labelId = `checkbox-list-secondary-label-${index}`;
                return (
                    <label key={index}>
                        {/* <ListItem
                            key={item.id}
                            secondaryAction={
                                <Radio
                                    edge="end"
                                    name="radio-buttons-menu"
                                    onChange={handleToggle(item.id)}
                                    checked={checked === item.id}
                                    inputProps={{ 'aria-labelledby':labelId}} 
                                    color='secondary'
                                    key={item.id}
                                />
                            }
                            disablePadding
                        > */}
                            {/* <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FoodIcon icon={item.icon} />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={item.name} />
                            </ListItemButton> */}
                        {/* </ListItem> */}
                    </label>
                );
            })}
        </List>
    );
}
