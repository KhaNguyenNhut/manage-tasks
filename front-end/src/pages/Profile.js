import { Container, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Page from '../components/Page';
import ChangePassword from '../sections/@dashboard/profile/ChangePassword';
import MyTask from '../sections/@dashboard/profile/MyTask';
import ProfileForm from '../sections/@dashboard/profile/ProfileForm';

function Profile() {
  const { user } = useSelector((state) => state.user);
  return (
    <Page title="Thông Tin Cá Nhân">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Thông Tin Cá Nhân
          </Typography>
        </Stack>
        {user ? <ProfileForm user={user} /> : <p>Loading...</p>}

        <Typography variant="h4" gutterBottom className="my-8">
          Đổi mật khẩu
        </Typography>
        <ChangePassword />
        <Typography variant="h4" gutterBottom className="my-8">
          Danh Sách Công việc
        </Typography>

        <MyTask />
      </Container>
    </Page>
  );
}

export default Profile;
