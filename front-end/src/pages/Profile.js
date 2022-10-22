import { Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userApi from '../api/userApi';
import Page from '../components/Page';
import ProfileForm from '../sections/@dashboard/profile/ProfileForm';
import MyTask from '../sections/@dashboard/profile/MyTask';
import ChangePassword from '../sections/@dashboard/profile/ChangePassword';

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const isEditUser = !!id;
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await userApi.getByID(id);
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (isEditUser) {
      getUser();
    }
  }, [isEditUser, id]);
  return (
    <Page title="Thông Tin Cá Nhân">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Thông Tin Cá Nhân
          </Typography>
        </Stack>
        {!isEditUser || (isEditUser && user) ? <ProfileForm user={user} /> : <p>Loading...</p>}

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
