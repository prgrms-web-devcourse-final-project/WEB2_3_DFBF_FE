import PostMusicProvider from '@/pages/post/context/PostMusicProvider';
import PostPage from '@/pages/post/components/PostPage';

export default function Post() {
  return (
    <PostMusicProvider>
      <PostPage />
    </PostMusicProvider>
  );
}
