import api from '../../api';

const state = {
	notes: [],
	modal: false
};

const getters = {
	getSelectedNote(state) {
		return state.notes.filter(note => note.isSelected)[0];
	}
};

const mutations = {
	addNote(state, note) {
		state.notes.push(note);
	},
	setNotes(state, notes = []) {
		state.notes = notes;
	},
	deleteNote(state, idx) {
		state.notes.splice(idx, 1);
	},
	setSelectedNote(state, index = state.notes.length - 1) {
		state.notes = state.notes.map((note, i) => {
			note.isSelected = i === index;

			return note;
		})
	},
	turnModal(state, bool) {
		state.modal = bool;
	},
	setCursorPositionForSelectedTab(state, cursor_position) {
		state.notes = state.notes.map(note => {
			if (note.isSelected) {
				note.cursor_position = cursor_position;
			}

			return note;
		})
	}
};

const actions = {
	createNewNote({ commit }, note = {
		title: '',
		body: '',
		isSelected: false,
		cursor_position: 0
	}) {
		commit('addNote', note);
		commit('setSelectedNote');
	},
	// eslint-disable-next-line no-unused-vars
	sendNote({ commit }, { id = null, title, body }) {
		if (id) {
			return api().updateNote(id, title, body);
		} else {
			return api().postNote(title, body);
		}
	},
	// eslint-disable-next-line no-unused-vars
	loadList({ commit }) {
		return api().loadNotes();
	},
	// eslint-disable-next-line no-unused-vars
	loadSingle({ commit }, id) {
		return api().loadSingleNote(id);
	},
	// eslint-disable-next-line no-unused-vars
	uploadNoteSession({ commit }, notes) {
		return api().updateNoteSession(notes);
	},
	// eslint-disable-next-line no-unused-vars
	loadNoteSession({ commit }) {
		return api().loadNoteSession();
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
