<template>
	<div id="board" class="ui bottom attached segment">
		<TextPad
			:key='index'
			:note='note'
			v-for='(note, index) in selectedNote'
		></TextPad>
	</div>
</template>

<script>
	import TextPad from './TextPad';

	export default {
		name: 'Board',
		components: {
			TextPad
		},
		props: {
			notes: Array
		},
		computed: {
			selectedNote() {
				return this.notes?.filter(note => note.isSelected);
			}
		}
	};
</script>

<style scoped>
	#board {
		height: 80%;
		width: 80%;
		position: relative;
	}
</style>
