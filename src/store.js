import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './components/postSlice';
import commentsReducer from './components/commentsSlice'

// configureStore 함수를 사용하여 Redux store를 설정
export const store = configureStore({
  reducer: {
    // posts 상태를 관리하기 위해 postsReducer를 사용
    posts: postsReducer, //작성할 posts slice의 리듀서를 지정
    comments: commentsReducer,
  },
});

export default store; //이 스토어는 앱의 전역 상태를 관리
