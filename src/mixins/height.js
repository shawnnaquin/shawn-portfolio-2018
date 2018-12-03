import { debounce } from 'lodash';

export default {

	computed: {

		d() {
			return debounce( this.doHeight, 5, { 'leading': true, 'trailing': true } )
		}

	},

	data() {
		return {
			heightTrigger: false,
			forceNoTouchMove: false,
			height: 'auto'
		}
	},

	beforeDestroy() {
		this.killHeight();
	},

	mounted() {
		if ( this.heightTrigger ) {
			this.startHeight();
		} else {
			this.killHeight();
		}
	},

	methods: {

		doHeight() {
			this.height = window.innerHeight + 'px';
			document.body.style.height = window.innerHeight + 'px';
			if( this.forceNoTouchMove ) {
				document.ontouchmove = function (e) {
					console.log('touch');
					e.preventDefault();
				};
			}
			document.documentElement.scrollTop = document.body.scrollTop = 0;
		},

		setupBackground() {
			this.doHeight();
			window.addEventListener('resize', this.d);
		},

		startHeight() {
			this.setupBackground();
			setTimeout( ()=> {
				window.dispatchEvent(new Event('resize'));
			}, 500 );
		},

		killHeight() {
			window.removeEventListener('resize', this.d );
			document.body.style.height = '';
			document.ontouchmove = function (e) {
			  return true;
			}
		}

	},

	watch: {

		'heightTrigger'(h) {
			if ( h ) {
				this.startHeight();
			} else {
				this.killHeight();
			}
		},

		'height'(h) {
			if ( !h ) {
				window.removeEventListener('resize', this.d );
			} else {
				this.doHeight();
			}
		}
	}

};