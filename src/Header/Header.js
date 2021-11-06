import React, { useEffect, useState } from 'react';
import './Header.css';
import { FaReddit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits } from '../store/subredditSlice';
import SubredditTile from '../Posts/SubredditTiles/SubredditTile';
import DropdownHeader from '../Dropdown/DropdownHeader';

const Header = () => {
    const reddit =  useSelector((state) => state.reddit);
    const { selectedSubreddit, subredditIcon } = reddit;

    const subreddits = useSelector((state) => state.subreddits);
    const { subredditsList, error, isLoading } = subreddits;
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchSubreddits());
    }, []);

    return (
        <>
            <div className="logo">
                <FaReddit className="logo-reddit" />
                <h1>SHIT REDDIT</h1>
            </div>
            <div className="subreddits">
                <a href="#" className="subreddit-dropdown" onClick={() => setOpen(!open)}>
                    <DropdownHeader subreddit={{
                        display_name: selectedSubreddit, 
                        icon_img: subredditIcon}} 
                    />
                </a>
                {open && 
                    <div className="dropdown-container">
                        {subredditsList.map((subreddit) => (
                        <SubredditTile subreddit={subreddit} />
                    ))}
                    </div>
                }
            </div>
        </>
    )

}

export default Header;

/*

 {subredditsList.map((subreddit) => (
                    <SubredditTile subreddit={subreddit} />
                ))}

*/