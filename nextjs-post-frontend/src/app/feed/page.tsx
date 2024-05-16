import { Suspense } from "react";
import PostsGrid from "@/components/post/posts-grid";
import FeedLoading from "./loading";

const Feeds = async () => {
  const res = await fetch(`http://localhost:8000/posts`, {
    method: "GET",
  });

  const posts = await res.json();

  return <PostsGrid posts={posts} />;
};

const FeedPage = () => {
  return (
    <>
      <h1>All posts by all users</h1>
      <Suspense fallback={<FeedLoading />}>
        <Feeds />
      </Suspense>
    </>
  );
};
export default FeedPage;
