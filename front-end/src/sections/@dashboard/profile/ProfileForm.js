import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
// material
import { DesktopDatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
// component
import roleApi from '../../../api/roleApi';
import userApi from '../../../api/userApi';
import UploadImg from '../user/UploadImg';
import { updateUser } from '../../../store/slices/userSlice';

// ----------------------------------------------------------------------

export default function ProfileForm() {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [roles, setRoles] = useState([]);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [birthday, setBirthday] = useState(
    dayjs(currentUser && currentUser.birthday ? currentUser.birthday : '2000-08-18')
  );

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    try {
      const response = await roleApi.getRoles();
      setRoles(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (newBirthday) => {
    setBirthday(newBirthday);
  };

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const LoginSchema = Yup.object().shape({
    fullName: Yup.string().required('Họ và tên không thể để trống!'),
    username: Yup.string().required('Username không thể để trống'),
    email: Yup.string().required('Email không thể để trống'),
    phoneNumber: Yup.string().required('Số điện thoại không thể để trống'),
    officerCode: Yup.string().required('Mã cán bộ không thể để trống'),
    role: Yup.string().required('Vai trò không thể để trống'),
  });

  const formik = useFormik({
    initialValues: {
      avatar: currentUser ? currentUser.avatar : '',
      fullName: currentUser ? currentUser.fullName : '',
      username: currentUser ? currentUser.username : '',
      password: '',
      email: currentUser ? currentUser.email : '',
      phoneNumber: currentUser ? currentUser.phoneNumber : '',
      officerCode: currentUser ? currentUser.officerCode : '',
      birthday: currentUser ? currentUser.birthday : '',
      role: currentUser && currentUser.role ? currentUser.role._id : '',
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        if (images.length > 0) {
          const formData = new FormData();
          formData.append('files', images[0].file);
          formik.values.avatar = images[0].file.name;
          await userApi.uploadImg(formData);
        }
        formik.values.birthday = birthday;
        const response = await userApi.update(formik.values, currentUser._id);
        localStorage.setItem('user', JSON.stringify(response));
        setCurrentUser(response);
        dispatch(updateUser(response));
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
            <div className="w-4/12">
              <UploadImg onChange={onChange} images={images} user={currentUser} />
            </div>
            <div className="w-8/12 ml-6">
              <div className="flex mb-4">
                <div className="w-full">
                  <TextField
                    fullWidth
                    type="text"
                    label="Họ và Tên*"
                    {...getFieldProps('fullName')}
                    error={Boolean(touched.fullName && errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                  <TextField
                    fullWidth
                    type="email"
                    label="Email*"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <TextField
                    fullWidth
                    type="text"
                    label="Username*"
                    {...getFieldProps('username')}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                  <TextField
                    fullWidth
                    type="text"
                    label="Số Điện Thoại*"
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <TextField
                    fullWidth
                    type="text"
                    label="Mã Cán Bộ*"
                    {...getFieldProps('officerCode')}
                    error={Boolean(touched.officerCode && errors.officerCode)}
                    helperText={touched.officerCode && errors.officerCode}
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Ngày Sinh"
                        inputFormat="MM/DD/YYYY"
                        value={birthday}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <div className="w-1/2 pl-2">
                  {roles.length > 0 && (
                    <FormControl className="w-full" error={Boolean(touched.role && errors.role)}>
                      <InputLabel>Role</InputLabel>
                      <Select label="Role" {...getFieldProps('role')} error={Boolean(touched.role && errors.role)}>
                        {roles.map((each) => (
                          <MenuItem key={each.id} value={each.id}>
                            {each.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {Boolean(touched.role && errors.role) && <FormHelperText>Vui lòng chọn vai trò !</FormHelperText>}
                    </FormControl>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center mt-8">
                <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} className="px-20">
                  Cập Nhật
                </LoadingButton>
              </div>
            </div>
          </div>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
