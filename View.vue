<template>
	<div class="bd-my-view" :style="style">
		<slot></slot>
	</div>
</template>
<script lang="ts">
export default {
	name: "Shell",
	props: {
		width: {
			type: String,
			default: 1920,
		},
		height: {
			type: String,
			default: 969,
		},
	},
	data() {
		return {
			style: {
				width: this.width + "px",
				height: this.height + "px",
				transform: "scale(1) translate(-50%, -50%)",
			},
		};
	},
	mounted() {
		this.setScale();
		window.onresize = this.Debounce(this.setScale, 100);
	},
	methods: {
		Debounce: (fn, t) => {
			const delay = t || 500;
			let timer;
			return function () {
				const args = arguments;
				if (timer) {
					clearTimeout(timer);
				}
				const context = this;
				timer = setTimeout(() => {
					timer = null;
					fn.apply(context, args);
				}, delay);
			};
		},
		getScale() {
			const w = window.innerWidth / this.width;
			const h = window.innerHeight / this.height;
			return w < h ? w : h;
		},
		setScale() {
			this.style.transform =
				"scale(" + this.getScale() + ") translate(-50%, -50%)";
		},
	},
};
</script>
<style lang="scss" scoped>
.bd-my-view {
	transform-origin: 0 0;
	position: absolute;
	left: 50%;
	top: 50%;
	transition: 0.3s;
}
</style>
