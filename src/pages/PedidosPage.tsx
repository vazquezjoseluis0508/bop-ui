
import { Grid, makeStyles } from '@material-ui/core'
import { Alert, AlertTitle, Box, Button, Divider, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'
import { ActionButton } from '../components/ActionButton'
import Calendar from '../components/Calendar'
import { MenuDelDia } from '../components/MenuDelDia'
import HorizontalLinearStepper from '../components/Stepper2'
import { Turno } from '../components/Turno'
import { convertDate, formatDate } from '../helpers/data-time'
import { type IMenuPersonal, type IMenu, UserMenu } from '../hook/types'
import { userFetchMenu } from '../hook/useMenu'
import { pedidoReservado, eliminarReserva, pedidoRealizado, userFetchReserva, pedidoCancelado, pedidoRetirado, pedidoCalificado } from '../hook/usePedidos'
import { useMenuStore } from '../store/menus'
import * as yup from 'yup'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SnackbarApp } from '../components/Snackbar'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../store/auth'
import { ContainerApp } from '../components/container'
import MiReserva from '../components/MiReserva'
import { Accion, IFormPedido } from '../types/pedidos.type'
import { DialogCancel } from '../components/Monitor/DialogCancel'
import { RESPONSE_MESSAGES } from '../helpers/messages-response'
import StarIcon from '@mui/icons-material/Star';
import { RatingComponent } from '../components/RatingComponent'

const useStyles = makeStyles((theme) => ({
  pulsate: {
    animation: `$pulsate 1000ms ${theme.transitions.easing.easeInOut} infinite`,
  },
  "@keyframes pulsate": {
    "0%": {
      transform: "scale(1.0)",
    },
    "50%": {
      transform: "scale(1.1)",
    },
    "100%": {
      transform: "scale(1.0)",
    },
  },
}));







const PedidosPage = () => {
  const classes = useStyles();
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(convertDate(new Date()))
  const [openSuccess, setOpenSuccess] = useState<boolean>(false)
  const [openSuccessCalification, setOpenSuccessCalification] = useState<boolean>(false)
  const [openDeleteSuccess, setOpenDeleteSuccess] = useState<boolean>(false)
  const [actionButton, setActionButton] = useState<Accion>('reservar')
  const [selectedMenu, setSelectedMenu] = useState<number>(0)
  const [selectedTurno, setSelectedTurno] = useState<string>('')
  const [reserva, setReserva] = useState<IMenuPersonal | null>(null)
  const [error, setError] = useState<string>('')
  const [restriccion, setRestriccion] = useState<string>('')
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userMenuToCancel, setUserMenuToCancel] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const mostrarComponenteDeCalificacion = () => {
    setOpen(true);
  };
  
  const cerrarComponenteDeCalificacion = () => {
    setOpen(false);
  };


  const profile = useAuthStore(state => state.profile)

  const queryClient = useQueryClient()
  const {
    data: reservas,
    isLoading: lodingReservas
  } = userFetchReserva(profile?.legajo || '')



  const { mutate: ReservarPedido, isLoading: reservarLoading } = useMutation({
    mutationFn: pedidoReservado,
    onSuccess: (data) => {
      setOpenSuccess(true)
      queryClient.invalidateQueries(['pedidos'])
    }
  })

  const { mutate: RealizarPedido } = useMutation({
    mutationFn: pedidoRealizado,
    onSuccess: (data) => {
      console.log('Pedido Realizado: ', data)
    },
    onError: (error: any) => {
      console.log('Error: pedido realizado: ', error)
    }
  })

  const { mutate: RetirarPedido } = useMutation({
    mutationFn: pedidoRetirado,
    onSuccess: (data) => {
      console.log('onSuccess pedidoRetirado: ', data)
    },
    onError: (error: any) => {
      console.log('onError pedidoRetirado: ', error)
    }
  })

  const { mutate: mutateCancel } = useMutation({
    mutationFn: pedidoCancelado,
    onSuccess: (data) => {
      console.log('onSuccess pedidoCancelado: ', data)
    },
    onError: (error: any) => {
      console.log('onError pedidoCancelado: ', error)
    }
  })

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
    mutationFn: eliminarReserva,
    onSuccess: (data) => {
      setOpenDeleteSuccess(true)
      queryClient.invalidateQueries(['pedidos'])
    },
    onError: (error: any) => {
      setError(error.message)
    }
  })

  const { mutate: CalificarPedido } = useMutation({
    mutationFn: pedidoCalificado,
    onSuccess: (data) => {
      console.log('onSuccess pedido Calificado: ', data)
      setOpenSuccessCalification(true)
      // window.location.reload()
      queryClient.invalidateQueries(['pedidos'])
    },
    onError: (error: any) => {
      console.log('onError pedido calificado: ', error)
    }
  })

  const { data: menus, isLoading: lodingMenus } = userFetchMenu()

  const addMenus = useMenuStore(state => state.addAllMenus)

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
    console.log('reservas: ', reservas)
    if (reservas != null) {
      const reserva = handleSetReserva(reservas, fechaSeleccionada)
      handleRestriction(reserva)
    }

  }, [reservas, fechaSeleccionada])


  const onDelete = (id_reserva: number) => {
    mutateDelete(id_reserva)
  }

  const handleRestriction = (reserva) => {
    const today = new Date()
    const tomorrow = new Date(today)
    const yesterday = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    yesterday.setDate(yesterday.getDate() - 1)
    const limitHour = new Date(today)
    limitHour.setHours(18, 0, 0, 0)
    const selectedMenu = reservas && reserva ? reserva.idMenu : 0

    if (convertDate(today) === fechaSeleccionada || convertDate(yesterday) === fechaSeleccionada) {
      if (selectedMenu != 0) { // existe un menu
        const menu = reservas?.find(reserva => reserva.idMenu === selectedMenu)
        // 2: pedido reservado, 15: pedido realizado, 3: pedido retirado, 4: pedido cancelado
        if (menu != null) {
          switch (menu.estado) {
            case 2: // pedido reservado
              setRestriccion('')
              setActionButton('pedir')
              break;
            case 15: // pedido realizado
              setRestriccion(RESPONSE_MESSAGES.ALREADY_ORDERED.message)
              setActionButton('retirar')
              break;
            case 3: // pedido retirado
              setRestriccion('')
              setActionButton('calificar')
              break;
            case 4: // pedido cancelado
              setRestriccion(RESPONSE_MESSAGES.ALREADY_CANCELED.message)
              setActionButton('nada')
              break;
            default:
              break;

          }
        }


      } else { // no existe un menu
        setRestriccion(RESPONSE_MESSAGES.TODAY_NO_RESERVATION.message)
      }

    } else if (convertDate(tomorrow) === fechaSeleccionada) { // es para mañana
      if (today > limitHour) { // es despues de las 18 hs
        setRestriccion(RESPONSE_MESSAGES.TOMORROW_TOO_LATE.message)
      } else { // es antes de las 18 hs
        setRestriccion('')
        setActionButton('reservar')
      }
    } else { // es para otro dia
      setRestriccion('')
      setActionButton('reservar')
    }
  }

  const handleSetReserva = (reservas: IMenuPersonal[], date: string) => {
    if (reservas) {
      const reserva = reservas.find(reserva => reserva.start.substring(0, 10) === convertDate(date))
      if (reserva != null) {
        setValue('form_turno', reserva.turno)
        setValue('form_menu', reserva.idMenu.toString())
        setSelectedTurno(reserva.turno)
        setSelectedMenu(reserva.idMenu)
        setReserva(reserva)
      } else {
        setValue('form_turno', '')
        setValue('form_menu', '')
        setSelectedMenu(0)
        setSelectedTurno('')
        setReserva(null)
      }
      return reserva
    }
    return null
  }

  const handleDateChange = (date) => {
    setFechaSeleccionada(convertDate(date))
      ; (reservas != null) && handleSetReserva(reservas, convertDate(date))
    setValue('form_fecha', convertDate(date))
  }

  if (lodingMenus) return <div>Loading Menus...</div>
  if (lodingReservas) return <div>Loading Reservas...</div>

  let menuDelDia: IMenu | undefined
  if (menus != null) {
    addMenus(menus)
    menuDelDia = menus.find(menu => menu.fecha_menu.substring(0, 10) === fechaSeleccionada)
  }

  const onSubmit: SubmitHandler<IFormPedido> = (data: IFormPedido) => {
    setTimeout(() => {
      ReservarPedido(data)
    }, 500)
  }

  const realizarPedido = ({ idCalendarioMenu, idPedido }) => {
    RealizarPedido({ idCalendarioMenu, idPedido })
    window.location.reload()
  }

  const retirarPedido = ({ idCalendarioMenu, idPedido }) => {
    RetirarPedido({ idCalendarioMenu, idPedido })
    window.location.reload()
  }

  const cancelarPedido = (userMenu: {
    id: number;
    idPedido: number;
  }) => {
    setUserMenuToCancel(userMenu);
    setOpenConfirmDialog(true);
  };

  const cancelPedido = (cancelReason: string) => {
    if (!userMenuToCancel) return;
    mutateCancel({
      idCalendarioMenu: userMenuToCancel.id,
      idPedido: userMenuToCancel.idPedido,
      motivo: cancelReason,
    });
    setOpenConfirmDialog(false);
  };

  const calificarPedido = (rating: number, feedback: string) => {
    
    const dataResponse = CalificarPedido({
      idCalendarioMenu: reserva?.idCalendarioMenu,
      idPedido: reserva?.idPedido,
      rating: rating,
      feedback: feedback
    })

    setOpen(false);
  }

  const renderButtons = (
    action: string,
    restriccion: string,
    cancelarPedido: Function,
    retirarPedido: Function,
    realizarPedido: Function,
    mostrarComponenteDeCalificacion: Function
  ) => {
    if (restriccion !== '') {
      if (action === 'retirar') {
        return (
          <>
            <Button type='button' color='warning' variant='contained' onClick={() => cancelarPedido(
              { idCalendarioMenu: reserva?.idCalendarioMenu, idPedido: reserva?.idPedido }
            )}>Cancelar</Button>
            <Button sx={{ marginLeft: 2 }} type='button' color='primary' variant='contained' onClick={() => retirarPedido(
              { idCalendarioMenu: reserva?.idCalendarioMenu, idPedido: reserva?.idPedido }
            )}>Retirar</Button>
          </>
        );
      }
    } else {
      switch (action) {
        case 'reservar':
          return <ActionButton isDisabled={false} type='submit' name='Reservar' />;
        case 'retirar':
          return <Box mt={2} sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
            backgroundColor: 'transparent',
            width: '100%',

          }}>
            <Button type='button' color='warning' variant='contained' onClick={
              () => reserva && cancelarPedido({ id: reserva.idCalendarioMenu, idPedido: reserva.idPedido })
            }>Cancelar</Button>
            <Button sx={{ marginLeft: 2 }} type='button' color='primary' variant='contained' onClick={
              () => retirarPedido({ idCalendarioMenu: reserva?.idCalendarioMenu, idPedido: reserva?.idPedido })
            }>Retirar</Button>
          </Box>
        case 'pedir':
          return (
            <Box mt={2} sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'right',
              backgroundColor: 'transparent',
              width: '100%',

            }}><Button
              type='button'
              variant="contained"
              color='error'
              onClick={() => realizarPedido({ idCalendarioMenu: reserva?.idCalendarioMenu, idPedido: reserva?.idPedido })}
              className={classes.pulsate}
            >Realizar Pedido</Button>
            </Box>
          );
        case 'calificar':
          return (
            <Button
              type='button'
              variant='outlined'
              color='secondary'
              startIcon={<StarIcon />}
              onClick={() => mostrarComponenteDeCalificacion()}>
              CALIFICA TU PEDIDO
            </Button>
          );
        default:
          return null;
      }
    }
  }

  return (
    <>
      <ContainerApp>

        <Box border={0} borderColor='primary.main' borderRadius={2} sx={{ width: '100%' }}>
          <HorizontalLinearStepper />
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type={'hidden'} {...register('form_fecha')} value={fechaSeleccionada} />
            <input type={'hidden'} {...register('idUsuarios')} value={profile?.idUsuarios || ''} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3} >
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6} md={12} >
                    <Calendar
                      onDateChange={handleDateChange}
                      fechaSeleccionada={fechaSeleccionada}
                      reservas={reservas}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={12} >
                    <input type={'hidden'} name='action' />
                    <Turno
                      name="form_turno"
                      register={register}
                      fechaSeleccionada={fechaSeleccionada}
                      selectedTurno={selectedTurno}
                      errors={errors.form_turno?.message || ''}
                    />
                  </Grid>
                </Grid>

              </Grid>
              {
                (menuDelDia != null)
                  ? (
                    <>
                      <Grid item xs={12} sm={12} md={7} >
                        <Box m={1} paddingLeft={4}>
                          <MenuDelDia
                            name="form_menu"
                            register={register}
                            watch={watch}
                            control={control}
                            fechaSeleccionada={fechaSeleccionada}
                            selectedMenu={selectedMenu}
                            errors={errors.form_menu?.message || ''}
                            reserva={reserva}
                          />
                          <Divider sx={{ marginTop: 5 }} />
                          <Snackbar open={isSubmitting} message="Guardando..." />
                          <Box mt={5} pr={5}>
                            {
                              <>
                                {restriccion !== '' && (
                                  <Alert severity="info">
                                    <AlertTitle>¡Hola!</AlertTitle>
                                    {restriccion}
                                  </Alert>)}
                                <Box mt={2} sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'right',
                                  backgroundColor: 'transparent',
                                  width: '100%',
                                }}>
                                  {renderButtons(actionButton, restriccion, cancelarPedido, retirarPedido, realizarPedido, mostrarComponenteDeCalificacion)}
                                </Box>
                              </>
                            }
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} >
                        <Box mt={2} >
                          {
                            (reserva != null)
                              ? (
                                <MiReserva
                                  description={reserva?.title}
                                  date={reserva?.start}
                                  estado={reserva?.estado}
                                  onDelete={onDelete}
                                  id={reserva?.idCalendarioMenu}
                                  isRestricted={restriccion !== '' || actionButton === 'pedir'}
                                />
                              )
                              : (
                                <Alert severity="warning">
                                  <AlertTitle>Atención</AlertTitle>
                                  No se ha realizado ninguna reserva de menú para el día <b>{formatDate(fechaSeleccionada, 'larga')}</b>
                                </Alert>
                              )
                          }

                        </Box>
                      </Grid>
                    </>

                  )
                  : (<>

                    <Grid item xs={6} sm={12} md={6} >
                      <Box m={1} paddingLeft={2}>
                        <Alert severity="info" variant='outlined'>
                          <AlertTitle>Lo sentimos!</AlertTitle>
                          No hay menus disponibles para el día de hoy. Por favor, <b>pruebe con otra fecha</b>.
                        </Alert>
                      </Box>
                    </Grid>

                  </>)

              }

            </Grid>
            {
              openSuccess && (
                <SnackbarApp
                  open={openSuccess}
                  message={RESPONSE_MESSAGES.MENU_RESERVED.message}
                  type={RESPONSE_MESSAGES.MENU_RESERVED.type}
                  variant='outlined'
                />
              )
            }
            {
              openSuccessCalification && (
                <SnackbarApp
                  open={openSuccessCalification}
                  message={RESPONSE_MESSAGES.MENU_CALIFICADO.message}
                  type={RESPONSE_MESSAGES.MENU_CALIFICADO.type}
                  variant='outlined'
                />
              )
            }
            {
              openDeleteSuccess && (
                <SnackbarApp
                  open={openDeleteSuccess}
                  message={RESPONSE_MESSAGES.MENU_DELETED.message}
                  type={RESPONSE_MESSAGES.MENU_DELETED.type}
                  variant='outlined'
                />
              )

            }
            {
              Object.keys(errors).length > 0 && (
                <SnackbarApp
                  open={true}
                  message={RESPONSE_MESSAGES.FORM_ERROR.message}
                  type={RESPONSE_MESSAGES.FORM_ERROR.type}
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

      <DialogCancel
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}
        cancelPedido={cancelPedido}
      />

      <RatingComponent 
        open={open}
        onClose={cerrarComponenteDeCalificacion} 
        calificar={calificarPedido} 
        reserva={reserva}     
        />
    
    </>


  )
}

export default PedidosPage
