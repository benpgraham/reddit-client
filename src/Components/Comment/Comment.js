import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FaReddit } from 'react-icons/fa';
import './Comment.css';

const Comment = ({ comment }) => {

    return (
        <div className="comment">
            <div className="author-details">
                <FaReddit className="reddit-logo" />
                <p>{comment.author}</p>
            </div>
            <div className="comment-body">
                {/* ReactMarkdown interprets reddits comments as markdown and loads in links and styles */}
                <ReactMarkdown className="comment-text" children={comment.body} />
            </div>
        </div>
    )

}

export default Comment;