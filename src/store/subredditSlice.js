import { createSlice } from '@reduxjs/toolkit';
import { getSubreddits } from '../Reddit/services';

const initialState = {
    subredditsList: [],
    error: false,
    isLoading: false,
};

const subredditSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {
        startGetSubreddits(state, action) {
            state.isLoading = true;
            state.error = false;
        },
        getSubredditsSuccess(state, action) {
            state.isLoading = false;
            state.subredditsList = action.payload;
        },
        getSubredditsFailed(state) {
            state.isLoading = false;
            state.error = true;
        },
    },
});

export const {
    startGetSubreddits,
    getSubredditsSuccess,
    getSubredditsFailed
} = subredditSlice.actions;

export default subredditSlice.reducer;

// Redux thunks to fetch the subreddits

export const fetchSubreddits = () => async (dispatch) => {
    try {
        dispatch(startGetSubreddits());
        const subreddits = await getSubreddits();
        dispatch(getSubredditsSuccess(subreddits));
    } catch (error) {
        dispatch(getSubredditsFailed());
    }
}