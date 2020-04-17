<template>
	<div class="modal-background">
		<div id="modal" class="ui active modal">
			<i @click="cancelModal" class="close icon"></i>
			<div class="header">
				불러올 노트
			</div>
			<div class='contents'>
				<NoteForModal
					v-for='(note, index) in noteList'
					:key='index'
					:note='note'
					@noteClicked='noteClicked'
				></NoteForModal>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import NoteForModal from "./NoteForModal";

	export default {
		name: 'NotesModal',
		components: { NoteForModal },
		data() {
			return {
				noteList: []
			}
		},
		methods: {
			...mapActions('note', ['loadList', 'loadSingle', 'createNewNote']),
			cancelModal() {
				this.$store.commit('note/turnModal', false);
			},
			async noteClicked(note) {
				const response = await this.loadSingle(note.id);

				if (response.status === 200) {
					this.createNewNote(response.data.data);
					this.cancelModal();
				}
			}
		},
		async beforeMount() {
			const response = await this.loadList();

			if (response.status === 200) this.noteList = response.data.data;
		}
	}
</script>

<style scoped>
	.modal-background {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: grey;
		opacity: 0.7;
		z-index: 20;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#modal {
		width: 600px;
		padding: 0;
	}

	.contents {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 40px;
		margin-bottom: 70px;
	}
</style>