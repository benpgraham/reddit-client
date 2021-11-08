import React from 'react';
import Card from '../../Card/Card';
import Comment from '../../Comment/Comment';
import './PostTiles.css';
import { FaRegComment } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const PostTiles = ({ posts, onToggleComments }) => {

    // Render's a direct link to stickied posts, that can take users to the permalink, otherwise renders the load comment button
    const renderCommentType = () => {
        if(posts.stickied) {
            return (
                <span className="post-comments-container">
                    <a href={posts.url} className="external-link" target="_blank" rel="noreferrer" >
                        <BiLinkExternal className="icon-action" />
                    </a>
                </span>
            )
        } else {
            return (
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
            );
        }
    }

    // Loads comments if they exist
    const renderComments = () => {
        // While loading display animated loading skeleton
        if (posts.loadingComments) {
            return (
                <div className="skeleton-wrapper" >
                    <Skeleton count={5} height={25} />
                </div>
            );
        }

        // Checks for error
        if (posts.errorComments) {
            return (
                <div>
                    <h3> Error loading comments</h3>
                </div>
            );
        }

        // Displays comments when loaded by mapping each comment into the comment component
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

    // Checks the media type for video or image, returns the appropriate html block
    const renderMedia = () => {
        if(posts.is_video) {
                return (
                    <video controls autoplay className="post-image" >
                        <source src={posts.secure_media.reddit_video.fallback_url + '#t=0.001'} />
                    </video>
                );
        } else {
            return (
                <img src={posts.url} alt="" className="post-image" />
            );
        }
    }

    return (
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
                            {renderMedia()}
                        </div>
                    </div>
                    <div className="postInfo">
                        <p>Votes: {posts.ups}</p>
                        {renderCommentType()}
                    </div>

                    {renderComments()}
                </div>
            </Card>
        </article>
    )
};

export default PostTiles;