<template>

  <div class="project">

  	<h1>Some Name of Project</h1>
  	<h3>some tag line</h3>

  	<div :class=" 'images' " >
  		<template v-for="image in cats">
  			<img src="" alt="cats" />
  		</template>
  	</div>

  	<p>
  		description of the project!
  	</p>

  </div>

</template>

<script>

	export default {
		data() {
			return {
				imageDir: '../public/img/icons/',
				imgs: {}
			}
		},
		mounted() {},
		methods: {

			getRandomSize(min, max) {
				return Math.round( Math.random() * (max - min) + min );
			},
			setCats() {
				for (var i = 0; i < 25; i++) {
				  var width = this.getRandomSize(200, 400);
				  var height =  this.getRandomSize(200, 400);
				  this.cats.push( [width, height] )
				}
			}
		}
	};

</script>

<style lang="scss" scoped >
	.images {
		line-height: 0;
		column-count: 5;
		column-gap: 0;
		column-count: 3;
	}
	img {
		width: 100% !important;
		height: auto !important;
	}
</style>