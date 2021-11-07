import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostTiles from '../Posts/PostTiles/PostTiles';
import PostLoading from '../Posts/PostLoading/PostLoading';
import { fetchPosts, fetchComments, selectFilteredPosts } from '../store/redditSlice';
import './Home.css'

const Home = () => {

    const reddit = useSelector((state) => state.reddit);
    const { isLoading, error, selectedSubreddit, searchTerm } = reddit;
    const posts = useSelector(selectFilteredPosts);
    const dispatch = useDispatch();

    const onToggleComments = (index) => {
        const getComments = (permalink) => {
            dispatch(fetchComments(index, permalink));
        }
        return getComments;
    }

    useEffect(() => {
        dispatch(fetchPosts(selectedSubreddit));
    }, [selectedSubreddit, dispatch]);

    if (isLoading) {
        return (
            <>
                <PostLoading />
                <PostLoading />
                <PostLoading />
            </>
        )
    };

    if (error) {
        return (
            <h2>There was an error fetching the posts</h2>
        );
    }

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