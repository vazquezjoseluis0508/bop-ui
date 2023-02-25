
import { Grid } from '@material-ui/core'
import {  Box, Divider, Snackbar } from '@mui/material'
import {  useEffect, useState } from 'react'
import { ActionButton } from '../components/ActionButton'
import Calendar from '../components/Calendar'
import { MenuDelDia } from '../components/MenuDelDia'
import HorizontalLinearStepper from '../components/Stepper/Stepper2'
import { Turno } from '../components/Turno'
import { convertDate } from '../helpers/data-time'
import { idMenuPersonal, IMenu } from '../hook/types'
import { userFetchMenu } from '../hook/useMenu'
import { crearReserva, eliminarReserva, userFetchPedido, } from '../hook/usePedidos'
import { useMenuStore } from '../store/menus'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SnackbarApp } from '../components/Snackbar'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../store/auth'
import EliminaReserva from '../components/EliminaReserva'
import { ContainerApp } from '../components/container'
import InsetDividers from '../components/listDivider'


export interface IFormPedido {
  form_menu: string 
  form_turno: string
  form_fecha: string
  idUsuarios: string
}

const PedidosPage = () => {

  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(convertDate(new Date()))
  const [openSuccess, setOpenSuccess] = useState<boolean>(false)
  const [openDeleteSuccess, setOpenDeleteSuccess] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<number>(0)
  const [selectedTurno, setSelectedTurno] = useState<string>('')
  const [reserva, setReserva] = useState<number>(0)
  const [error, setError] = useState<string>('')

  const profile = useAuthStore(state => state.profile)

  const queryClient = useQueryClient()
  const { 
    data: reservas, 
    isLoading: lodingReservas,
  } = userFetchPedido(profile.legajo)

  const { mutate, isLoading } = useMutation({
    mutationFn: crearReserva,
    onSuccess: (data) => {
      setOpenSuccess(true)
      setIsDisabled(false)
      queryClient.invalidateQueries (['pedidos'])
    }
  })

   const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
    mutationFn: eliminarReserva,
    onSuccess: (data) => {
      console.log(data)

      setOpenDeleteSuccess(true)
      setIsDisabled(false)
      queryClient.invalidateQueries (['pedidos'])
    },
    onError: (error: any) => {
      setError(error.message)
    }
  })

  const { data: menus, isLoading: lodingMenus } = userFetchMenu()

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

  useEffect(() => {

    if (reservas)
      handleSetReserva(reservas, fechaSeleccionada)

  }, [reservas])


  // const selectedTurn = watch("form_turno");
  // const selectedMenu = watch("form_menu");
  // const selectedFecha = watch("form_fecha");
  // const selectedIdUsuario = watch("idUsuarios");

  // console.log(selectedTurn, selectedMenu, selectedFecha, selectedIdUsuario)


  const onDelete = (id_reserva : number) => {
    mutateDelete(id_reserva)
  }

  const handleSetReserva = (reservas: idMenuPersonal[], date: string) => {
  
    if (reservas){
      const reserva = reservas.find( reserva => reserva.start.substring(0,10) === convertDate(date))
      if (reserva){
        setValue('form_turno', reserva.turno)
        setValue('form_menu', reserva.idMenu.toString())
        setSelectedTurno(reserva.turno)
        setSelectedMenu(reserva.idMenu)
        setReserva(reserva.idCalendarioMenu)
      } else {
        setValue('form_turno', '')
        setValue('form_menu', '')
        setSelectedMenu(0)
        setSelectedTurno('')
        setReserva(0)
      } 
    }
  }

  const handleDateChange = (date) => {
    setFechaSeleccionada(convertDate(date));
    reservas && handleSetReserva(reservas, convertDate(date))
    setValue('form_fecha', convertDate(date))
    setIsDisabled(false)
  };


  if (lodingMenus ) return <div>Loading Menus...</div>
  if (lodingReservas ) return <div>Loading Reservas...</div>

  if (menus)  addMenus(menus)
  


 

 

  const onSubmit: SubmitHandler<IFormPedido> = (data: IFormPedido) => {
    setIsDisabled(true);
    setTimeout(() => {
      mutate(data)

    }, 1000);
   
  } 



  return (
    <>
    <ContainerApp>
      
      <Box border={0} borderColor='primary.main' borderRadius={2}  sx={{ width: '100%'}}>
      <HorizontalLinearStepper />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type={'hidden'} {...register('form_fecha')} value={fechaSeleccionada} />
        <input type={'hidden'} {...register('idUsuarios')} value={profile.idUsuarios} />
        
       
       <Grid container >
            <Grid item xs={3} sm={12} md={3} >
                <Calendar 
                  onDateChange={handleDateChange}
                  fechaSeleccionada={fechaSeleccionada}
                  />
                <Turno 
                  name="form_turno" 
                  register={register} 
                  fechaSeleccionada={fechaSeleccionada}
                  selectedTurno={selectedTurno}
                  errors={errors['form_turno']?.message || ''}
                  />
            </Grid>
            <Grid item xs={6} sm={12} md={6} >
              <Box  m={1} paddingLeft={2}>
                <MenuDelDia 
                  name="form_menu" 
                  register={register} 
                  watch={watch} 
                  control={control}
                  fechaSeleccionada={fechaSeleccionada}
                  selectedMenu={selectedMenu}
                  errors={errors['form_menu']?.message || ''}
                  />
                <Divider  sx={{ marginTop: 5}}/>
                <Snackbar open={isSubmitting} message="Guardando..." />
                <Box mt={5} pr={5}>
                  <ActionButton  
                    onDelete={onDelete}
                    isDisabled={isDisabled} 
                    reserva={reserva}
                    />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3} sm={12} md={3} >
              <Box  mt={2} >
              <InsetDividers />
              </Box>
            </Grid>
       </Grid>
       {
          openSuccess && (
            <SnackbarApp
              open={openSuccess}
              message="¡Genial! Ya tienes tu menú de comida reservado."
              type='success'
              variant='outlined'
            />
          )
       }

       {
         openDeleteSuccess && (
            <SnackbarApp
              open={openDeleteSuccess}
              message="¡Listo! Hemos eliminado el menú de comida que ya no deseabas de tu pedido" 
              type='success'
              variant='outlined'
            />
          )

       }
       { 
          Object.keys(errors).length > 0 && (
            <SnackbarApp 
                open={true}
                message="Por favor, selecciona al menos un menú y un turno para poder continuar"
                type='error'
            />
          )
       }

        { 
          error && (
            <SnackbarApp
              open={true}
              message={error}
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
