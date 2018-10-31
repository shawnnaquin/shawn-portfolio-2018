<template>

	<div>

		<h1 style="color:Purple" class="push"> {{$route.name}} Projects...</h1>

		<div :class="[ 'portfolio' ]">

			<template v-for="project in projects($route.name)">
				<figure>
					<img :src="project.image" :alt="project.title" />
					<figcaption>{{project.title}}</figcaption>
				</figure>
			</template>

		</div>

	</div>

</template>

<script>

	import { mapGetters } from 'vuex';

	export default {

		computed: {
			...mapGetters([
				`projects`
			])
		},
		watch: {
			'$route'(newa) {
				this.dispatchProjects(newa.name);
			},
		},
		mounted() {
			this.dispatchProjects(this.$route.name);
		},
		methods: {
			dispatchProjects(name) {
				this.$store.dispatch('setProjects', name);
			} 
		}
	}
</script>

<style lang="scss" scoped>

	.portfolio {
		padding: 0 10%;
  		display: grid;
		grid-template-columns: repeat( auto-fill, minmax(300px, 1fr) );
		grid-gap: 2rem;
	}
	h1 {
		text-transform:capitalize;
	}
	figure {
		overflow:hidden;
		margin:0;
	}
	img {
		width:100%;
		// max-height:300px;
	}
</style>