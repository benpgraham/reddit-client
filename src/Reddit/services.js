// Define base path of API call
const ROOT_URL = 'https://www.reddit.com/';

const Reddit = {

    async getHomePage(subreddit) {
        const response = await fetch(`${ROOT_URL}${subreddit}.json`);
        const json = await response.json();
        return json.data.children.map(info => info.data);
    },

    async getSubreddits() {
        const response = await fetch(`${ROOT_URL}/subreddits.json`);
        const json = await response.json();

        return json.data.children.map((subreddit) => subreddit.data)
    },

    async getPostComments(permalink) {
        const response = await fetch(`${ROOT_URL}${permalink}.json`);
        const json = await response.json();

        return json[1].data.children.map((comment) => comment.data);
    }

}

module.exports = Reddit;

