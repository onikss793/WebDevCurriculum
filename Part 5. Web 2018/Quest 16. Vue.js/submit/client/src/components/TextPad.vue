<template>
	<textarea
		ref='text'
		v-model='note.body'
		class="pad"
		@keydown='getCursorPosition'
		@mousedown='getCursorPosition'
	></textarea>
</template>

<script>
	export default {
		name: 'TextPad',
		props: {
			note: Object
		},
		methods: {
			getCursorPosition(e) {
				this.note.cursor_position = e.target.selectionStart;
			}
		},
		mounted() {
			this.$refs.text.focus();
			this.$refs.text.selectionStart = this.note.cursor_position;
			this.$refs.text.selectionEnd = this.note.cursor_position;
		}
	}
</script>

<style scoped>
	.pad {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		font-size: 15px;
		padding: 50px;
	}
</style>