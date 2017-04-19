import algoliasearch from 'algoliasearch';
import _ from 'lodash';

export const config = {
    APP_ID: 'latency',
    API_KEY: '6be0576ff61c053d5f9a3225e2a90f76'
}

export const client = algoliasearch(config.APP_ID, config.API_KEY);

export const persoUsers = [
    {
        name: "Kat Mooney (Marketing)",
        id: 8075699117009,
        hexCode: "#fd9a00",
        teamName: "Apollo Marketing Team"
    },
    {
        name: "Tatiana Klima (Engineering)",
        id: 8075908659758,
        hexCode: "#aa62e3",
        teamName: "Engineering"
    },
    {
        name: "Yevgeniya K (Recruiting)",
        id: 8075699117004,
        hexCode: "#7a6ff0",
        teamName: "Recruiting"
    }
];

export const sortOptions = [
    {
        index: "asanaTasksAndConversations",
        name: "Most Relevant"
    },
    {
        index: "asanaTasksAndConversations_creation",
        name: "Creation Time"
    },
    {
        index: "asanaTasksAndConversations_hearts",
        name: "Hearts"
    }
]

export const store = {
    state: {
        query: '',
        fullQuery: '',
        activePerso: 0,
        activeTeam: '',
        userResults: [],
        projectResults: [],
        taskResults: [],
        tagResults: [],
        teamResults: [],
        fullResults: [],
        activeSort: 'asanaTasksAndConversations'
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
                hitsPerPage: 8,
                optionalFacetFilters: ["followers_du:" + this.state.activePerso]
            }
        }, {
            indexName: 'asanaProjects',
            query: this.state.query,
            params: {
                hitsPerPage: 8,
                optionalFacetFilters: ["followers_du:" + this.state.activePerso]
            }
        }, {
            indexName: 'asanaTasks',
            query: this.state.query,
            params: {
                hitsPerPage: 8,
                filters: this.createFilters(this.state.activeTeam),
                optionalFacetFilters: ["assignee:" + this.state.activePerso + "<score=3>", "followers_du:" + this.state.activePerso + "<score=1>", "creator_du:" + this.state.activePerso + "<score=2>"]
            }
        }, {
            indexName: 'asanaTags',
            query: this.state.query,
            params: {
                hitsPerPage: 8,
                optionalFacetFilters: ["followers_du:" + this.state.activePerso]
            }
        }, {
            indexName: 'asanaTeams',
            query: this.state.query,
            params: {
                hitsPerPage: 8
            }
        }];
        client.search(queries, this.searchCallback.bind(this));
    },
    searchCallback(err, content) {
        if (err) {
            console.error(err);
            return;
        }
        this.state.userResults = content.results[0].hits;
        this.state.projectResults = content.results[1].hits;
        this.state.taskResults = content.results[2].hits;
        this.state.tagResults = content.results[3].hits;
        this.state.teamResults = content.results[4].hits;
    },
    triggerFullSearch() {
        this.state.fullQuery = this.state.query;
        this.state.query = "";
        this.performFullSearch();
        this.performSearch();
    },
    async performFullSearch() {
        let fullIndex = client.initIndex(this.state.activeSort);
        try {
            const results = await fullIndex.search(this.state.fullQuery, {
                hitsPerPage: 25,
                filters: this.createFilters(this.state.activeTeam, this.state.activePerso),
                optionalFacetFilters: ["assignee:" + this.state.activePerso + "<score=3>", "teamName:" + this.state.activeTeam + "<score=2>", "followers_du:" + this.state.activePerso + "<score=1>", "creator_du:" + this.state.activePerso + "<score=1>"]
            });
            return this.state.fullResults = results.hits;
        } catch (err) {
            console.log(err);
        }
    },
    createFilters(activeTeam, id) {
        return activeTeam.length > 0 ? "visible:'public' OR teamName:'" + activeTeam + "'" : "visible:'public'";
    },
    updatePerso(id) {
        this.state.activePerso = id;
        this.state.activeTeam = this.getActiveUserTeam(persoUsers, id);
        this.performFullSearch();
    },
    updateSortIndex(index) {
        this.state.activeSort = index;
        this.performFullSearch();
    },
    getActiveUserTeam(users, id) {
        return _.flow(
            this.findActiveUser,
            this.getTeamName
        )(users, id);
    },
    findActiveUser(users, id) {
        return _.find(users, ['id', id]);
    },
    getTeamName(user) {
        return user ? user.teamName : "";
    }
}