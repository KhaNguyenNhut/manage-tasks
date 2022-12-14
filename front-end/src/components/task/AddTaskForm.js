import { Form, FormikProvider, useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import taskApi from '../../api/taskApi';
import taskTypeApi from '../../api/taskTypeApi';
import userApi from '../../api/userApi';
import SocketContext from '../../contexts/SocketContext';
import { onOpenNotification } from '../../utils/notificationService';
import { FIELD_RECORD, getFieldValue, hasExistKeyWord } from '../../utils/voiceRecord';

// ----------------------------------------------------------------------

AddTaskForm.protoTypes = {
  task: PropTypes.object,
};

export default function AddTaskForm({ task }) {
  const navigate = useNavigate();
  const [taskTypes, setTaskTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [startDate, setStartDate] = useState(dayjs(task && task.startDate ? task.startDate : new Date()));
  const [endDate, setEndDate] = useState(dayjs(task && task.endDate ? task.endDate : new Date()));
  const { id } = useParams();
  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const location = useLocation();

  const isEditTask = !!id;
  const supervisors = users.filter((each) => each.role.name === 'Admin' || each.role.name === 'Manager');
  const [fieldRecord, setFieldRecord] = useState('');
  const { socket } = useContext(SocketContext);
  const currentDate = dayjs(new Date());

  // stop listening when change page
  useEffect(() => {
    if (listening) {
      SpeechRecognition.stopListening();
      setFieldRecord();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const LoginSchema = Yup.object().shape({
    taskType: Yup.string().required('Lo???i c??ng vi???c kh??ng th??? ????? tr???ng!'),
    user: Yup.string().required('Ch???n ng?????i th???c hi???n!'),
    topic: Yup.string().required('Ch??? ????? kh??ng th??? ????? tr???ng!'),
    content: Yup.string().required('N???i dung kh??ng th??? ????? tr???ng!'),
    startDate: Yup.string().required('Ng??y b???t ?????u kh??ng th??? ????? tr???ng!'),
    endDate: Yup.string().required('Ng??y k???t th??c kh??ng th??? ????? tr???ng!'),
    timeG: Yup.string().required('Gi??? G kh??ng th??? ????? tr???ng!'),
    supervisor: Yup.string().required('Ch???n ng?????i gi??m s??t!'),
  });
  const formik = useFormik({
    initialValues: {
      taskType: isEditTask ? task.taskType._id : '',
      user: isEditTask ? task.user._id : '',
      topic: isEditTask ? task.topic : '',
      content: isEditTask ? task.content : '',
      startDate: isEditTask ? task.startDate : dayjs(new Date()),
      endDate: isEditTask ? task.endDate : dayjs(new Date()),
      status: isEditTask ? task.status : '??ang ch??? th???c hi???n',
      timeG: isEditTask ? task.timeG : '',
      supervisor: isEditTask && task.supervisor ? task.supervisor._id : '',
      note: isEditTask && task.note ? task.note : '',
      link: isEditTask && task.link ? task.link : '',
      progress: isEditTask && task.progress ? task.progress : 0,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        formik.values.startDate = startDate;
        if (!isEditTask) {
          const response = await taskApi.add(formik.values);
          socket.emit('send_notification', response);
          onOpenNotification('Th??m c??ng vi???c m???i  th??nh c??ng !');
        } else {
          const response = await taskApi.update(formik.values, task._id);
          socket.emit('send_notification', response);
          onOpenNotification('C???p nh???t c??ng vi???c th??nh c??ng !');
        }
        navigate('/dashboard/task', { replace: true });
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
      if (transcript.toLocaleLowerCase().indexOf('ti???p theo') >= 0) {
        resetTranscript();
        setFieldRecord();
      } else {
        const field = hasExistKeyWord(transcript);
        if (field) {
          resetTranscript();
          setFieldRecord(field);
        }

        if (fieldRecord) {
          const { value, isResetFieldRecord } = getFieldValue(fieldRecord, transcript, users, supervisors, taskTypes);
          if (value) {
            setFieldValue(fieldRecord, value);

            // Update value in state of start and end date field
            if ((fieldRecord === FIELD_RECORD.endDate || fieldRecord === FIELD_RECORD.startDate) && value !== ' ') {
              updateStartDateAndEndDate(value);
            }

            if (isResetFieldRecord) {
              setFieldRecord();
            }
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, fieldRecord, setFieldValue, resetTranscript]);

  const updateStartDateAndEndDate = (value) => {
    if (fieldRecord === FIELD_RECORD.endDate) {
      setEndDate(value);
    } else {
      setEndDate(value);
      setStartDate(value);
    }
  };

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
    setEndDate(date);
    setFieldValue('endDate', date);
  };

  const handleChangeEndDate = (date) => {
    setEndDate(date);
    setFieldValue('endDate', date);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => {
    if (!listening) {
      SpeechRecognition.startListening({ language: 'vi-VN', continuous: true });
    } else {
      stopListening();
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setFieldRecord();
  };

  return (
    <FormikProvider value={formik}>
      <div className="z-[999] fixed text-xl duration-300 cursor-pointer right-2 bottom-6 text-white hover:text-green-300 padding-4">
        <span className="rounded-xl px-4 py-2 bg-[#2065d1] flex items-center" onClick={() => startListening()}>
          {!listening ? (
            <i className="mr-2 fa-solid fa-microphone" />
          ) : (
            <i className="mr-2 animate-spin fa-solid fa-spinner" />
          )}
          {!listening ? <span className="text-sm">Th???c hi???n</span> : <span className="text-sm">D???ng...</span>}
        </span>
      </div>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack className="p-8 rounded-lg shadow-lg" spacing={3}>
          <div>
            <div className="mb-4">
              <TextField
                fullWidth
                type="text"
                label="Ch??? ?????*"
                {...getFieldProps('topic')}
                error={Boolean(touched.topic && errors.topic)}
                helperText={touched.topic && errors.topic}
              />
              {listening && fieldRecord === 'topic' && <LinearProgress color="success" />}
            </div>

            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                {supervisors.length > 0 && (
                  <FormControl className="w-full" error={Boolean(touched.supervisor && errors.supervisor)}>
                    <InputLabel>Ng?????i Gi??m S??t</InputLabel>
                    <Select
                      label="Ng?????i Gi??m S??t"
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
                      <FormHelperText>Vui l??ng ch???n ng?????i gi??m s??t!</FormHelperText>
                    )}
                  </FormControl>
                )}
                {listening && fieldRecord === 'supervisor' && <LinearProgress color="success" />}
              </div>
              <div className="w-1/2 pl-2">
                {users.length > 0 && (
                  <FormControl className="w-full" error={Boolean(touched.user && errors.user)}>
                    <InputLabel>Ng?????i th???c hi???n</InputLabel>
                    <Select
                      label="Ng?????i th???c hi???n"
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
                      <FormHelperText>Vui l??ng ch???n ng?????i th???c hi???n !</FormHelperText>
                    )}
                  </FormControl>
                )}
                {listening && fieldRecord === 'user' && <LinearProgress color="success" />}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                {taskTypes.length > 0 && (
                  <FormControl className="w-full" error={Boolean(touched.taskType && errors.taskType)}>
                    <InputLabel>Lo???i C??ng Vi???c</InputLabel>
                    <Select
                      label="Lo???i C??ng Vi???c"
                      {...getFieldProps('taskType')}
                      error={Boolean(touched.taskType && errors.taskType)}
                    >
                      {taskTypes.map((each) => (
                        <MenuItem key={each._id} value={each._id}>
                          {each.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {listening && fieldRecord === 'taskType' && <LinearProgress color="success" />}
                    {Boolean(touched.taskType && errors.taskType) && (
                      <FormHelperText>Vui l??ng ch???n lo???i c??ng vi???c !</FormHelperText>
                    )}
                  </FormControl>
                )}
              </div>
              <div className="w-1/2 pl-2">
                <TextField
                  fullWidth
                  type="number"
                  label="Gi??? G*"
                  {...getFieldProps('timeG')}
                  error={Boolean(touched.timeG && errors.timeG)}
                  helperText={touched.timeG && errors.timeG}
                />
                {listening && fieldRecord === 'timeG' && <LinearProgress color="success" />}
              </div>
            </div>
          </div>
          <div className="ml-6 1/2">
            <div className="relative mb-4 min-h-[146px]">
              <TextField
                fullWidth
                type="text"
                label="N???i Dung*"
                {...getFieldProps('content')}
                error={Boolean(touched.content && errors.content)}
                helperText={touched.content && errors.content}
                multiline
                rows={4}
              />
              {listening && fieldRecord === 'content' && <LinearProgress color="success" />}
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Ng??y B???t ?????u"
                      inputFormat="MM/DD/YYYY"
                      value={startDate}
                      onChange={handleChangeStartDate}
                      minDate={isEditTask ? dayjs(task.startDate) : currentDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
                {listening && fieldRecord === 'startDate' && <LinearProgress color="success" />}
              </div>
              <div className="w-1/2 pl-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Ng??y K???t Th??c"
                      inputFormat="MM/DD/YYYY"
                      value={endDate}
                      minDate={formik.values.startDate}
                      onChange={handleChangeEndDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
                {listening && fieldRecord === 'endDate' && <LinearProgress color="success" />}
              </div>
            </div>
            <div className="mt-8">
              <TextField
                fullWidth
                type="text"
                label="Link ho???t ?????ng"
                {...getFieldProps('link')}
                error={Boolean(touched.link && errors.link)}
                helperText={touched.link && errors.link}
              />
            </div>
            <div className="flex items-center justify-center mt-8">
              <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} className="px-20">
                {isEditTask ? 'C???p Nh???t' : 'T???o'} C??ng Vi???c
              </LoadingButton>
            </div>
          </div>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
