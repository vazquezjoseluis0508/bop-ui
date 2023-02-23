
import { Grid, Typography } from '@material-ui/core'
import { Alert, Box, Divider, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'
import { ActionButton } from '../components/ActionButton'
import Calendar from '../components/Calendar'
import { ContainerApp } from '../components/Container'
import { MenuDelDia } from '../components/MenuDelDia'
import HorizontalLinearStepper from '../components/Stepper/Stepper2'
import { Turno } from '../components/Turno'
import { convertDate } from '../helpers/data-time'
import { IMenu } from '../hook/types'
import { userFetchMenu } from '../hook/useMenu'
import { userFetchPedido } from '../hook/usePedidos'
import { useMenuStore } from '../store/menus'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SnackbarApp } from '../components/Snackbar'


export interface IFormPedido {
  form_menu: string 
  form_turno: string
}

const PedidosPage = () => {

  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(convertDate(new Date()))
  
  const { data: menus, isLoading: lodingMenus } = userFetchMenu()
  const { data:reservas, isLoading: lodingReservas } = userFetchPedido()
  const addMenus = useMenuStore( state => state.addAllMenus)

  const schema = yup.object().shape({
    form_turno: yup.string().required('debe seleccionar un turno.'),
    form_menu: yup.string().required('debe seleccionar un menu.')
  })

  
  const { 
      control, 
      handleSubmit, 
      formState: 
        { errors, isSubmitting }, 
      register, 
      reset, 
      watch, 
      setValue 
  } = useForm<IFormPedido>({
    resolver: yupResolver(schema),
    defaultValues: {
      form_menu: '',
      form_turno: ''
    }
  })



  const selectedTurn = watch("form_turno");
  const selectedMenu = watch("form_menu");

  console.log(selectedTurn, selectedMenu)



  if (lodingMenus ) return <div>Loading...</div>

  if (menus)  addMenus(menus)
  if (reservas) console.log(reservas)


  const onDelete = (id_reserva : number) => {
    console.log(id_reserva)
  }


  const handleDateChange = (date) => {
    setFechaSeleccionada(convertDate(date));
    reset({ form_turno: '', form_menu: '' })
    console.log( selectedTurn, selectedMenu)
  };


 

  const onSubmit: SubmitHandler<IFormPedido> = data => {

    console.log(errors)
   
  } 




  return (
    <>
    <ContainerApp>
      
      <Box border={0} borderColor='primary.main' borderRadius={2}  sx={{ width: '100%'}}>
      <HorizontalLinearStepper />
      <form onSubmit={handleSubmit(onSubmit)}>
        
       
       <Grid container >
            <Grid item xs={4} sm={12} md={4} >
                <Calendar 
                  onDateChange={handleDateChange}
                  fechaSeleccionada={fechaSeleccionada}
                  />
                <Turno 
                  name="form_turno" 
                  register={register} 
                  fechaSeleccionada={fechaSeleccionada}
                  errors={errors['form_turno']?.message || ''}
                  />
            </Grid>
            <Grid item xs={8} sm={12} md={8} >
              <Box  m={1} paddingLeft={2}>
                <MenuDelDia 
                  name="form_menu" 
                  register={register} 
                  watch={watch} 
                  control={control}
                  fechaSeleccionada={fechaSeleccionada}
                  errors={errors['form_menu']?.message || ''}
                  />
                <Divider  sx={{ marginTop: 5}}/>
                <Snackbar open={isSubmitting} message="Guardando..." />
                <Box mt={5} pr={5}>
                  <ActionButton  onDelete={onDelete}/>
                </Box>
              </Box>
            </Grid>
       </Grid>
       { 
          Object.keys(errors).length > 0 && (
            <SnackbarApp 
                open={true}
                message="Por favor, selecciona al menos un menú y un turno para poder continuar"
                type='error'
            />
          )
        }

       </form>
        
       </Box>
    </ContainerApp>
    </>
  )
}

export default PedidosPage
