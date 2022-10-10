import { noCase } from 'change-case';
import { useEffect, useRef, useState } from 'react';
// @mui
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
// utils
import { fToNow } from '../../utils/formatTime';
// components
import notificationApi from '../../api/notificationApi';
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';
import Scrollbar from '../../components/Scrollbar';
// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const totalUnRead = notifications.filter((item) => item.isRead === false).length;
  const [open, setOpen] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const readNotification = notifications.filter((each) => each.isRead === true);
  const unreadNotification = notifications.filter((each) => each.isRead === false);
  useEffect(() => {
    const getData = async () => {
      const response = await notificationApi.getByUser(currentUser._id);
      console.log(response);
      setNotifications(response);
    };

    getData();
  }, [currentUser._id]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 550, p: 0, mt: 1.5, ml: 0.75 }}
        className="overflow-auto max-h-[550px]"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {unreadNotification.map((notification) => (
              <NotificationItem key={notification._id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {readNotification.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

function NotificationItem({ notification }) {
  const { avatar, title, link } = renderContent(notification);

  return (
    <ListItemButton
      component={Link}
      to={link}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  if (notification.notifyType === 'UpdateSubtask') {
    return {
      link: `/dashboard/subtask-info/${notification.subtask._id}`,
      avatar: <img alt="notification" src="/static/icons/ic_notification_package.svg" />,
      title: (
        <Typography variant="subtitle2">
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            &nbsp; Nhiệm vụ <span className="font-bold">{notification.subtask.topic}</span> đã được cập nhật thông tin!
          </Typography>
        </Typography>
      ),
    };
  }

  if (notification.notifyType === 'CreateSubtask') {
    return {
      link: `/dashboard/subtask-info/${notification.subtask._id}`,
      avatar: <img alt="notification" src="/static/icons/ic_notification_package.svg" />,
      title: (
        <Typography variant="subtitle2">
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            &nbsp; Bạn được phân công làm nhiệm vụ <span className="font-bold">{notification.subtask.topic}</span>!
          </Typography>
        </Typography>
      ),
    };
  }

  if (notification.notifyType === 'UpdateTask') {
    return {
      link: `/dashboard/task-info/${notification.task._id}`,
      avatar: <img alt="notification" src="/static/icons/ic_notification_package.svg" />,
      title: (
        <Typography variant="subtitle2">
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            &nbsp; Công việc <span className="font-bold">{notification.task.topic}</span> đã được cập nhật thông tin!
          </Typography>
        </Typography>
      ),
    };
  }

  if (notification.notifyType === 'CreateTask') {
    return {
      link: `/dashboard/task-info/${notification.task._id}`,
      avatar: <img alt="notification" src="/static/icons/ic_notification_package.svg" />,
      title: (
        <Typography variant="subtitle2">
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            &nbsp; Bạn được phân công làm công việc <span className="font-bold">{notification.task.topic}</span>!
          </Typography>
        </Typography>
      ),
    };
  }

  if (notification.notifyType === 'Comment') {
    return {
      link: `/dashboard/${notification.task ? 'task-info' : 'subtask-info'}/${
        notification.task ? notification.task._id : notification.subtask._id
      }`,
      avatar: <img alt="notification" src="/static/icons/ic_notification_package.svg" />,
      title: (
        <Typography variant="subtitle2">
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            &nbsp; Đã có người bình luận lên {notification.task ? 'công việc' : 'nhiệm vụ'} này!
          </Typography>
        </Typography>
      ),
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title: (
      <Typography variant="subtitle2">
        <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp; {noCase('notification.description')}
        </Typography>
      </Typography>
    ),
  };
}
