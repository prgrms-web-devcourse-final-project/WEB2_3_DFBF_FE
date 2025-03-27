import { getEmotionRecordById } from '@/apis/emotionRecord';
import useMusicSelection from '@/hooks/post/useMusicSelection';
import usePostForm from '@/hooks/post/usePostForm';
import { useEffect } from 'react';

const useEditInit = (postId: number | null) => {
  const { setSelectedEmotion, setComment } = usePostForm();
  const { selectPostMusic, selectedPostMusic } = useMusicSelection();

  useEffect(() => {
    if (!postId) return;

    // 수정 데이터 가져오기
    const getEmotionRecord = async () => {
      const { data } = await getEmotionRecordById(postId);
      const { comment, emotion, spotifyMusic } = data;

      // 'artist' → 'artistName', 'title' → 'songTitle'
      const editMusic = {
        albumImage: spotifyMusic.albumImage,
        artist: spotifyMusic.artist, // 변환
        title: spotifyMusic.title, // 변환
        spotifyId: spotifyMusic.spotifyId,
      };

      setSelectedEmotion(emotion);
      setComment(comment);
      selectPostMusic(editMusic);
      console.log('음악 선택됨:', selectedPostMusic);
      console.log('수정 데이터:', data);
    };

    getEmotionRecord();
  }, [postId]);
};
export default useEditInit;
