interface IPost {
  id: number;
  image_url: string;
  title: string;
  content: string;
  created_at: string;
  userId: number;
  isLiked?: boolean;
}
