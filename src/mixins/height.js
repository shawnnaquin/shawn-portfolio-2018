import { debounce } from 'lodash';

export default {

	computed: {

		d() {
			return debounce( this.doHeight, 5, { 'leading': true, 'trailing': true } )
		}

	},

	beforeDestroy() {
		window.removeEventListener('resize', this.d );
		document.body.style.height = '';
		document.ontouchmove = function (e) {
		  return true;
		}
	},

	methods: {

		doHeight() {
			this.height = window.innerHeight + 'px';
			document.body.style.height = window.innerHeight + 'px';
			document.ontouchmove = function (e) {
				e.preventDefault();
			};
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
		this.setupBackground();
		setTimeout( ()=> {
			window.dispatchEvent(new Event('resize'));
		}, 500 );
	}

};