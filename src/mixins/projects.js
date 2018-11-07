import { mapGetters } from 'vuex';

export default {

	computed: {
		...mapGetters([
			'getProject'
		]),

		type() {
			return this.$route.params.type;
		},

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

					return result;
				}, { mobile: [], regular: [], horiz: [] } );

		}

	},
	watch: {

		'$route'(route) {
			this.setProjects( route.params.type );
		}

	},
	mounted() {
		this.setProjects( this.type );
	},
	methods: {
		setProjects( type ) {
			this.$store.dispatch('setProjects', type );
		}
	}

};