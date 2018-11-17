import { debounce } from 'lodash';

export default {

	data() {
		return {

		}
	},

	computed: {

		d() {
			return debounce( this.doHeight, 5, { 'leading': true, 'trailing': true } )
		}

	},

	beforeDestroy() {
		window.removeEventListener('resize', this.d );
	},

	methods: {

		doHeight() {
			this.$refs.background.style.height = window.innerHeight + 'px';
			document.documentElement.scrollTop = document.body.scrollTop = 0;
		},

		setupBackground() {
			this.doHeight();
			window.addEventListener('resize', this.d);
		}

	},

	watch: {
		'height'(h) {
			if ( !h ) {
				window.removeEventListener('resize', this.d );
			} else {
				this.doHeight();
			}
		}
	},

	mounted() {
		setTimeout( ()=> {
			this.setupBackground();
			window.dispatchEvent(new Event('resize'));
		}, 500 );
	}

};