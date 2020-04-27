import Axios from 'axios';

export default () => {
	const token = localStorage.getItem('token');

	Axios.defaults.baseURL = 'http://localhost:8000';
	Axios.defaults.headers.common = { Authorization: token };

	return {
		login(data) {
			return Axios.post('/user', data);
		},
		postNote(note) {
			return Axios.post('/note', note);
		},
		loadNotes() {
			return Axios.get('/note');
		},
		loadSingleNote(id) {
			return Axios.get('/note/' + id);
		},
		updateNote(note) {
			return Axios.post('/note/' + note.id, note);
		},
		updateNoteSession(notes) {
			return Axios.post('/session', notes);
		},
		loadNoteSession() {
			return Axios.get('/session');
		}
	};
};