import React from 'react';
import { useDispatch } from 'react-redux';
import { updateSelectedSubreddit } from '../../store/redditSlice';
import { FaReddit } from 'react-icons/fa';
import './SubredditTile.css'

const SubredditTile = ({ subreddit }) => {
    const dispatch = useDispatch();

    const { display_name, icon_img} = subreddit;

    const updateSubreddit = (subreddit, icon) => {
        dispatch(updateSelectedSubreddit({subreddit, icon}));
    }

    return (
        <div className="subreddit-wrapper">
            <div className="subreddit-icon">
               { (icon_img) && <img src={icon_img} alt="" className="subreddit-image-block" /> || <FaReddit className="default-icon"/> }
            </div>
            <div className="subreddit-name">
                <a className="updateSubreddit"  href='#' onClick={() => updateSubreddit(display_name, icon_img)}>
                    <p>r/{display_name}</p>
                </a>
            </div>
        </div>
    )
};

export default SubredditTile;