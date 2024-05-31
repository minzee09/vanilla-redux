import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/comments';

// 댓글 목록을 가져오는 비동기 작업을 정의합니다.
export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
    // 특정 게시물 ID에 해당하는 댓글을 가져옴
    const response = await axios.get(`${API_URL}?postId=${postId}`);
    // 댓글 데이터와 postId를 함께 반환
    return { postId, comments: response.data };
});

// 새로운 댓글을 추가하는 비동기 작업을 정의합니다.
export const addComment = createAsyncThunk('comments/addComment', async (newComment) => {
    // 새로운 댓글을 추가
    const response = await axios.post(API_URL, newComment);
    return response.data;
});

// comments와 관련된 상태와 리듀서를 정의합니다.
export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsByPostId: {}, // 각 게시물 ID별로 댓글을 저장
    status: 'idle',
    error: null,
  },
  reducers: {},
  // 비동기 작업의 상태 변화를 처리
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // 특정 게시물 ID에 해당하는 댓글 데이터를 저장
        state.commentsByPostId[action.payload.postId] = action.payload.comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const postId = action.payload.postId; // 추가된 댓글의 postId를 가져옴
        if (!state.commentsByPostId[postId]) {
          state.commentsByPostId[postId] = []; // 해당 postId에 댓글 배열이 없으면 초기화
        }
        state.commentsByPostId[postId].push(action.payload); // 새로운 댓글을 해당 postId의 배열에 추가
      });
  },
});

export default commentsSlice.reducer;
