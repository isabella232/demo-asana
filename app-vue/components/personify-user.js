import * as SearchStore from './../search-store.js';
import _ from 'lodash';

export const PersonifyUserComponent = {
    props: ['users', 'activeid'],
    template: `<div class="topbar-accountInfo personify-user">
                    <div class="topbarHelpMenuButton topbarHelpMenuButton-textButton" v-on:click="toggleDropdown()">
                        Personify a user
                        <svg class="icon DownIcon topbarHelpMenuButton-textButtonDownIcon" title="DownIcon" viewBox="0 0 32 32">
                            <path d="M4.686,12.686l9.899,9.9c0.781,0.781,2.047,0.781,2.828,0l9.9-9.9l-2.475-2.475L16,19.05l-8.839-8.839L4.686,12.686z"></path>
                        </svg>
                    </div>
                    <div class="dropdown-anchor omnibutton" v-on:click="toggleDropdown()">
                        <a class="omnibutton-button">
                            <svg v-if="activeid === 0" class="icon PlusIcon omnibutton-plusIcon" title="PlusIcon" viewBox="0 0 32 32">
                                <polygon points="28,14 18,14 18,4 14,4 14,14 4,14 4,18 14,18 14,28 18,28 18,18 28,18"></polygon>
                            </svg>
                            <span class="personify-user-initials" v-if="activeid != 0">{{initials}}</span>
                        </a>
                    </div>
                    <div v-bind:class="{'visible': dropdownIsVisible}" class="dropdown dropdown-personify" id="search_sort_menu_dropdown_menu" style="z-index: 2000;">
                        <div class="dropdown-menu some-items-are-selected ">
                                <a v-for="user in users" v-on:click="selectUser(user.id)" id="modification_time" class="menu-item selected">
                                <svg v-if="activeid === user.id" class="svgIcon dropdownMenuItem-selectedIcon" viewBox="0 0 32 32" title="selected">
                                    <polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon>
                                </svg><span data-icon="modifiedtime" class="modifiedtime glyph dropdown-menu-item-glyph prod"></span><span class="dropdown-menu-item-label"><span class="label">{{user.name}}</span></span>
                            </a>
                            <a v-if="activeid != 0" v-on:click="selectUser(0)" id="modification_time" class="menu-item selected">
                                <span data-icon="modifiedtime" class="modifiedtime glyph dropdown-menu-item-glyph prod"></span><span class="dropdown-menu-item-label"><span class="label">Clear current user...</span></span>
                            </a>
                        </div>
                    </div>
                </div>`,
    data: () => ({
        dropdownIsVisible: false
    }),
    computed: {
        initials: function () {
            return this.getActiveUserInitials(this.users, this.activeid);
        }
    },
    methods: {
        toggleDropdown() {
                this.dropdownIsVisible = !this.dropdownIsVisible;
        },
        selectUser(id) {
            this.toggleDropdown();
            SearchStore.store.updatePerso(id);
        },
        getActiveUserInitials(users, id) {
            return _.flow(
                this.findActiveUserName,
                this.generateInitials
            )(users, id);
        },
        findActiveUserName(users, id) {
            return _.find(users, ['id', id]).name;
        },
        generateInitials(name) {
            return name.split(" ").map(str => str.charAt(0)).slice(0, 2).join("");
        }
    }
}