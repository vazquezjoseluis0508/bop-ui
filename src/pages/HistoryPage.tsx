import { Box } from "@material-ui/core"
import { ContainerApp } from "../components/container"
import { Grid, Typography } from "@mui/material"
import { HistoryTable } from "../components/HistoryTable"
import { useAuthStore } from "../store/auth"
import { useQueryClient } from "@tanstack/react-query"
import { userFetchHistory } from "../hook/usePedidos"
import { useEffect } from "react"

const HistoryPage = () => {
    const profile = useAuthStore(state => state.profile)

    const queryClient = useQueryClient()
    const {
      data: reservas,
      isLoading: lodingReservas
    } = userFetchHistory(profile?.legajo || '')

    useEffect(() => {
        console.log(reservas)
    }, [reservas])


    return (
        <>
        <ContainerApp>

        <Box border={0} borderColor='primary.main' borderRadius={2} sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center', color: 'primary.main' }}>
                    Historial de Pedidos
                </Typography>
            </Box>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12} md={12}>
                    {
                        lodingReservas ? 
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', color: 'primary.main' }}>
                            Cargando historial...
                        </Typography> :  
                            reservas?.length === 0  ? 
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', color: 'primary.main' }}>
                                    No se encontraron pedidos
                                </Typography> : 
                                <HistoryTable reservas={reservas}/>

                    }

                    
                    
                </Grid>
            </Grid>
        </Box>
        </ContainerApp>
        </>
    )
}

export default HistoryPage
