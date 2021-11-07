import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getHomePage, getPostComments } from '../Reddit/services';

const initialState = {
    posts: [],
    error: false,
    isLoading: false,
    searchTerm: '',
    selectedSubreddit: 'r/AskReddit',
    subredditIcon: 'https://b.thumbs.redditmedia.com/EndDxMGB-FTZ2MGtjepQ06cQEkZw_YQAsOUudpb9nSQ.png'
};

const redditSlice = createSlice({
    name: 'redditPosts',
    initialState,
    reducers: {
        startGetPosts(state) {
            state.isLoading = true;
            state.error = false;
        },
        getPostsSuccess(state, action) {
            state.isLoading = false;
            state.posts = action.payload;
        },
        getPostsFailed(state) {
            state.isLoading = false;
            state.error = true;
        },
        setSearchTerm (state, action) {
            state.searchTerm = action.payload;
        },
        toggleShowingComments(state, action) {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
        },
        startGetComments(state, action) {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
            if(!state.posts[action.payload].showingComments) {
                return;
            }
            state.posts[action.payload].loadingComments = true;
            state.posts[action.payload].errorComments = false;
        },
        getCommentsSuccess(state, action) {
            state.posts[action.payload.index].loadingComments = false;
            state.posts[action.payload.index].comments = action.payload.comments;
        },
        getCommentsFailed(state, action) {
            state.posts[action.payload].loadingComments = false;
            state.posts[action.payload].errorComments = true;
        },
        updateSelectedSubreddit(state, action) {
            state.selectedSubreddit = 'r/' + action.payload.subreddit;
            state.subredditIcon = action.payload.icon;
        }
    },
});

export const {
    startGetPosts,
    getPostsSuccess,
    getPostsFailed,
    setSearchTerm,
    startGetComments,
    getCommentsSuccess,
    getCommentsFailed,
    updateSelectedSubreddit
} = redditSlice.actions;

export default redditSlice.reducer;

// Redux thunk to handle getting posts
export const fetchPosts = (subreddit) => async (dispatch) => {
    try {
        dispatch(startGetPosts());
        const posts = await getHomePage(subreddit);

        //Adding comment data to the State so we can handle showing them when the user requests. We need to do this because the comments are accessed at a different API endpoint to the posts
        const postsWithComments = posts.map((post) => ({
            ...post,
            showingComments: false,
            comments: [],
            loadingComments: false,
            errorComments: false,
        }));

        dispatch(getPostsSuccess(postsWithComments));
    } catch (error) {
        dispatch(getPostsFailed());
    }
}

export const fetchComments = (index, permalink) => async (dispatch) => {
    try {
        dispatch(startGetComments(index));
        const comments = await getPostComments(permalink);
        dispatch(getCommentsSuccess({index, comments}));
    } catch (error) {
        dispatch(getCommentsFailed(index));
    }
};

const selectPosts = (state) => state.reddit.posts;
const selectSearchTerm = (state) => state.reddit.searchTerm;

export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== '') {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return posts;
  }
);