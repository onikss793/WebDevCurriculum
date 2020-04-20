<template>
	<div class="calc">
		<div class="screen">{{ value }}</div>
		<div class="pads">
			<div @click='padClick' class="pad">7</div>
			<div @click='padClick' class="pad">8</div>
			<div @click='padClick' class="pad">9</div>

			<div @click='padClick' class="pad">4</div>
			<div @click='padClick' class="pad">5</div>
			<div @click='padClick' class="pad">6</div>

			<div @click='padClick' class="pad">1</div>
			<div @click='padClick' class="pad">2</div>
			<div @click='padClick' class="pad">3</div>

			<div @click='padClick' class="pad zero">0</div>
			<div @click='padClick' class="pad">00</div>
			<div @click='padClick' class="pad">000</div>

			<div @click='padClick' class="pad clear">CLR</div>
			<div @click='padClick' class="pad enter">입력</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Calc',
		data() {
			return {
				value: ''
			}
		},
		methods: {
			padClick(e) {
				const value = e.target.textContent;

				if (this.isNumber(value)) {
					this.value += value;
				} else {
					this.isEnter(value) && this.$emit('cashEnter', Number(this.value))
					this.clear();
				}
			},
			isEnter(value) {
				return value === '입력';
			},
			isNumber(value) {
				return !isNaN(Number(value));
			},
			clear() {
				this.value = '';
			}
		},
		computed: {}
	}
</script>

<style scoped>
	.calc {
		padding: 10px;
		width: 50%;
		background-color: rgb(180, 180, 180);
	}

	.screen {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 10%;
		margin-bottom: 15px;
		padding-right: 10px;
		font-size: 15px;
		background-color: white;
		border-radius: 5px;
	}

	.pads {
		display: grid;
		grid-template-columns: 33.3% 33.3% 33.3%;
		grid-template-rows: 20% 20% 20% 20% 20%;
		height: 80%;
	}

	.zero {
		grid-column: 1;
		grid-row: 4 / 6;
	}

	.clear {
		grid-column: 2;
		grid-row: 5 / 6;
	}

	.enter {
		grid-column: 3;
		grid-row: 5 / 6;
	}

	.pad {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		color: white;
		margin: 5px;
		background-color: rgb(180, 180, 180);
		border: 1px solid white;
		border-radius: 10px;
	}

	.pad:hover {
		cursor: pointer;
	}

	.pad:active {
		background-color: grey;
	}
</style>