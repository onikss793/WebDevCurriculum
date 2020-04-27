<template>
	<td>{{ data }}</td>
</template>

<script>
	export default {
		name: "Column",
		props: {
			data: [String, Number]
		}
	}
</script>

<style></style>