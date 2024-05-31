import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addPost, deletePost } from './postSlice';
import Comments from './Comments';

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  // 컴포넌트가 마운트될 때 fetchPosts 액션을 디스패치
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

   // 새로운 게시물을 추가하는 핸들러 함수
  const handleAddPost = () => {
    const newPost = {
      title: 'New Post',
      body: 'This is the body of the new post.',
      userId: 1,
    };
    dispatch(addPost(newPost)); // addPost 액션을 디스패치
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId)); // deletePost 액션을 디스패치
  };

  // 상태에 따라 다른 내용을 렌더링
  let content;

  if (postStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (postStatus === 'succeeded') {
    content = posts.map((post) => (
      <div key={post.id} className="post">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        <Comments postId={post.id}/> {/* 댓글 컴포넌트 추가 */}
      </div>
    ));
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div className="App">
      <h1>Posts</h1>
      <button onClick={handleAddPost}>Add Post</button>
      {content}
    </div>
  );
};

export default App;
