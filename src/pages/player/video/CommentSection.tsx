import React, { useEffect, useState } from 'react';

interface CommentProps {
  movieId: string;
}

interface Comment {
  id: number;
  movie_id: string;
  user: {
    id: number;
    nickname: string;
    avatar: string;
    level: string;
  };
  content: string;
  type: string;
  likes: number;
  create_time: string;
  replies?: Reply[];
}

interface Reply {
  id: number;
  comment_id: number;
  parent_id: number;
  user: {
    id: number;
    nickname: string;
    avatar: string;
    level: string;
  };
  content: string;
  create_time: string;
}

const Comment: React.FC<CommentProps> = ({ movieId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://cc3e497d.qdhgtch.com:2345/api/v1/movie/comments/index?movie_id=${movieId}&page=1&pageSize=10`);
        console.log('response is=>', response);
        const data = await response.json();
        setComments(data.data.list);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [movieId]);

  // Like a comment
  const likeComment = async (commentId: number) => {
    try {
      const response = await fetch('https://cc3e497d.qdhgtch.com:2345/api/v1/movie/comments/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment_id: commentId }),
      });
      if (response.ok) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
          )
        );
      } else {
        console.error('Error liking comment');
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  // Post a new comment
  const handleCreateComment = async () => {
    if (!newComment) return;
    setLoading(true);

    try {
      const response = await fetch('https://cc3e497d.qdhgtch.com:2345/api/v1/movie/comments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment_id: 0,
          movie_id: movieId,
          type: 'text',
          content: newComment,
        }),
      });

      const data = await response.json();

      setComments([data.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-section bg-gray-800 p-4 rounded-md">
      {comments.map((comment) => (
        <div key={comment.id} className="comment border-b border-gray-600 pb-4 mb-4">
          <div className="profile flex items-center mb-2">
            <img src={comment.user.avatar} alt={comment.user.nickname} className="w-10 h-10 rounded-full mr-2" />
            <div>
              <span className="username text-white">{comment.user.nickname}</span>
              <span className="badge bg-blue-500 text-xs text-white px-2 py-1 ml-2">{comment.user.level}</span>
            </div>
          </div>
          <div className="comment-text text-gray-300">{comment.content}</div>
          <div className="comment-actions flex justify-between mt-2">
            <span className="time text-gray-500 text-sm">{new Date(comment.create_time).toLocaleDateString()}</span>
            <div className="like-section flex items-center">
              <button onClick={() => likeComment(comment.id)} className="text-blue-500 text-sm mr-1">
                👍
              </button>
              <span className="like-count text-white">{comment.likes}</span>
            </div>
          </div>

          {/* Replies */}
          {comment.replies && (
            <div className="reply-section mt-2 pl-10">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="reply mb-2">
                  <div className="profile flex items-center mb-1">
                    <img src={reply.user.avatar} alt={reply.user.nickname} className="w-8 h-8 rounded-full mr-2" />
                    <div>
                      <span className="username text-white">{reply.user.nickname}</span>
                      <span className="badge bg-blue-500 text-xs text-white px-2 py-1 ml-2">{reply.user.level}</span>
                    </div>
                  </div>
                  <div className="comment-text text-gray-300">{reply.content}</div>
                  <div className="comment-actions flex justify-between mt-1">
                    <span className="time text-gray-500 text-xs">{new Date(reply.create_time).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Create new comment */}
      <div className="create-comment mt-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full bg-gray-700 text-white p-2 rounded-md"
          placeholder="Write a comment..."
        ></textarea>
        <button
          onClick={handleCreateComment}
          className="bg-blue-500 text-white py-2 px-4 mt-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </div>
  );
};

export default Comment;