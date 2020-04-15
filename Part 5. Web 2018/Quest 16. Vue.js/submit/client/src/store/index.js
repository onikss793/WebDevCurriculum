import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import note from './modules/note';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        note
    }
});
