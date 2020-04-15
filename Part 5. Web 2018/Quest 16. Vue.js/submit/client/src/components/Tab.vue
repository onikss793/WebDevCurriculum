<template>
	<label class='tab' :class='{ active: isSelected }'>
		<input @click='selectNote' v-model='note.title' placeholder="제목" />
		<button @click='cancelClicked' class="close">X</button>
	</label>
</template>

<script>
	export default {
		name: 'Tab',
		props: {
			note: Object,
			index: Number,
			isSelected: Boolean
		},
		computed: {},
		methods: {
			cancelClicked() {
				this.$store.commit('note/deleteNote', this.index);
				this.$store.commit('note/setSelectedNote');
			},
			selectNote() {
				this.$store.commit('note/setSelectedNote', this.index);
			}
		}
	};
</script>
<style scoped>
	.close {
		font-size: 20px;
		opacity: 0.5;
	}
</style>
