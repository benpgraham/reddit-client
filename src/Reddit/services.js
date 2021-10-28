// Define base path of API call
const ROOT_URL = 'https://www.reddit.com';

const Reddit = {

    async getHomePage(subreddit) {
        const response = await fetch(`${ROOT_URL}${subreddit}.json`);
        const json = await response.json();
        return json.data.children.map(info => info.data);
    },

    async getSearchResults(query) {

    },

    async getPostComments(permalink) {
        const response = await fetch(`{ROOT_URL}${permalink}.json`);
        const json = await response.json();

        return json[1].data.children.map((subreddit) => subreddit.data);
    }

}

module.exports = Reddit;

