import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostTiles from '../Posts/PostTiles/PostTiles';
import PostLoading from '../Posts/PostLoading/PostLoading';
import { fetchPosts, fetchComments, selectFilteredPosts } from '../../store/redditSlice';
import './Home.css'

const Home = () => {
    // Reddit data from the store
    const reddit = useSelector((state) => state.reddit);
    const { isLoading, error, selectedSubreddit, searchTerm } = reddit;

    // Selects array of filtered posts from the selector defined in redditSlice
    const posts = useSelector(selectFilteredPosts);
    const dispatch = useDispatch();

    // Dispatches the fetchComments thunk to fetch comments
    const onToggleComments = (index) => {
        const getComments = (permalink) => {
            dispatch(fetchComments(index, permalink));
        }
        return getComments;
    };

    // Dispatches the fetchPosts thunk on mount, then disptaches on change of selected subreddit
    useEffect(() => {
        dispatch(fetchPosts(selectedSubreddit));
    }, [selectedSubreddit, dispatch]);

    // If posts are loading display an animated loading skeleton
    if (isLoading) {
        return (
            <>
                <PostLoading />
                <PostLoading />
                <PostLoading />
            </>
        )
    };

    // If error in loading posts display the error message
    if (error) {
        return (
            <h2>There was an error fetching the posts</h2>
        );
    }

    // If the filtered posts return as 0, inform user that no post matches their search term
    if (posts.length === 0) {
        return (
            <h2>Sorry, no posts found including: "{searchTerm}" </h2>
        );
    }

    return (
        <>
            {posts.map((post, index) => (
                <PostTiles 
                posts={post}
                key={post.id} 
                onToggleComments={onToggleComments(index)}
                />
            ))}
        </>
    )
}

export default Home;