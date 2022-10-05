import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
// component
import Iconify from '../../../components/Iconify';
import userApi from '../../../api/userApi';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ id, handleDeleteUser }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const onDeleteUser = async () => {
    await userApi.delete(id);
    handleDeleteUser(id);
  };
  const currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {currentUser._id !== id && (
          <MenuItem sx={{ color: 'text.secondary' }} onClick={onDeleteUser}>
            <ListItemIcon>
              <Iconify icon="eva:trash-2-outline" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}
        <MenuItem component={RouterLink} to={`/dashboard/edit-user/${id}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

UserMoreMenu.propTypes = {
  id: PropTypes.string,
  handleDeleteUser: PropTypes.func,
};
