// material
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
// component
import authApi from '../../../api/authApi';
import { onOpenNotification } from '../../../utils/notificationService';

// ----------------------------------------------------------------------

ChangePassword.protoTypes = {
  user: PropTypes.object,
};

export default function ChangePassword() {
  const LoginSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Vui lòng điền mật khẩu cũ!'),
    newPassword: Yup.string().required('Vui lòng điền mật khẩu mới!'),
  });
  const { user } = useSelector((state) => state.user);
  const [showError, setShowError] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        const data = {
          ...formik.values,
          id: user._id,
        };
        await authApi.changePassword(data);
        setShowError(false);
        onOpenNotification('Cập nhật mật khẩu thành công!');
      } catch ({ response }) {
        setShowError(true);
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <div className="p-8 rounded shadow-xl">
            <div className="flex w-full">
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu cũ*"
                {...getFieldProps('currentPassword')}
                error={Boolean(touched.currentPassword && errors.currentPassword)}
                helperText={touched.currentPassword && errors.currentPassword}
                className="w-1/2 mr-6"
                autoComplete={false}
              />
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu mới*"
                {...getFieldProps('newPassword')}
                error={Boolean(touched.newPassword && errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                className="w-1/2 ml-6"
                autoComplete={false}
              />
            </div>
            {showError && <p className="mt-2 text-red-500">Mật khẫu cũ không chính xác!</p>}
            <div className="flex items-center justify-center mt-8">
              <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} className="px-20">
                Thay đổi
              </LoadingButton>
            </div>
          </div>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
