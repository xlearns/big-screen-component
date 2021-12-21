import { defineComponent, onMounted, reactive,toRefs } from "vue";
const view = defineComponent({
	name:"bd-view",
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
	setup(props){
		const state = reactive({
			style: {
				width: props.width + "px",
				height: props.height + "px",
				transform: "scale(1) translate(-50%, -50%)",
			}
		})
		
		const methods = {
			getScale() {
				const w = window.innerWidth / props.width;
				const h = window.innerHeight / props.height;
				return w < h ? w : h;
			},
			setScale() {
				state.style.transform =
					"scale(" + methods.getScale() + ") translate(-50%, -50%)";
			},
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
			}
		}

		window.onresize = methods.Debounce(methods.setScale, 100);
		onMounted(()=>{
			methods.setScale();
		})
		return {
			...toRefs(state),
			...methods
		}
	},
	render () {
		const style = `transform-origin: 0 0;position: absolute;left: 50%;top: 50%;transition: 0.3s;`
		return (
			<div  style={[this.style,style]} >
				{ this.$slots.default?.() }
			</div>
		)
	}
})

export default view