/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axios-instance';

export const getComments = async (tipId: number) => {
  try {
    const { data } = await axiosInstance.get('/comments');
    return data.result.filter((comment: any) => comment.tips_id === tipId);
  } catch (error: any) {
    console.error('댓글 불러오기 실패:', error);
    throw new Error('댓글을 불러오는 데 실패했습니다.');
  }
};

export const addComment = async (tipId: string, comment: string) => {
  try {
    const { data } = await axiosInstance.post(`/tips/${tipId}/comments`, {
      comment,
    });
    return data;
  } catch (error: any) {
    console.error('댓글 추가 실패:', error);
    throw new Error('댓글 추가에 실패했습니다.');
  }
};

export const editComment = async (tipId: string, commentId: string, newComment: string) => {
  try {
    const { data } = await axiosInstance.put(`/tips/${tipId}/comments/${commentId}`, {
      comment: newComment,
    });
    return data;
  } catch (error: any) {
    console.error('댓글 수정 실패:', error);
    throw new Error('댓글 수정에 실패했습니다.');
  }
};

export const deleteComment = async (tipId: string, commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/tips/${tipId}/comments/${commentId}`);
    return data;
  } catch (error: any) {
    console.error('댓글 삭제 실패:', error);
    throw new Error('댓글 삭제에 실패했습니다.');
  }
};
