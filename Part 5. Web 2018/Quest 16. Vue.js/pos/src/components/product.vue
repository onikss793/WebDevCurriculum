<template>
	<tr>
		<Column
			v-for='(data, index) in menu'
			:key='index'
			:data='data'
		></Column>
	</tr>
</template>

<script>
	import Column from "./Column";

	export default {
		name: 'Product',
		components: { Column },
		props: {
			menu: Object,
			index: Number
		}
	}
</script>

<style>

</style>
