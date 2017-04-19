import Vue from 'vue/dist/vue.common.js';
import * as SearchStore from './search-store.js';
import * as PersonifyUser from './components/personify-user.js';
import * as SortDropdown from './components/sort-dropdown.js';

var app = new Vue({
    el: '#AlgoliaSearch',
    data: {
        local: SearchStore.store.state,
        store: SearchStore.store,
        persoUsers: SearchStore.persoUsers,
        sortOptions: SearchStore.sortOptions
    },
    created: function () {
        this.store.performFullSearch();
    },
    components: {
        'personify-user': PersonifyUser.PersonifyUserComponent,
        'sort-dropdown': SortDropdown.SortDropdownComponent
    }
});