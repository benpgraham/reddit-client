import React from 'react';
import { useDispatch } from 'react-redux';
import { updateSelectedSubreddit } from '../../../store/redditSlice';
import { FaReddit } from 'react-icons/fa';
import './SubredditTile.css'

const SubredditTile = ({ subreddit, toggleOpen }) => {
    const dispatch = useDispatch();

    const { display_name, icon_img} = subreddit;

    const updateSubreddit = (subreddit, icon) => {
        dispatch(updateSelectedSubreddit({subreddit, icon}));
        toggleOpen();
    }

    return (
        <button className="updateSubreddit" onClick={() => updateSubreddit(display_name, icon_img)}>
            <div className="subreddit-wrapper">
                <div className="subreddit-icon">
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