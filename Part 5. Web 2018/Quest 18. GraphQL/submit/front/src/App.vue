<template>
	<div id="app">
		<LoginModal v-if="loginModal"></LoginModal>
		<NotesModal v-if='notesModal'></NotesModal>
		<Tools @loadClick='getNotes'></Tools>
		<Tabs :notes='notes'></Tabs>
		<Board :notes='notes'></Board>
	</div>
</template>

<script>
	import NotesModal from "./components/NotesModal";
	import LoginModal from './components/LoginModal';
	import Board from './components/Board';
	import Tabs from './components/Tabs';
	import Tools from './components/Tools';
	import { mapState } from 'vuex';

	export default {
		name: 'App',
		components: {
			Board,
			LoginModal,
			Tabs,
			Tools,
			NotesModal
		},
		data() {
			return {
				noteList: []
			};
		},
		computed: {
			...mapState('note', ['notes']),
			loginModal() {
				return this.$store.getters['auth/isModalOn'];
			},
			notesModal() {
				return this.$store.state.note.modal;
			}
		},
		methods: {
			getNotes(data) {
				this.noteList = data;
				this.$store.commit('note/turnModal', true);
			},
			setNotes() {
				this.notes = this.$store.state.note.notes;
			}
		},
		beforeMount() {
			this.$store.commit('auth/setLoggedIn');
		}
	};
</script>

<style>
	input,
	label,
	select,
	button,
	textarea {
		margin: 0;
		border: 0;
		padding: 0;
		display: inline-block;
		vertical-align: middle;
		white-space: normal;
		background: none;
		line-height: 1;
	}
	textarea:focus,
	input:focus,
	button:focus {
		outline: 0;
	}

	button:hover {
		cursor: pointer;
	}

	#app {
		position: relative;
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
