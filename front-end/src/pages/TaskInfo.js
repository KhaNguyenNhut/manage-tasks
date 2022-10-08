import { Avatar, Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../components/Page';
import taskApi from '../api/taskApi';
import Iconify from '../components/Iconify';
import StatusDrop from '../components/task/StatusDrop';

function TaskInfo() {
  const { id } = useParams();
  const [task, setTask] = useState();

  useEffect(() => {
    const getInfo = async () => {
      const response = await taskApi.getByID(id);
      setTask(response);
    };

    getInfo();
  }, [id]);

  const onUpdateTask = async (status) => {
    const newTask = { ...task };
    newTask.status = status;
    await taskApi.update(newTask, newTask._id);
  };

  return (
    <Page title="Thông Tin Cá Nhân">
      <Container>
        {task && (
          <div className="bg-white p-8 shadow-xl rounded-2xl">
            <p className="mb-8 text-2xl font-bold text-center">THÔNG TIN CÔNG VIỆC</p>
            <div className="flex">
              <div className="w-8/12 pr-2 mr-2">
                <Typography id="modal-modal-title" variant="h6" component="h2" className="text-2xl">
                  {task.topic}
                </Typography>
                <p className="mt-4">
                  Loại công việc: <span className="font-semibold">{task.taskType.name}</span>
                </p>
                <Button
                  variant="outlined"
                  className="mt-4"
                  to="/dashboard/add-new-user"
                  startIcon={<Iconify icon="eva:checkmark-square-2-outline" />}
                >
                  Tạo nhiệm vụ
                </Button>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'div'}>
                  <p className="font-semibold">Nội dung</p>
                  <p>{task.content}</p>
                  <p className="mt-8 font-semibold">Ghi chú</p>
                  <p>{task.note}</p>
                </Typography>
              </div>
              <div className="w-4/12 p-4 ml-2 rounded-xl shadow-2xl bg-white">
                <div className="flex items-center justify-between mb-6">
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Chi Tiết
                  </Typography>
                  <StatusDrop status={task.status} onUpdateTaskStatus={onUpdateTask} />
                </div>

                <div className="flex items-center">
                  <p className="w-1/2 text-sm font-bold text-gray-500">Người thực hiện: </p>
                  <div className="flex items-center">
                    <Avatar
                      alt={task.user.fullName}
                      src={task.user.avatar ? process.env.REACT_APP_URL_IMG + task.user.avatar : ''}
                    />
                    <span className="inline-block ml-2">{task.user.fullName}</span>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <p className="w-1/2 text-sm font-bold text-gray-500">Người giám sát: </p>
                  <div className="flex items-center">
                    <Avatar
                      alt={task.supervisor.fullName}
                      src={task.supervisor.avatar ? process.env.REACT_APP_URL_IMG + task.supervisor.avatar : ''}
                    />
                    <span className="inline-block ml-4">{task.supervisor.fullName}</span>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <p className="w-1/2 text-sm font-bold text-gray-500">Giờ G: </p>
                  <span className="inline-block px-2 py-1 ml-2 text-sm bg-gray-200 rounded-lg">{task.timeG}</span>
                </div>
                <div className="flex items-center mt-3 ">
                  <p className="w-1/2 text-sm font-bold text-gray-500">Ngày bắt đầu: </p>
                  <span className="inline-block ml-2">{task.startDate.slice(0, 10)}</span>
                </div>
                <div className="flex items-center mt-3 ">
                  <p className="w-1/2 text-sm font-bold text-gray-500">Ngày kết thúc: </p>
                  <span className="inline-block ml-2">{task.endDate.slice(0, 10)}</span>
                </div>
                <div className="flex items-center mt-3 ">
                  <p className="w-1/2 text-sm font-bold text-gray-500">Ước tính: </p>
                  <span className="inline-block px-2 py-1 ml-2 text-sm bg-gray-200 rounded-lg">
                    {Math.floor((Date.parse(task.endDate) - Date.parse(task.startDate)) / 86400000) + 1} ngày
                  </span>
                </div>
                <p className="mt-4 text-sm font-thin text-gray-500">
                  Ngày tạo công việc: {task.createdAt.slice(0, 10)}
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Page>
  );
}

export default TaskInfo;
