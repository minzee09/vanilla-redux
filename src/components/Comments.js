import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, addComment } from './commentsSlice';

const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  // useSelector 훅을 사용하여 특정 게시물 ID에 해당하는 댓글 상태를 가져옴
  const comments = useSelector((state) => state.comments.commentsByPostId[postId] || []);
  const commentStatus = useSelector((state) => state.comments.status);
  const error = useSelector((state) => state.comments.error);

  // 새로운 댓글의 내용을 저장할 상태를 정의
  const [newComment, setNewComment] = useState('');

  // 컴포넌트가 마운트될 때 fetchComments 액션을 디스패치
  useEffect(() => {
    if (commentStatus === 'idle' && !comments.length) {
      dispatch(fetchComments(postId));
    }
  }, [commentStatus, dispatch, postId, comments.length]);

   // 새로운 댓글을 추가하는 핸들러 함수 (샘플 데이터)
  const handleAddComment = () => {
    const comment = {
      postId,
      body: newComment,
      email: 'test@example.com',
      name: 'New Comment',
    };
    dispatch(addComment(comment));
    setNewComment('');
  };
  
  // 상태에 따라 다른 내용을 렌더링
  let content;

  if (commentStatus === 'loading') {
    content = <div>Loading comments...</div>;
  } else if (commentStatus === 'succeeded') {
    content = comments.map((comment) => (
      <div key={comment.id} className="comment">
        <p>{comment.body}</p>
        <small>by {comment.email}</small>
      </div>
    ));
  } else if (commentStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h4>Comments</h4>
      {content}
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default Comments;
