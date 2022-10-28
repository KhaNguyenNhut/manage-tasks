import { Card, CardHeader } from '@mui/material';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

LateTask.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function LateTask({ title, subheader, tasks }) {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;

  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user.role._id;
  const userId = user._id;

  const enntaskFunc = (item) => {
    const endDay = item.endDate.slice(8, 10);
    const endMonth = item.endDate.slice(5, 7);
    const userIdItem = item.user._id;
    const late = day - parseInt(endDay, 10);
    if (parseInt(endMonth, 10) === month) {
      if (parseInt(endDay, 10) - day < 1 && userIdItem === userId) {
        return (
          <div className="flex items-center mt-4 whitespace-nowrap text-ellipsis truncate">
            <span className="pl-6 text-red-600">●</span>
            <p className="pl-2 text-red-600">
              {item.topic} đã trễ hẹn {late} ngày
            </p>
          </div>
        );
      }
      if (parseInt(endDay, 10) - day < 3 && userIdItem === userId) {
        return (
          <div className="flex items-center mt-4 whitespace-nowrap text-ellipsis">
            <span className="pl-6 text-orange-600">●</span>
            <p className="pl-2 text-orange-600">{item.topic}</p>
          </div>
        );
      }
      if (userRole === '63393b471a8bf398f0cca454') {
        if (parseInt(endDay, 10) - day < 1) {
          return (
            <div className="flex items-center mt-4 whitespace-nowrap text-ellipsis truncate">
              <span className="pl-6 text-red-600">●</span>
              <p className="pl-2 text-red-600">
                {item.topic} đã trễ hẹn {late} ngày
              </p>
            </div>
          );
        }
        if (parseInt(endDay, 10) - day < 3) {
          return (
            <div className="flex items-center mt-4 whitespace-nowrap text-ellipsis">
              <span className="pl-6 text-orange-600">●</span>
              <p className="pl-2 text-orange-600">{item.topic}</p>
            </div>
          );
        }
      }
    }
  };

  return (
    <Card className="h-full">
      <CardHeader title={title} subheader={subheader} />
      {tasks && tasks.map((item) => enntaskFunc(item))}
    </Card>
  );
}
