<template>
	<video
		:class="[ { ['focus']: isPlaying } ]"
		poster="https://via.placeholder.com/1920x1080?text=Video"
	>
	</video>
</template>

<script>

export default {
	data() {
		return {
			isPlaying: false
		}
	}
};

</script>

<style lang="scss" scoped>

	video {
	  width:100%;
	  display:block;
	  transform-origin:right;
	  transform: translateX(-16%) rotateY(-43deg);
	  box-shadow: 8px 8px 40px darken(white,20%);
	  transition: transform 200ms ease;
	  &:hover, &:active, &:focus, &.focus {
	  	  transform: translateX(0) rotateY(0deg);
	  }
	}

	@media only screen and (min-width:1000px) {
	  video {
	    width:55%;
	    display:inline-block;
	  }
	}
</style>