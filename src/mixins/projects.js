import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			type: false,
		}
	},
	computed: {
		...mapGetters([
			'getProject'
		]),

		projects() {
			if ( !this.type ) return false;
			return this.getProject( { name: this.type } );
		},

		project() {
			if ( !this.$route.params.project ) return false;
			return this.projects[ this.$route.params.project ];
		},

		images() {

			if ( !this.project ) return false;

			return this.project.content.images.reduce( (result, item ) => {

					if ( item.path.includes( 'mobile' ) ) {
						result.mobile.push( item );
					} else if ( item.path.includes( 'horiz' ) ) {
						result.horiz.push( item );
					} else {
						result.regular.push( item );
					}

					if( item.path.includes(`one.${this.$route.params.project}`) ) {
						result.video = item.path;
					}

					return result;

				}, { mobile: [], regular: [], horiz: [], video: false } );

		}

	},
	watch: {

		'$route'(route) {
			this.setProjects( route.params.type );
		}

	},
	mounted() {
		this.setProjects( this.$route.params.type );
	},
	methods: {
		setProjects( type ) {
			this.type = type;
			this.$nextTick(()=> {
				this.$store.dispatch('setProjects', type );
			});
		}
	}

};