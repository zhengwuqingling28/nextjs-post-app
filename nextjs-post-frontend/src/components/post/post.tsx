"use client";

import { formatDate } from "@/lib/format";
import LikeButton from "../like-btn";
import { togglePostLikeStatus } from "@/actions/postAction";

interface IProps {
  post: IPost;
}

function Post({ post }: IProps) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image_url} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by Lawther on{" "}
              <time dateTime={post.created_at}>
                {formatDate(post.created_at)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={() => togglePostLikeStatus(post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default Post;
