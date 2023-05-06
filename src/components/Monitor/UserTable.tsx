import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import UserTableRow from './UserTableRow';
import { UserMenu } from '../../hook/types';

interface UserTableProps {
  users: UserMenu[];
  realizarPedido: (userMenu: UserMenu) => void;
  handleCancelClick: (userMenu: UserMenu) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, realizarPedido, handleCancelClick }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Nombre y Legajo</TableCell>
            <TableCell>Día y Turno</TableCell>
            <TableCell>Menú</TableCell>
            <TableCell>...</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              realizarPedido={realizarPedido}
              handleCancelClick={handleCancelClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
