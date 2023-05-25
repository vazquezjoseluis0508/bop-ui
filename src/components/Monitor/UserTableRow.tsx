import React from 'react';
import { TableRow, TableCell, Avatar, Button } from '@mui/material';
import { UserMenu } from '../../hook/types';
import randomColor from 'randomcolor';
import format from 'date-fns/format';
import { addDays, setHours } from 'date-fns';

interface UserTableRowProps {
  user: UserMenu;
  realizarPedido: (userMenu: UserMenu) => void;
  handleCancelClick: (userMenu: UserMenu) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ user, realizarPedido, handleCancelClick }) => {

  const dateInUtc = new Date(user.fecha)
  const dateInLocalTimezone = addDays(dateInUtc, 1)
  const formatDate = format(new Date(dateInLocalTimezone), 'dd/MM/yyyy');

  return (
    <TableRow key={user.id}>
      <TableCell>
        <Avatar sx={{
          backgroundColor: randomColor({ luminosity: 'dark' }),
          color: '#FFF'
        }}>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</Avatar>
      </TableCell>
      <TableCell>
        {user.firstName} {user.lastName} ({user.legajo})
      </TableCell>
      <TableCell>
        {formatDate}
      </TableCell>
      <TableCell>
        {user.pedido}
      </TableCell>
      <TableCell>
        <Button
          sx={{ marginRight: 1 }}
          variant="contained"
          size="small"
          color="primary"
          onClick={() => realizarPedido(user)}
        >
          Retirar Pedido
        </Button>
        <Button
          sx={{ marginLeft: 1 }}
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => handleCancelClick(user)}
        >
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
