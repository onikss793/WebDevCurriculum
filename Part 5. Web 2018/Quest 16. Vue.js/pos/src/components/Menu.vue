<template>
	<div @click='menuClick' class="menu">
		<span>{{ name }}</span>
	</div>
</template>

<script>
	export default {
		name: "Menu",
		props: {
			name: String
		},
		methods: {
			menuClick() {
				this.$emit('menuClick', this.name);
			}
		}
	}
</script>

<style scoped>
	.menu {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		box-shadow: 0 0 1px 1px rgb(190, 190, 190);
	}

	.menu:hover {
		cursor: pointer;
	}

	.menu:active {
		background-color: rgb(236, 236, 236);
	}
</style>