import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// 게시물 목록을 가져오는 비동기 작업
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    // API 호출을 통해 게시물 데이터를 가져옴
    const response = await axios.get(API_URL);
    // 응답 데이터를 반환
    return response.data;
});

// 새로운 게시물을 추가하는 비동기 작업
export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
    // API 호출을 통해 새로운 게시물을 추가
    const response = await axios.post(API_URL, newPost);
    // 응답 데이터를 반환
    return response.data;
});

// 게시물을 삭제하는 비동기 작업을 정의
export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
    // API 호출을 통해 게시물을 삭제
    await axios.delete(`${API_URL}/${postId}`);
    // 삭제된 게시물의 ID를 반환
    return postId;
});

// posts와 관련된 상태와 리듀서를 정의
export const postsSlice = createSlice({
  name: 'posts', //slice의 이름을 정의
  initialState: {
    posts: [], // 게시물 목록을 저장할 배열
    status: 'idle', // 비동기 작업의 상태 저장
    error: null, // 에러 메시지 저장
  },
  reducers: {}, // 동기적 리듀서를 정의할 수 있지만, 여기서는 사용하지 않음
  extraReducers: (builder) => {
    // 비동기 작업의 상태 변화를 처리
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'; // fetchPosts가 시작되면 상태를 'loading'으로 설정
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'; // fetchPosts가 성공하면 상태를 'succeeded'로 설정
        state.posts = action.payload; // API 응답 데이터를 posts 상태에 저장
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'; // fetchPosts가 실패하면 상태를 'failed'로 설정
        state.error = action.error.message; // 에러 메시지를 상태에 저장
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload); // 새로운 게시물을 posts 배열에 추가
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload); // 삭제된 게시물을 posts 배열에서 제거
      });
  },
});

export default postsSlice.reducer;
