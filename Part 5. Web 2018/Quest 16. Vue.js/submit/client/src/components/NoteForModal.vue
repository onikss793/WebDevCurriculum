<template>
	<div id='list' @click='clicked' class="ui vertical menu">
		<div class="item">{{ note.title }}</div>
	</div>
</template>

<script>
	export default {
		name: 'NoteForModal',
		props: {
			note: Object
		},
		methods: {
			clicked() {
				this.$emit('noteClicked', this.note);
			}
		}
	}
</script>

<style>
	#list {
		width: 80%;
		margin: 0;
	}
	#list:hover {
		cursor: pointer;
		background-color: #E0E1E2;
	}
</style>