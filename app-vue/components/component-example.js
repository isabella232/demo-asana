import * as SearchStore from './../search-store.js';

export const Child = {
    props: ['message'],
    template: '<input v-model="message" autocomplete="off" rows="1" id="nav_search_input" tabindex="0" class="generic-input filter-input showing search-box" type="text" placeholder="Search">',
    methods: {
        doSomething() {
            //SearchStore.store.updateStore();
        }
    }
}