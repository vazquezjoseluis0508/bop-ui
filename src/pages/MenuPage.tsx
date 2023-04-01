import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import TableContainer from '@material-ui/core/TableContainer';
// import Table from '@material-ui/core/Table';
// import TableHead from '@material-ui/core/TableHead';
// import TableBody from '@material-ui/core/TableBody';
// import TableRow from '@material-ui/core/TableRow';
// import TableCell from '@material-ui/core/TableCell';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Autocomplete from '@material-ui/core/Autocomplete';
// import Button from '@material-ui/core/Button';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, Box, createTheme, CssBaseline, TextField } from '@mui/material';
import { ContainerApp } from '../components/container';
// import { Theme } from '@mui/material';

const menus = [
     'Caesar con pollo' ,
     'Hamburguesa tinto y soda con papas fritas' ,
     'Sandwich de milanesa con queso' ,
     'Atún, arroz, verdes, zanahoria, huevo y cherry' ,
     'Bife de chorizo con ensalada' ,
     'Pebete de jamón cocido y queso' ,
     'Verdes, tomate, zanahoria, huevo y calabaza asada' ,
     'Pechuga al limón con papas noisette' ,
     'Ravioles de verdura con salsa bolognesa' ,
     'Sandwich de bondiola a la parrilla' ,
     'Capresse con jamón cocido y mix de verdes' ,
     'Costillitas de cerdo a la parrilla con papas cuña' ,
     'Sandwich de suprema de pollo' ,
     'Pasta, aceitunas, cherry, huevo, queso y jamón' ,
     'Lechuga, tomate, zanahoria y huevo' ,
     'Tarta de jamón y queso con ensalada de verdes, huevo y cherry' ,
     'Empanadas de carne (3)' ,
     'Pollo al horno con ensalada rusa' ,
     'Bifes de costilla con arroz cremoso' ,
     'Carré de cerdo al verdeo con papas noisette' ,
     'Sorrentinos jamón y mozzarella con salsa rosa' ,
     'Arroz con pollo a la valenciana' ,
     'Hamburguesa con jamón, queso y huevo, papas fritas' ,
     'Pizza margarita con cebolla caramelizada' ,
     'Bondiola al limón con papas fritas' ,
     'Pollo a la parrilla con espinacas a la crema' ,
     'Bifecitos de cuadril con ensalada de papa y huevo' ,
     'Penne rigatti con salsa carbonara' ,
     'Milanesas de ternera con arroz primavera' ,
]
    

const menuTypes = [
    'Vegetariano',
    'Coordinadores y Referentes',
    'Jefatura y Gerencia',
    'Desayuno',
    'Celiaco',
];


// const useStyles: any = makeStyles((theme: Theme) =>
//     createStyles({
//         tableContainer: {
//             maxHeight: '60vh',
//         },
//         table: {
//             minWidth: 650,
//         },
//         inputCell: {
//             padding: 0,
//             '& > *': {
//                 margin: theme.spacing(1),
//             },
//         },
//         menuTypeCell: {
//             width: 120,
//         },
//         addButtonCell: {
//             width: 50,
//         },
//         lastRecordButton: {
//             position: 'fixed',
//             bottom: theme.spacing(2),
//             left: theme.spacing(2),
//             marginTop: theme.spacing(3),
//         },
//     })
// );


type Record = {
    date: string;
    menu: string;
    option1?: string;
    option2?: string;
    option3?: string;
    menuType: string;
};


const MenuPage = () => {

    // const classes = useStyles();
    const [records, setRecords] = useState<Record[]>([]);

    const handleAddRecord = () => {
        const today = new Date().toISOString().substring(0, 10);
        const newRecord: Record = {
            date: today,
            menu: '',
            menuType: '',
        };
        setRecords([...records, newRecord]);
    };

    const handleDateChange = (recordIndex: number, newValue: string) => {
        const newRecords = [...records];
        newRecords[recordIndex].date = newValue;
        setRecords(newRecords);
    };


    const handleMenuChange = (recordIndex: number, newValue: string ) => {
        const newRecords = [...records];
        newRecords[recordIndex].menu = newValue;
        setRecords(newRecords);
    };

    const handleOption1Change = (recordIndex: number, newValue: string) => {
        const newRecords = [...records];
        newRecords[recordIndex].option1 = newValue;
        setRecords(newRecords);
    };

    const handleOption2Change = (recordIndex: number, newValue: string) => {
        const newRecords = [...records];
        newRecords[recordIndex].option2 = newValue;
        setRecords(newRecords);
    };

    const handleOption3Change = (recordIndex: number, newValue: string) => {
        const newRecords = [...records];
        newRecords[recordIndex].option3 = newValue;
        setRecords(newRecords);
    };

    const handleMenuTypeChange = (recordIndex: number, newValue: string ) => {
        const newRecords = [...records];
        newRecords[recordIndex].menuType = newValue;
        setRecords(newRecords);
    };

    const handleLastRecordButton = () => {
        const tableContainer = document.getElementById('table-container');
        tableContainer?.scrollTo({
            top
                : tableContainer.scrollHeight, behavior: 'smooth'
        });

        const lastRecordIndex = records.length - 1;
        const lastRecordRow = document.getElementById(`record-${lastRecordIndex}`);
        lastRecordRow?.scrollIntoView({ behavior: 'smooth' });
    };





    return (
        <>

            <ContainerApp>
            <CssBaseline />

                <Box border={0} borderColor='primary.main' p={2} borderRadius={2} sx={{ width: '100%'}}>
                    <TableContainer id="table-container" sx={
                        {
                            maxHeight: '60vh',
                            border: 1,
                            borderRadius: 2,
                            padding: 2,
                        }
                    }>
                        <Table stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Menú</TableCell>
                                    <TableCell>Opción 1</TableCell>
                                    <TableCell>Opción 2</TableCell>
                                    <TableCell>Opción 3</TableCell>
                                    <TableCell>Tipo de menú</TableCell>
                                    <TableCell>
                                        <Button color="primary" variant="contained" onClick={handleAddRecord}>
                                            +
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {records.map((record, index) => (
                                    <TableRow key={index} id={`record-${index}`}>
                                        <TableCell>
                                            <TextField
                                                    size="small"
                                                    value={record.date}
                                                    onChange={(event) => handleDateChange(index, event.target.value)}
                                                    type="date"
                                                />    
                                        </TableCell>
                                        <TableCell sx={
                                            {
                                                padding: 0,
                                                minWidth: 300,
                                                '& > *': {
                                                    margin: 1,
                                                },
                                            }
                                        }>
                                            <Autocomplete
                                                size="small"
                                                options={menus}
                                                value={record.menu}
                                                onChange={(event, newValue) => handleMenuChange(index, newValue || '')}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                size="small"
                                                variant='filled'
                                                value={record.option1}
                                                onChange={(event) => handleOption1Change(index, event.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                size="small"
                                                variant='filled'
                                                value={record.option2}
                                                onChange={(event) => handleOption2Change(index, event.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell sx={
                                            {
                                                padding: 0,
                                                '& > *': {
                                                    margin: 1,
                                                },
                                            }
                                        } >
                                            <TextField
                                                size="small"
                                                variant='filled'
                                                value={record.option3}
                                                onChange={(event) => handleOption3Change(index, event.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <Autocomplete
                                                size="small"
                                                options={menuTypes}
                                                value={record.menuType}
                                                onChange={(event, newValue) => handleMenuTypeChange(index, newValue || '')}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </TableContainer>

                    <Button 
                     variant='contained'
                     sx={{ position: 'inherit', bottom: 2, right: 2, marginTop: 3, marginRight: 2}}
                     onClick={handleLastRecordButton}>
                        <KeyboardArrowDownIcon />
                    </Button>
                </Box>
            </ContainerApp>
        </>

    );

}

export default MenuPage