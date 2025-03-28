import { fetchSpotifyVideoId } from '@/utils/fetchSpotifyVideoId';

interface FormData {
  emotion: string | null;
  comment: string;
}

interface PostCompletionProps {
  formData: FormData;
  isCompletePost: boolean;
  selectedPostMusic: MusicCardItem | null;
  onSubmit: (data: EmotionRecordRequest) => void;
}

const usePostCompletion = ({
  formData,
  isCompletePost,
  selectedPostMusic,
  onSubmit,
}: PostCompletionProps) => {
  // 기록 완료
  const completePost = async () => {
    if (!isCompletePost || !selectedPostMusic) return;
    // videoId 조회
    const videoId = await fetchSpotifyVideoId(
      selectedPostMusic?.spotifyId,
      selectedPostMusic?.artist,
      selectedPostMusic?.title,
    );

    const data: EmotionRecordRequest = {
      spotifyId: selectedPostMusic?.spotifyId,
      videoId,
      title: selectedPostMusic?.title,
      artist: selectedPostMusic?.artist,
      albumImage: selectedPostMusic?.albumImage,
      emotion: formData.emotion as string,
      comment: formData.comment,
    };

    onSubmit(data);
  };

  return { completePost };
};
export default usePostCompletion;
