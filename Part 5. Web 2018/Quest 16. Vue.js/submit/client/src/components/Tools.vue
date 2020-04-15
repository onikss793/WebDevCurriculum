<template>
	<div class="tools">
		<button @click='createNote' class="ui button">새 파일</button>
		<button @click='saveNote' class="ui button">저장</button>
		<button @click='loadNote' class="ui button">불러오기</button>
		<button @click='logUser' class="ui button">{{ renderLogText }}</button>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		name: 'Tools',
		methods: {
			...mapActions('note', [
				'createNewNote',
				'sendNote',
				'loadList',
				'uploadNoteSession'
			]),
			...mapActions('auth', ['logout', 'login']),
			createNote() {
				this.createNewNote();
			},
			async saveNote() {
				const note = this.$store.getters["note/getSelectedNote"];
				const response = await this.sendNote(note);

				(response.status === 200)
				? alert('성공적으로 저장했습니다!')
				: alert(response.message);

			},
			async loadNote() {
				this.$emit('loadClick');
			},
			async logUser() {
				if (this.$store.getters["auth/isLoggedIn"]) {
					const cursor_position = document.querySelector('.pad').selectionStart;

					this.$store.commit('note/setCursorPositionForSelectedTab', cursor_position);

					const notes = this.$store.state.note.notes;
					const response = await this.uploadNoteSession(notes);

					if (response.status === 200) {
						this.logout();
						this.$store.commit('note/setNotes', []);
					}
				} else {
					this.$store.commit('auth/setModal', true);
				}
			}
		},
		computed: {
			renderLogText() {
				if (this.$store.getters['auth/isLoggedIn']) {
					return '로그아웃';
				} else {
					return '로그인';
				}
			}
		}
	}
</script>

<style>
	.tools {
		position: absolute;
		left: 10%;
		top: 1%;
	}
</style>