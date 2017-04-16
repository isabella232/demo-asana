import algoliasearch from 'algoliasearch';

export const config = {
    APP_ID: 'latency',
    API_KEY: '6be0576ff61c053d5f9a3225e2a90f76'
}

export const client = algoliasearch(config.APP_ID, config.API_KEY);
export const fullIndex = client.initIndex('asanaTasksAndConversations');

export const store = {
    state: {
        query: '',
        fullQuery: '',
        userResults: [],
        projectResults: [],
        taskResults: [],
        tagResults: [],
        teamResults: [],
        fullResults: []
    },
    updateQuery(value) {
        this.state.query = value;
        this.performSearch();
    },
    performSearch() {
        let queries = [{
            indexName: 'asanaUsers',
            query: this.state.query,
            params: {
                hitsPerPage: 8
            }
        }, {
            indexName: 'asanaProjects',
            query: this.state.query,
            params: {
                hitsPerPage: 8
            }
        }, {
            indexName: 'asanaTasks',
            query: this.state.query,
            params: {
                hitsPerPage: 8
            }
        }, {
            indexName: 'asanaTags',
            query: this.state.query,
            params: {
                hitsPerPage: 8
            }
        }, {
            indexName: 'asanaTeams',
            query: this.state.query,
            params: {
                hitsPerPage: 8
            }
        }];
        client.search(queries, this.searchCallback);
    },
    searchCallback(err, content) {
        if (err) {
            console.error(err);
            return;
        }
        store.state.userResults = content.results[0].hits;
        store.state.projectResults = content.results[1].hits;
        store.state.taskResults = content.results[2].hits;
        store.state.tagResults = content.results[3].hits;
        store.state.teamResults = content.results[4].hits;
    },
    performFullSearch() {
        this.state.fullQuery = this.state.query;
        this.state.query = "";
        fullIndex.search(this.state.fullQuery, {hitsPerPage: 25}).then(
            (results) => {
                this.state.fullResults = results.hits;
            }).catch(err => console.log(err));
    }
}