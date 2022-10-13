import { Avatar, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import discussionApi from '../../api/discussionApi';
import ListComment from './ListComment';

function Comment({ isSubtask }) {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [commentValue, setCommentValue] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getDate = async () => {
      if (isSubtask) {
        const response = await discussionApi.getTaskBySubtask(id);
        setComments(response || []);
      } else {
        const response = await discussionApi.getTaskByTask(id);
        setComments(response || []);
      }
    };

    getDate();
  }, [id, isSubtask]);

  const handleComment = async () => {
    if (commentValue) {
      const data = {
        user: currentUser._id,
        task: id,
        subtask: id,
        content: commentValue,
      };
      if (isSubtask) {
        delete data.task;
      } else {
        delete data.subtask;
      }
      const response = await discussionApi.add(data);
      response.user = currentUser;
      setComments([response, ...comments]);
      setCommentValue('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === '@') {
      console.log('do validate');
    }
  };

  const onDeleteComment = async (id) => {
    const newComments = comments.filter((each) => each._id !== id);
    setComments(newComments);
    await discussionApi.delete(id);
  };

  return (
    <div>
      <div className="flex mt-4">
        <Avatar
          alt={currentUser.fullName}
          src={currentUser.avatar ? process.env.REACT_APP_URL_IMG + currentUser.avatar : ''}
        />
        <div className="w-full ml-4">
          <TextField
            fullWidth
            type="text"
            label="Bình luận"
            multiline
            rows={4}
            value={commentValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <div className="flex justify-end w-full mt-2">
            <Button variant="contained" onClick={handleComment}>
              Comment
            </Button>
          </div>
        </div>
      </div>
      <ListComment comments={comments} onDeleteComment={onDeleteComment} />
    </div>
  );
}

export default Comment;
