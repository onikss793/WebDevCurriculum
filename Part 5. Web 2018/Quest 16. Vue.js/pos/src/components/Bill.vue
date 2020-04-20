<template>
	<ul class="bill">
		<li class="bill-list">
			<span class="option">총 수량</span>
			<span class="result">{{ billData.amount }}</span>
		</li>
		<li class="bill-list">
			<span class="option">총 매출</span>
			<span class="result">{{ billData.price }}</span>
		</li>
		<li class="bill-list">
			<span class="option">할인</span>
			<span class="result">{{ billData.discount }}</span>
		</li>
		<li class="bill-list">
			<span class="option">총 금액</span>
			<span class="result">{{ billData.total }}</span>
		</li>
		<li class="bill-list">
			<span class="option">지불한<br /> 금액</span>
			<span class="result">{{ paid }}</span>
		</li>
		<li class="bill-list">
			<span class="option">거스름돈</span>
			<span class="result">{{ getChange }}</span>
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'Bill',
		props: {
			billData: [Object, Number],
			paid: Number
		},
		computed: {
			getChange() {
				if (this.paid || this.billData.total) {
					return this.paid - this.billData.total;
				} else {
					return null;
				}
			}
		}
	}
</script>

<style scoped>
	.bill {
		padding: 10px;
		width: 50%;
		height: 100%;
		background-color: rgb(180, 180, 180);
	}

	.bill-list {
		display: flex;
		align-items: center;
		height: 15%;
		padding: 10px;
	}

	.option {
		display: flex;
		align-items: center;
		font-size: 15px;
		color: white;
		width: 30%;
		height: 90%;
	}

	.result {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 100%;
		width: 70%;
		padding-right: 10px;
		background-color: white;
		font-size: 15px;
		border-radius: 5px;
	}
</style>