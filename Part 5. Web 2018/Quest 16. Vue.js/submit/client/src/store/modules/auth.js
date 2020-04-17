import api from '../../api';

const state = {
	loggedIn: null,
	username: null,
	id: null,
	pw: null,
	modal: true
};

const getters = {
	isLoggedIn(state) {
		return state.loggedIn?.length > 60;
	},
	getUsername(state) {
		return state.username;
	},
	isModalOn(state) {
		if (state.loggedIn?.length > 67) {
			return false;
		} else if (state.modal === false) {
			return false;
		}
		return true;
	}
};

const mutations = {
	setLoggedIn(state) {
		state.loggedIn = localStorage.getItem('token');
	},
	setUsername(state, username) {
		state.username = username;
	},
	setId(state, id) {
		state.id = id;
	},
	setPw(state, pw) {
		state.pw = pw;
	},
	setModal(state, bool) {
		state.modal = bool;
	}
};

const actions = {
	async login({ commit }, data) {
		const response = await api().login(data);

		if (response.status === 200) {
			const { username, token } = response.data.data;

			localStorage.setItem('token', token)
			commit('setUsername', username);
			commit('setLoggedIn');
			commit('setModal', false);
		}
	},
	logout({ commit }) {
		localStorage.clear();
		commit('setModal', true);
		commit('setLoggedIn');
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
