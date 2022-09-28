import ImageIcon from '@mui/icons-material/Image';
import { DinnerDiningTwoTone, FastfoodTwoTone, LunchDiningTwoTone, RamenDiningRounded } from '@mui/icons-material'

export const FoodIcon = ( props: {icon: string}) => {
    switch (props.icon) {
        case 'FastfoodTwoTone':
                return <FastfoodTwoTone /> 
            break;

        case 'RamenDiningRounded':
                return <RamenDiningRounded /> 
            break;

        case  'LunchDiningTwoTone':
                return <LunchDiningTwoTone />
            break
            
        case 'DinnerDiningTwoTone':
                return <DinnerDiningTwoTone />
            break
    
        default:
            return <ImageIcon />
            break;
    }
}
