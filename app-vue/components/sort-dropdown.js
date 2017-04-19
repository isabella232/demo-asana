import * as SearchStore from './../search-store.js';
import _ from 'lodash';

export const SortDropdownComponent = {
    props: ['sorts', 'activesort'],
    template: `<div><span class="toolbar-section right"><a id="search_sort_menu" tabindex="-1" class="dropdown-menu-link  floatingSelectView-anchor " v-on:click="toggleDropdown()"><span class="floatingSelectView-label"><span class="sort-button">Sort</span>
                                                                        <svg class="svgIcon  svgIcon-dropdownarrow " viewBox="0 0 32 32" title="dropdownarrow">
                                                                            <path d="M4.686,12.686l9.899,9.9c0.781,0.781,2.047,0.781,2.828,0l9.9-9.9l-2.475-2.475L16,19.05l-8.839-8.839L4.686,12.686z"></path>
                                                                        </svg>
                                                                        </span>
                                                                        </a>
                                                                        </span>
                    <div v-bind:class="{'visible': dropdownIsVisible}" class="dropdown dropdown-personify" id="search_sort_menu_dropdown_menu" style="z-index: 2000;">
                        <div class="dropdown-menu some-items-are-selected ">
                                <a v-for="sort in sorts" v-on:click="selectSort(sort.index)" id="modification_time" class="menu-item selected">
                                <svg v-if="activesort === sort.index" class="svgIcon dropdownMenuItem-selectedIcon" viewBox="0 0 32 32" title="selected">
                                    <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon>
                                </svg><span data-icon="modifiedtime" class="modifiedtime glyph dropdown-menu-item-glyph prod"></span><span class="dropdown-menu-item-label"><span class="label">{{sort.name}}</span></span>
                            </a>
                        </div>
                    </div></div>`,
    data: () => ({
        dropdownIsVisible: false
    }),
    computed: {
        initials: function () {
            return this.getActiveUserInitials(this.users, this.activeid);
        },
        hexCode: function () {
            return this.getActiveUserHexcode(this.users, this.activeid);
        }
    },
    methods: {
        toggleDropdown() {
                this.dropdownIsVisible = !this.dropdownIsVisible;
        },
        selectSort(index) {
            this.toggleDropdown();
            SearchStore.store.updateSortIndex(index);
        }
    }
}