import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import type { Post } from "@/FeedPage.tsx";
import "./index.css";

interface Comment {
    id: number;
    body: string;
    postId: number;
    user: {
        id: number;
        username: string;
    };
}

interface CommentsResponse {
    comments: Comment[];
    total: number;
    skip: number;
    limit: number;
}

export function PostsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);

        Promise.all([
            fetch(`https://dummyjson.com/posts/${id}`).then(res => res.json()),
            fetch(`https://dummyjson.com/comments/post/${id}`).then(res => res.json())
        ])
            .then(([postData, commentsData]: [Post, CommentsResponse]) => {
                setPost(postData);
                setComments(commentsData.comments);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div>Loading post...</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <div className="post-detail">
            <button onClick={() => navigate('/feed')}>← Back to feed</button>
            <h2>{post.title}</h2>
            <p>{post.body}</p>

            <div className="comments-section">
                <h3>Comments ({comments.length})</h3>
                {comments.map(comment => (
                    <div className="comment-card" key={comment.id}>
                        <strong>{comment.user.username}</strong>
                        <p>{comment.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}