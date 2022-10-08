import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function ListComment({ comments }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {comments &&
        comments.map((each) => (
          <div key={each._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={each.user.avatar ? process.env.REACT_APP_URL_IMG + each.user.avatar : ''}
                />
              </ListItemAvatar>
              <div>
                <p className="font-bold">
                  {each.user.fullName}{' '}
                  <span className="font-thin text-gray-600 text-sm ml-2">{dayjs(each.createdAt).fromNow()}</span>
                </p>
                <p className="font-thin text-[#333]">{each.content}</p>
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
    </List>
  );
}
