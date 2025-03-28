import usePostModals from '@/hooks/post/usePostModals';
import { useQueryClient } from '@tanstack/react-query';

interface PostSubmitHandlerProps {
  mode: 'create' | 'edit';
}

const usePostSubmitHandler = ({ mode }: PostSubmitHandlerProps) => {
  const { showSuccessModal, showFailModal } = usePostModals(mode); // 모달 관련 훅
  const queryClient = useQueryClient();

  // 글 등록 성공
  const handlePostSuccess = () => {
    showSuccessModal();
    queryClient.invalidateQueries({ queryKey: ['userPosts', 'me'] });
  };

  // 글 등록 실패
  const handlePostError = (error: Error) => {
    console.error(error);
    showFailModal();
  };

  return {
    handlePostSuccess,
    handlePostError,
  };
};
export default usePostSubmitHandler;
