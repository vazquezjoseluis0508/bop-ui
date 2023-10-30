import { TableCell, TableContainer, Table, TableHead, TableRow, TableBody, Paper, Rating } from "@mui/material"
import { IMenuPersonal } from "../hook/types"
import dayjs from "dayjs"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';


interface props {
    reservas: IMenuPersonal[] | undefined
}

export const HistoryTable = ({ reservas }: props) => {


    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 540, 
                    '&::-webkit-scrollbar': { width: '20px' }, 
                    '&::-webkit-scrollbar-track': { background: '#f1f1f1' }, 
                    '&::-webkit-scrollbar-thumb': { background: '#888' }, 
                    '&::-webkit-scrollbar-thumb:hover': { background: '#555' } }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Fecha</TableCell>
                                <TableCell align="center">Menu</TableCell>
                                <TableCell align="center">Estado</TableCell>
                                <TableCell align="center">Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {reservas?.map((reserva, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">
                                        {dayjs(reserva.start).format('DD/MM/YYYY')}
                                    </TableCell>
                                    <TableCell align="center">
                                        {reserva.title}
                                    </TableCell>
                                    <TableCell align="center">
                                        {reserva.estado === 2 && <span style={{ display: 'flex', alignItems: 'center', color: 'skyblue', justifyContent: 'center' }}><EventAvailableIcon /> Reservado</span>}
                                        {reserva.estado === 3 && <span style={{ display: 'flex', alignItems: 'center', color: 'green', justifyContent: 'center' }}><CheckCircleOutlineIcon /> Retirado</span>}
                                        {reserva.estado === 4 && <span style={{ display: 'flex', alignItems: 'center', color: 'red', justifyContent: 'center' }}><CancelOutlinedIcon /> Cancelado</span>}
                                        {reserva.estado === 15 && <span style={{ display: 'flex', alignItems: 'center', color: 'orange', justifyContent: 'center' }}><EventBusyIcon /> Realizado</span>}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Rating name="read-only" value={reserva.rating} readOnly />
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>

                </TableContainer>
            </Paper>
        </>
    )
}
