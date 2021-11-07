import React from 'react';
import Card from '../../Card/Card';
import Comment from '../../Comment/Comment';
import './PostTiles.css';
import { FaRegComment } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const PostTiles = ({ posts, onToggleComments }) => {

    const renderComments = () => {
        if (posts.errorComments) {
            return (
                <div>
                    <h3> Error loading comments</h3>
                </div>
            );
        }

        if (posts.loadingComments) {
            return (
                <div className="skeleton-wrapper" >
                    <Skeleton count={5} height={25} />
                </div>
            );
        }

        if(posts.showingComments) {
            return (
                <div className="comment-wrapper" >
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
                            <a href={posts.url} target="_blank" rel="noreferrer" >    
                            <img src={posts.url} alt="" className="post-image" />
                            </a>
                        </div>
                    </div>
                    <div className="postInfo">
                        <p>Votes: {posts.ups}</p>
                        <span className="post-comments-container">
                        <p className="comment-count" >{posts.num_comments}</p>
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