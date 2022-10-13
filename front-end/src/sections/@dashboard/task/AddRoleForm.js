// material
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
// component
import roleApi from '../../../api/roleApi';

// ----------------------------------------------------------------------

AddRoleForm.protoTypes = {
  user: PropTypes.object,
};

export default function AddRoleForm({ role }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditUser = !!id;

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required('Tên vai trò không thể để trống!'),
  });

  const formik = useFormik({
    initialValues: {
      name: isEditUser && role ? role.name : '',
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        if (!isEditUser) {
          await roleApi.addRole(formik.values);
        } else {
          await roleApi.update(formik.values, role._id);
        }
        navigate('/dashboard/role', { replace: true });
      } catch ({ response }) {
        // setShowError(true);
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <div className="flex items-center p-8 rounded shadow-xl">
            <div className="w-8/12 ml-6">
              <div className="pr-2 w-100">
                <TextField
                  fullWidth
                  type="text"
                  label="Tên vai trò*"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </div>
              <div className="flex items-center justify-center mt-8">
                <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} className="px-20">
                  Submit
                </LoadingButton>
              </div>
            </div>
          </div>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
