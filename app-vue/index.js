import Vue from 'vue/dist/vue.common.js';
import * as SearchStore from './search-store.js';
import * as PersonifyUser from './components/personify-user.js';

var app = new Vue({
    el: '#AlgoliaSearch',
    data: {
        local: SearchStore.store.state,
        store: SearchStore.store,
        persoUsers: SearchStore.persoUsers
    },
    created: function () {
        this.store.performFullSearch();
    },
    components: {
        'personify-user': PersonifyUser.PersonifyUserComponent
    }
});