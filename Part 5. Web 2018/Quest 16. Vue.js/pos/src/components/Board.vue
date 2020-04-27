<template>
	<div class="board">
			<Menu
				v-for='(menu, index) in menus'
				:key='index'
				:name='menu.name'
				class="menu-title"
				@menuClick='menuClick'
			></Menu>
	</div>
</template>

<script>
	import Menu from "./Menu";
	import { mapState } from "vuex";

	export default {
		name: 'Board',
		components: { Menu },
		computed: {
			...mapState('menu', ['menus'])
		},
		methods: {
			menuClick(name) {
				const ordered = this.menus.filter(menu => menu.name === name)[0];

				this.$emit('menuClick', ordered);
			}
		}
	}
</script>

<style>
	.board {
		display: grid;
		grid-template-columns: 25% 25% 25% 25%;
		grid-template-rows: 25% 25% 25% 25%;
		height: 60%;
	}
</style>