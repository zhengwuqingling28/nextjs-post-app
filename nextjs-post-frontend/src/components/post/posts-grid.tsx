import Post from "./post";

interface IProps {
  posts: IPost[];
}

const PostsGrid = ({ posts }: IProps) => {
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map((post: IPost) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
};

export default PostsGrid;
