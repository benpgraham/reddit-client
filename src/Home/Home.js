import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostTiles from '../Posts/PostTiles/PostTiles';
import { fetchPosts, fetchComments, selectFilteredPosts } from '../store/redditSlice';
import './Home.css'

const Home = () => {

    const reddit = useSelector((state) => state.reddit);
    const { isLoading, error, selectedSubreddit } = reddit;
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
    }, [selectedSubreddit]);

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