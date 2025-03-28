import PostCreate from '@/pages/post/components/PostCreate';
import PostEdit from '@/pages/post/components/PostEdit';
import { useParams } from 'react-router';

export default function Post() {
  const { postId } = useParams();
  return postId ? <PostEdit postId={postId} /> : <PostCreate />;
}
