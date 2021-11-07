import React, { useEffect, useState } from 'react';
import './Header.css';
import { FaReddit } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits } from '../store/subredditSlice';
import { setSearchTerm } from '../store/redditSlice';
import SubredditTile from '../Posts/SubredditTiles/SubredditTile';
import DropdownHeader from '../Dropdown/DropdownHeader';

const Header = () => {
    const reddit =  useSelector((state) => state.reddit);
    const { selectedSubreddit, subredditIcon } = reddit;

    const subreddits = useSelector((state) => state.subreddits);
    const { subredditsList } = subreddits;
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [localSearch, setLocalSearch] = useState('');

    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

    const searchTermChange = (e) => {
        setLocalSearch(e.target.value);
    };

    const filterPosts = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(localSearch));
    };

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
                <button type="submit">
                    <HiOutlineSearch className="search-button" />
                </button>
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
                        <SubredditTile subreddit={subreddit} toggleOpen={toggleOpen}/>
                    ))}
                    </div>
                }
            </div>
        </>
    )

}

export default Header;