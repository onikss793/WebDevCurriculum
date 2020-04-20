<template>
	<div class="payment">
		<button @click='card'>카드</button>
		<button @click='cash'>현금</button>
		<button>취소</button>
	</div>
</template>

<script>
	export default {
		name: "Payment",
		methods: {
			card() {
				this.$emit('card');
			},
			cash() {
				this.$emit('cash');
			}
		}
	}
</script>

<style scoped>
	.payment {
		display: flex;
		justify-content: flex-end;
		height: 10%;
	}

	button {
		border: 1px solid rgb(180, 180, 180);
		width: 33.8%;
		height: 100%;
	}

	button:hover {
		cursor: pointer;
	}

	button:active {
		background-color: rgb(236, 236, 236);
	}
</style>