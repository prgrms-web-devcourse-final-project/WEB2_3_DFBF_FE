import { getEmotionRecordById } from '@/apis/emotionRecord';
import useMusicSelection from '@/hooks/post/useMusicSelection';
import { useEffect } from 'react';

interface useEditInitProps {
  postId: number | null;
  setEmotion: (emotion: string | null) => void;
  setComment: (comment: string) => void;
}

const useEditInit = ({ postId, setEmotion, setComment }: useEditInitProps) => {
  const { selectPostMusic, selectedPostMusic } = useMusicSelection();

  useEffect(() => {
    // console.log('수정모드입니다 postId:', postId);
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

      setEmotion(emotion);
      setComment(comment);
      selectPostMusic(editMusic);
      // console.log('음악 선택됨:', selectedPostMusic);
      // console.log('수정 데이터:', data);
    };

    getEmotionRecord();
  }, [postId]);
};
export default useEditInit;
