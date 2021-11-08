import React from 'react';
import { useDispatch } from 'react-redux';
import { updateSelectedSubreddit } from '../../../store/redditSlice';
import { FaReddit } from 'react-icons/fa';
import './SubredditTile.css'

const SubredditTile = ({ subreddit, toggleOpen }) => {
    
    const dispatch = useDispatch();
    const { display_name, icon_img} = subreddit;

    // On clicking the subreddit tile, updates the selected subreddit in the store
    const updateSubreddit = (subreddit, icon) => {
        dispatch(updateSelectedSubreddit({subreddit, icon}));
        toggleOpen();
    }

    return (
        <button className="updateSubreddit" onClick={() => updateSubreddit(display_name, icon_img)}>
            <div className="subreddit-wrapper">
                <div className="subreddit-icon">
                    {/* Checks if the subreedit has an icon, if not provides a default */}
                    { ((icon_img) && <img src={icon_img} alt="" className="subreddit-image-block" /> ) || <FaReddit className="default-icon"/> }
                </div>
                <div className="subreddit-name">
                        <p>r/{display_name}</p>
                </div>
            </div>
        </button>
    )
};

export default SubredditTile;