import ImageIcon from '@mui/icons-material/Image'
import { DinnerDiningTwoTone, FastfoodTwoTone, LunchDiningTwoTone, RamenDiningRounded } from '@mui/icons-material'

export const FoodIcon = (props: { icon: string }) => {
  switch (props.icon) {
    case 'FastfoodTwoTone':
      return <FastfoodTwoTone  color='secondary' />
      break

    case 'RamenDiningRounded':
      return <RamenDiningRounded color='secondary'/>
      break

    case 'LunchDiningTwoTone':
      return <LunchDiningTwoTone color='secondary'/>
      break

    case 'DinnerDiningTwoTone':
      return <DinnerDiningTwoTone color='secondary'/>
      break

    default:
      return <ImageIcon color='secondary'/>
      break
  }
}
