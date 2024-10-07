import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import ProfileImg from '../../../assets/profile.png'

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

const CommentComponent: React.FC<CommentProps> = ({ movieId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://cc3e497d.qdhgtch.com:2345/api/v1/movie/comments/index?movie_id=${movieId}&page=1&pageSize=10`);
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

    const res = JSON.parse(localStorage.getItem('authToken') || '');
    if (res && res.token_type) {
      try {
        const response = await fetch('https://cc3e497d.qdhgtch.com:2345/api/v1/movie/comments/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${res.token_type} ${res.access_token}`,
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
    }
  };

  return (
    <div className="comment-section bg-gray-900 p-4 rounded-md">
      {comments.map((comment) => (
        <div key={comment.id} className="comment border-b border-gray-700 pb-4 mb-4">
          <div className="profile flex items-center mb-2">
            <img src={comment.user.avatar || ProfileImg} alt={comment.user.nickname} className="w-10 h-10 rounded-full mr-2" />
            <div>
              <span className="username text-white font-bold">{comment.user.nickname}</span>
              <span className="badge bg-blue-500 text-xs text-white px-2 py-1 ml-2 rounded">
                {comment.user.level}
              </span>
            </div>
          </div>
          <div className="comment-text text-gray-300 mb-2">{comment.content}</div>
          <div className="comment-actions flex items-center justify-between">
            <span className="time text-gray-500 text-sm">
              {new Date(comment.create_time).toLocaleDateString()}
            </span>
            <div className="like-section flex items-center">
              <button onClick={() => likeComment(comment.id)} className="text-gray-400 hover:text-blue-500 mr-1">
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
              <span className="like-count text-white">{comment.likes}</span>
            </div>
          </div>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="reply-section mt-4 pl-10">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="reply mb-4">
                  <div className="profile flex items-center mb-1">
                    <img
                      src={reply.user.avatar}
                      alt={reply.user.nickname}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <span className="username text-white font-bold">{reply.user.nickname}</span>
                      <span className="badge bg-blue-500 text-xs text-white px-2 py-1 ml-2 rounded">
                        {reply.user.level}
                      </span>
                    </div>
                  </div>
                  <div className="comment-text text-gray-300 mb-1">{reply.content}</div>
                  <span className="time text-gray-500 text-xs">
                    {new Date(reply.create_time).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Create new comment */}
            {/* Create new comment */}
            <div className="create-comment mt-6 flex items-center bg-gray-800 p-3 rounded-lg">
        <img src={ProfileImg} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="确认过眼神，你是发言人！"
        />
        <button
          onClick={handleCreateComment}
          className="bg-blue-600 text-white py-2 px-4 ml-3 rounded-md hover:bg-blue-700 focus:outline-none"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default CommentComponent;