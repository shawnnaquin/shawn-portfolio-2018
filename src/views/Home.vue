<template>

  <div class="home push">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  </div>

</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
	  name: "home",
	  computed: {
	  	...mapGetters([
	  		'getLoading'
	  	])
	  },
	  mounted(){
		setTimeout( ()=> {
		    this.$store.dispatch('setLoading');
		}, 1000 );
	  }
	};

</script>
