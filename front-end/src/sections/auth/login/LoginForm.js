import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// material
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
// component
import authApi from '../../../api/authApi';
import Iconify from '../../../components/Iconify';
import { login } from '../../../store/slices/userSlice';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        const data = {
          username: formik.values.username,
          password: formik.values.password,
        };
        const response = await authApi.login(data);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        dispatch(login(response.user));
        navigate('/dashboard/app', { replace: true });
      } catch ({ response }) {
        setShowError(true);
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {showError && <p className="text-red-500">Username or password is wrong !</p>}
          <TextField
            fullWidth
            autoComplete="username"
            type="type"
            label="Username"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} className="mt-8">
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
