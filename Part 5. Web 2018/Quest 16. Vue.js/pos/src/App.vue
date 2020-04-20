<template>
	<div id="app">
		<div class='left'>
			<Cart :ordered='ordered'></Cart>
			<div class='tools'>
				<Calc @cashEnter='cashEnter'></Calc>
				<Bill
					:paid='paid'
					:billData='bill'
				></Bill>
			</div>
		</div>

		<div class="right">
			<Board @menuClick='menuClick'></Board>
			<Pay @cash='cash' @card='card'></Pay>
		</div>
	</div>
</template>

<script>
	import Cart from './components/Cart';
	import Calc from './components/Calc';
	import Bill from "./components/Bill";
	import Board from "./components/Board";
	import Pay from "./components/Pay";

	export default {
		name: 'App',
		components: {
			Pay,
			Board,
			Bill,
			Cart,
			Calc
		},
		data() {
			return {
				ordered: [],
				paid: null,
				bill: {
					amount: null,
					price: null,
					discount: null,
					total: null
				}
			}
		},
		methods: {
			menuClick(menu) {
				if (this.isReplicated(menu)) {
					const prod = this.findReplicatedMenu(menu);
					this.addOneMore(prod);
				} else {
					const prod = {
						index: this.ordered.length + 1,
						name: menu.name,
						amount: 1,
						price: menu.price,
						discount: 0,
						total: menu.price
					};
					this.addOne(prod);
				}
				this.billData();
			},
			addOne(prod) {
				this.ordered.push(prod);
			},
			addOneMore(prod) {
				prod.amount++;
				prod.total = prod.amount * prod.price;
			},
			isReplicated(menu) {
				if (this.ordered.length) {
					for (const original of this.ordered) {
						if (original.name === menu.name) {
							return true;
						}
					}
				}
				return false;
			},
			findReplicatedMenu(menu) {
				for (const original of this.ordered) {
					if (original.name === menu.name) {
						return original;
					}
				}
			},
			cashEnter(value) {
				this.paid
					? this.paid += value
					: this.paid = value;
			},
			billData() {
				this.bill = this.ordered.reduce((acc, curr) => {
					return {
						amount: curr.amount + acc.amount,
						price: curr.total + acc.total,
						discount: curr.discount + acc.discount,
						total: curr.total + acc.total
					}
				})
			},
			cash() {
				if (this.bill.total <= this.paid) {
					alert('결제 완료');
					window.location.reload();
				}
			},
			card() {
				alert('결제 완료');
				window.location.reload();
			}
		}
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		display: flex;
		margin: auto;
		width: 80vw;
		height: 100vh;
		border: 1px solid rgb(236, 236, 236);
	}

	.left {
		width: 50%;
		height: 100%;
	}

	.tools {
		display: flex;
		height: 40%;
	}

	.right {
		width: 50%;
		height: 100%;
	}

	* {
		box-sizing: border-box;
	}

	html,
	body,
	div,
	span,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	abbr,
	address,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	samp,
	small,
	strong,
	sub,
	sup,
	var,
	b,
	i,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	figcaption,
	figure,
	footer,
	header,
	hgroup,
	menu,
	nav,
	section,
	summary,
	time,
	mark,
	audio,
	video {
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		font-size: 100%;
		vertical-align: baseline;
		background: transparent;
	}

	body {
		line-height: 1;
	}

	article,
	aside,
	details,
	figcaption,
	figure,
	footer,
	header,
	hgroup,
	menu,
	nav,
	section {
		display: block;
	}

	nav ul {
		list-style: none;
	}

	blockquote,
	q {
		quotes: none;
	}

	blockquote:before,
	blockquote:after,
	q:before,
	q:after {
		content: "";
		content: none;
	}

	a {
		margin: 0;
		padding: 0;
		font-size: 100%;
		vertical-align: baseline;
		background: transparent;
	}

	/* change colours to suit your needs */
	ins {
		background-color: #ff9;
		color: #000;
		text-decoration: none;
	}

	/* change colours to suit your needs */
	mark {
		background-color: #ff9;
		color: #000;
		font-style: italic;
		font-weight: bold;
	}

	del {
		text-decoration: line-through;
	}

	abbr[title],
	dfn[title] {
		border-bottom: 1px dotted;
		cursor: help;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	/* change border colour to suit your needs */
	hr {
		display: block;
		height: 1px;
		border: 0;
		border-top: 1px solid #cccccc;
		margin: 1em 0;
		padding: 0;
	}

	th {
		padding: 8px;
	}

	td {
		border: 1px solid grey;
		padding: 8px;
	}

	input,
	select {
		vertical-align: middle;
	}

	ul {
		list-style: none;
		margin-block-start: 0;
		margin-block-end: 0;
	}

	button {
		border: none;
		margin: 0;
		padding: 0;
		width: auto;
		overflow: visible;
		background: transparent;
		color: inherit;
		font: inherit;
		line-height: normal;
		-webkit-font-smoothing: inherit;
		-moz-osx-font-smoothing: inherit;
		-webkit-appearance: none;
	}

	button:focus {
		outline: none;
	}
</style>
