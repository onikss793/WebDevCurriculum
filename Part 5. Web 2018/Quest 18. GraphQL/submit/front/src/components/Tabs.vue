<template>
	<div id="tab" class="ui top attached tabular menu">
		<Tab
			:index="index"
			:key="index"
			:note="note"
			:isSelected='note.isSelected'
			class="item"
			v-for="(note, index) in notes"
		></Tab>
	</div>
</template>

<script>

	import Tab from './Tab';

	export default {
		name: 'Tabs',
		components: { Tab },
		props: {
			notes: Array
		}
	};
</script>
<style scoped>
	#tab {
		width: 80%;
	}
</style>
