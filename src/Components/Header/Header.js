import React, { useEffect, useState } from 'react';
import './Header.css';
import { FaReddit } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits } from '../../store/subredditSlice';
import { setSearchTerm } from '../../store/redditSlice';
import SubredditTile from '../Posts/SubredditTiles/SubredditTile';
import DropdownHeader from '../Dropdown/DropdownHeader';

const Header = () => {
    // Reddit data from the store
    const reddit =  useSelector((state) => state.reddit);
    const { selectedSubreddit, subredditIcon } = reddit;

    // Subreddit data from the store, stored in an array
    const subreddits = useSelector((state) => state.subreddits);
    const { subredditsList } = subreddits;
    const dispatch = useDispatch();

    // Local state for search term and subreddit visibilty
    const [open, setOpen] = useState(false);
    const [localSearch, setLocalSearch] = useState('');

    // Loads subreddit list on mount
    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

    // Updates local search term
    const searchTermChange = (e) => {
        setLocalSearch(e.target.value);
    };
    // dispatches the final local search to the selector
    const filterPosts = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(localSearch));
    };

    // Toggles whether or not to display the subreddit dropdown
    const toggleOpen = () => {
        setOpen(!open);
    }

    return (
        <>
            <div className="search">
                <form className="search-form" onSubmit={filterPosts}>
                    <input 
                    type="text" 
                    placeholder="Filter Posts" 
                    value={localSearch} 
                    onChange={searchTermChange}
                    />
                </form>
                <div className="button-wrapper">
                    <button type="submit" className="search-button-wrapper" onClick={filterPosts}>
                        <HiOutlineSearch className="search-button" />
                    </button>
                </div>
            </div>
            <div className="logo">
                <FaReddit className="logo-reddit" />
                <h1>MINIMAL REDDIT</h1>
            </div>
            <div className="subreddits">
                <button className="subreddit-dropdown" onClick={() => toggleOpen()} >
                    <DropdownHeader subreddit={{
                        display_name: selectedSubreddit, 
                        icon_img: subredditIcon}} 
                    />
                </button>
                {open && 
                    <div className="dropdown-container">
                        {subredditsList.map((subreddit) => (
                        <SubredditTile subreddit={subreddit} toggleOpen={toggleOpen} key={subreddit.id} />
                    ))}
                    </div>
                }
            </div>
        </>
    )

}

export default Header;