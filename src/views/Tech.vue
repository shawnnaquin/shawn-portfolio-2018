<template>

	<div :class="['max-width']" style="overflow: hidden; min-height:75vh;" >
		<h1>
			Featured Web Technologies
		</h1>

		<techList :techList="localList" />

	</div>

</template>

<script>
import projects from '@/mixins/projects';
import techList from '@/components/techList';

export default {

	mixins: [projects],
	components: {
		techList
	},
	data() {
		return {
			localList: []
		}
	},
	mounted() {
		this.$store.state.loading = false;
	},
	watch: {
		'$store.state.projects'(p) {
			if ( Object.keys(p).length == this.$store.state.types.length ) {
				this.compileList();
			}
		}
	},
	methods: {
		compileList() {
			for( let type in this.$store.state.projects ) {
				for ( let project in this.$store.state.projects[ type ] ) {
					let techList = this.$store.state.projects[ type ][ project ].content['techList']
					for ( let tech in techList ) {
						if ( !this.localList.includes( techList[tech] ) ) {
							this.localList.push( techList[tech] );
						}
					}
				}
			}
		}
	},
};

</script>

<style lang="scss" scoped>
h1 {
	text-align:left;
	margin-top:74.5px;
	max-width:75%;
	text-transform:capitalize;
	display: inline-block;
	width: auto;
	position: relative;
	@media only screen and (max-width:630px) {
		font-size:24px;
	}
}
</style>