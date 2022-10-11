import { Form, FormikProvider, useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
// material
import { DesktopDatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import {
  Avatar,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// component
import subtaskApi from '../../api/subtaskApi';
import taskTypeApi from '../../api/taskTypeApi';
import userApi from '../../api/userApi';
import SocketContext from '../../contexts/SocketContext';

// ----------------------------------------------------------------------

AddSubTaskForm.protoTypes = {
  task: PropTypes.object,
  subtask: PropTypes.object,
};

export default function AddSubTaskForm({ task, subtask }) {
  const navigate = useNavigate();
  const [taskTypes, setTaskTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [startDate, setStartDate] = useState(dayjs(subtask && subtask.startDate ? subtask.startDate : new Date()));
  const [endDate, setEndDate] = useState(dayjs(subtask && subtask.endDate ? subtask.endDate : new Date()));
  const { id, subtaskId } = useParams();
  const isEditTask = !!subtaskId;
  const supervisors = users.filter((each) => each.role.name === 'Admin' || each.role.name === 'Manager');
  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [fieldRecord, setFieldRecord] = useState('');
  const { socket } = useContext(SocketContext);

  const LoginSchema = Yup.object().shape({
    taskType: Yup.string().required('Loại công việc không thể để trống!'),
    user: Yup.string().required('Chọn người thực hiện!'),
    topic: Yup.string().required('Chủ đề không thể để trống!'),
    content: Yup.string().required('Nội dung không thể để trống!'),
    startDate: Yup.string().required('Ngày bắt đầu không thể để trống!'),
    endDate: Yup.string().required('Ngày kết thúc không thể để trống!'),
    timeG: Yup.string().required('Giờ G không thể để trống!'),
    supervisor: Yup.string().required('Chọn người giám sát!'),
  });
  const formik = useFormik({
    initialValues: {
      task: id,
      taskType: isEditTask ? subtask.taskType._id : '',
      user: isEditTask ? subtask.user._id : '',
      topic: isEditTask ? subtask.topic : '',
      content: isEditTask ? subtask.content : '',
      startDate: isEditTask ? subtask.startDate : dayjs(new Date()),
      endDate: isEditTask ? subtask.endDate : dayjs(new Date()),
      status: isEditTask ? subtask.status : 'Đang chờ thực hiện',
      timeG: isEditTask ? subtask.timeG : '',
      supervisor: isEditTask && subtask.supervisor ? subtask.supervisor._id : '',
      note: isEditTask && subtask.note ? subtask.note : '',
      progress: isEditTask && subtask.progress ? subtask.progress : 0,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        formik.values.startDate = startDate;
        if (!isEditTask) {
          const response = await subtaskApi.add(formik.values);
          socket.emit('send_notification', response);
        } else {
          const response = await subtaskApi.update(formik.values, subtask._id);
          socket.emit('send_notification', response);
        }
        if (isEditTask) {
          navigate(`/dashboard/subtask-info/${subtaskId}`, { replace: true });
        } else {
          navigate(`/dashboard/task-info/${id}`, { replace: true });
        }
      } catch ({ response }) {
        // setShowError(true);
      }
    },
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (transcript) {
      setFieldValue(fieldRecord, transcript);
    }
  }, [transcript, fieldRecord, setFieldValue]);

  const getData = async () => {
    try {
      const response = await taskTypeApi.getTaskTypes();
      setTaskTypes(response);
      const responseUsers = await userApi.getAll();
      setUsers(responseUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeStartDate = (date) => {
    setStartDate(date);
    setFieldValue('startDate', date);
  };

  const handleChangeEndDate = (date) => {
    setEndDate(date);
    setFieldValue('endDate', date);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = (field) => {
    SpeechRecognition.startListening({ language: 'vi-VN' });
    setFieldRecord(field);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setFieldRecord();
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack className="p-8 rounded-lg shadow-lg" spacing={3}>
          <Link
            to={`/dashboard/${!isEditTask ? `task-info/${id}` : `subtask-info/${subtaskId}`}`}
            className="duration-300 cursor-pointer hover:text-blue-500 no-underline text-[#333] w-fit"
          >
            <i className="fa-solid fa-chevron-left" /> Quay lại
          </Link>
          <p className="text-2xl font-bold">Công việc: {task.topic}</p>
          <div>
            <TextField
              fullWidth
              type="text"
              label="Chủ Đề*"
              {...getFieldProps('topic')}
              error={Boolean(touched.topic && errors.topic)}
              helperText={touched.topic && errors.topic}
              className="mb-4"
            />
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                {supervisors.length > 0 && (
                  <FormControl className="w-full" error={Boolean(touched.supervisor && errors.supervisor)}>
                    <InputLabel>Người Giám Sát</InputLabel>
                    <Select
                      label="Người Giám Sát"
                      {...getFieldProps('supervisor')}
                      error={Boolean(touched.supervisor && errors.supervisor)}
                    >
                      {supervisors.map((each) => (
                        <MenuItem key={each._id} value={each._id}>
                          <div className="flex items-center">
                            <Avatar
                              alt={each.fullName}
                              src={each.avatar ? process.env.REACT_APP_URL_IMG + each.avatar : ''}
                            />
                            <span className="ml-2">{each.fullName}</span>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                    {Boolean(touched.supervisor && errors.supervisor) && (
                      <FormHelperText>Vui lòng chọn người giám sát!</FormHelperText>
                    )}
                  </FormControl>
                )}
              </div>
              <div className="w-1/2 pl-2">
                {users.length > 0 && (
                  <FormControl className="w-full" error={Boolean(touched.user && errors.user)}>
                    <InputLabel>Người thực hiện</InputLabel>
                    <Select
                      label="Người thực hiện"
                      {...getFieldProps('user')}
                      error={Boolean(touched.user && errors.user)}
                    >
                      {users.map((each) => (
                        <MenuItem key={each._id} value={each._id}>
                          <div className="flex items-center">
                            <Avatar
                              alt={each.fullName}
                              src={each.avatar ? process.env.REACT_APP_URL_IMG + each.avatar : ''}
                            />
                            <span className="ml-2">{each.fullName}</span>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                    {Boolean(touched.user && errors.user) && (
                      <FormHelperText>Vui lòng chọn người thực hiện !</FormHelperText>
                    )}
                  </FormControl>
                )}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                {taskTypes.length > 0 && (
                  <FormControl className="w-full" error={Boolean(touched.taskType && errors.taskType)}>
                    <InputLabel>Loại Công Việc</InputLabel>
                    <Select
                      label="Loại Công Việc"
                      {...getFieldProps('taskType')}
                      error={Boolean(touched.taskType && errors.taskType)}
                    >
                      {taskTypes.map((each) => (
                        <MenuItem key={each._id} value={each._id}>
                          {each.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {Boolean(touched.taskType && errors.taskType) && (
                      <FormHelperText>Vui lòng chọn loại công việc !</FormHelperText>
                    )}
                  </FormControl>
                )}
              </div>
              <div className="w-1/2 pl-2">
                <TextField
                  fullWidth
                  type="number"
                  label="Giờ G*"
                  {...getFieldProps('timeG')}
                  error={Boolean(touched.timeG && errors.timeG)}
                  helperText={touched.timeG && errors.timeG}
                />
              </div>
            </div>
          </div>
          <div className="ml-6 1/2">
            <div className="relative mb-4 min-h-[146px]">
              <TextField
                fullWidth
                type="text"
                label="Nội Dung*"
                {...getFieldProps('content')}
                error={Boolean(touched.content && errors.content)}
                helperText={touched.content && errors.content}
                multiline
                rows={4}
              />
              {listening && fieldRecord === 'content' && <LinearProgress color="success" />}
              <span
                onTouchStart={() => startListening('content')}
                onMouseDown={() => startListening('content')}
                onTouchEnd={stopListening}
                onMouseUp={stopListening}
                className="absolute text-xl duration-300 cursor-pointer right-2 bottom-6 hover:text-green-500"
              >
                <i className="fa-solid fa-microphone" />
              </span>
            </div>
            <div className="relative mb-4 min-h-[146px]">
              <TextField
                fullWidth
                type="text"
                label="Ghi Chú"
                {...getFieldProps('note')}
                error={Boolean(touched.note && errors.note)}
                helperText={touched.note && errors.note}
                multiline
                rows={4}
              />
              {listening && fieldRecord === 'note' && <LinearProgress color="success" />}
              <span
                onTouchStart={() => startListening('note')}
                onMouseDown={() => startListening('note')}
                onTouchEnd={stopListening}
                onMouseUp={stopListening}
                className="absolute text-xl duration-300 cursor-pointer right-2 bottom-6 hover:text-green-500"
              >
                <i className="fa-solid fa-microphone" />
              </span>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Ngày Bắt Đầu"
                      inputFormat="MM/DD/YYYY"
                      value={startDate}
                      onChange={handleChangeStartDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
              <div className="w-1/2 pl-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Ngày Kết Thúc"
                      inputFormat="MM/DD/YYYY"
                      value={endDate}
                      onChange={handleChangeEndDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8">
              <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} className="px-20">
                {isEditTask ? 'Cập Nhật' : 'Tạo'} Nhiệm Vụ
              </LoadingButton>
            </div>
          </div>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
