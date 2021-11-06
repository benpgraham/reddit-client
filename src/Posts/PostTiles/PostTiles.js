import userEvent from '@testing-library/user-event';
import React from 'react';
import Card from '../../Card/Card';
import Comment from '../../Comment/Comment';
import './PostTiles.css';
import { FaRegComment } from 'react-icons/fa';

const PostTiles = ({ posts, onToggleComments }) => {

    const renderComments = () => {
        if(posts.showingComments) {
            return (
                <div>
                    {posts.comments.map((comment) => (
                        <Comment comment={comment} key={comment.id} />
                    ))}
                </div>
            )
        }
        return null;
    }

    return(
        <article key={posts.id}>
            <Card>
                <div className="post-wrapper">
                    <div className="metaDetails">
                        <p>u/{posts.author}</p>
                        <p>r/{posts.subreddit}</p>
                    </div>
                    <div className="title">
                            <h2>{posts.title}</h2>           
                    </div>
                    <div className="post-content">
                        <div className="post-image-container">
                            <a href={posts.url} target="_blank">    
                            <img src={posts.url} alt="" className="post-image" />
                            </a>
                        </div>  
                    </div>
                    <div className="postInfo">
                        <p>Votes: {posts.ups}</p>
                        <span className="post-comments-container">
                        <button
                            type="button"
                            className={`icon-action-button ${posts.showingComments && 'showing-comments'}`}
                            onClick={() => onToggleComments(posts.permalink)}
                            aria-label="Show Comments"
                        >
                            <FaRegComment className="icon-action" />
                        </button>
                        </span>
                    </div>

                    {renderComments()}
                </div>
            </Card>
        </article>
    )
};

export default PostTiles;