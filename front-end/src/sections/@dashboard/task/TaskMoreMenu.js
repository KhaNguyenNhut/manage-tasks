import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
// component
import Iconify from '../../../components/Iconify';
import taskApi from '../../../api/taskApi';

// ----------------------------------------------------------------------

export default function TaskMoreMenu({ id, handleDeleteTask, handleOpenTaskModal }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const onDeleteTask = async () => {
    await taskApi.delete(id);
    handleDeleteTask(id);
  };

  const onOpenTaskModal = () => {
    handleOpenTaskModal(id);
    setIsOpen(false);
  };
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
        <MenuItem onClick={() => onOpenTaskModal(id)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:eye-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Xem chi tiết" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem component={RouterLink} to={`/dashboard/edit-task/${id}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Chỉnh sửa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }} onClick={onDeleteTask}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Xóa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

TaskMoreMenu.propTypes = {
  id: PropTypes.string,
  handleDeleteTask: PropTypes.func,
};
