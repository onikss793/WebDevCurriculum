<template>
	<div class="cart">
		<table>
			<tbody>
			<tr>
				<th>순번</th>
				<th>상품명</th>
				<th>수량</th>
				<th>단가</th>
				<th>할인</th>
				<th>금액</th>
			</tr>
			<Product
				v-for='(menu, index) in ordered'
				:key='index'
				:menu='menu'
				:index='index'
			></Product>
			</tbody>
		</table>
	</div>
</template>

<script>
	import Product from "./product";

	export default {
		name: 'Cart',
		components: { Product },
		props: {
			ordered: Array
		}
	}
</script>

<style scoped>
	.cart {
		height: 60%;
	}

	table {
		width: 100%;
	}

	tr:first-child {
		padding: 5px;
		font-size: 15px;
		color: white;
		background-color: rgb(44, 44, 44);
	}

	tr:first-child th {
		border: 1px solid white;
	}

	tr {
		text-align: center;
	}
</style>