import { FormControlLabel, Paper, Switch, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { createPreference } from "../hook/usePreferenciaMenuUsuario";
import { IPreferenciaMenuUsuario } from "../types/preferencia.type";
import { styled } from '@mui/material/styles';

interface IConSal {
    preferencia?: IPreferenciaMenuUsuario
}

export const ConSal = ({ preferencia }: IConSal) => {
    const profile = useAuthStore(state => state.profile)
    const [value, setValue] = useState<number>(preferencia?.sal || 0);



    const { mutate: crearPreferencia } = useMutation({
        mutationFn: createPreference,
        onSuccess: (data) => {
            console.log('Guardado', data)
        },
        onError: (error: any) => {
            console.log('Error: ', error)
        }
    })



    const handleChange = (event) => {
        let conSal
        if (event.target.checked) {
            setValue(1);
            conSal = 1
        } else {
            setValue(0);
            conSal = 0
        }

        crearPreferencia({
            idUsuario: Number(profile?.idUsuarios || ''),
            legajo: Number(profile?.legajo || ''),
            sal: conSal
        })

    }


    const Android12Switch = styled(Switch)(({ theme }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
            borderRadius: 22 / 2,
            '&:before, &:after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
            },
            '&:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                left: 12,
            },
            '&:after': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M19,13H5V11H19V13Z" /></svg>')`,
                right: 12,
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 16,
            height: 16,
            margin: 2,
        },
    }));




    return (
        <>
        <Paper elevation={24} sx={
            {
                maxWidth: 400,
                borderRadius: 5,
                marginLeft: 3,
                fontSize: 9,
            }
        }  >    
            <Box
                padding={0.5}
                marginLeft={3}
                fontSize={9}
            >
                <FormControlLabel
                    checked={value === 1}
                    sx={{
                        fontSize: 9,
                    }
                    }
                    style={{
                        fontSize: 9,
                    }
                    }
                    control={<Android12Switch
                        onChange={handleChange}
                    />}
                    label={
                        <Typography variant="caption"  >
                            Le ponemos Sal ?
                        </Typography>
                    }
                    
                />


            </Box>
            </Paper>
        </>
    )

}