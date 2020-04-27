import Axios from 'axios';
import { getNote, getManyNotes, loadSessionData } from './query';
import { logIn, createNote, _updateNote, uploadSessionData } from './mutation';

export default () => {
	const token = localStorage.getItem('token');

	Axios.defaults.baseURL = 'http://localhost:8000/api';
	Axios.defaults.headers.common = { Authorization: token ? token : null, 'Content-Type': 'application/graphql' };

	return {
		login(id, pw) {
			return Axios.post('', logIn(id, pw));
		},
		postNote(title, body) {
			return Axios.post('', createNote(title, body));
		},
		loadNotes() {
			return Axios.post('', getManyNotes());
		},
		loadSingleNote(note_id) {
			return Axios.post('', getNote(note_id));
		},
		updateNote(id, title, body) {
			return Axios.post('', _updateNote(id, title, body));
		},
		updateNoteSession(notes) {
			return Axios.post('', uploadSessionData(notes));
		},
		loadNoteSession() {
			return Axios.post('', loadSessionData());
		}
	};
};