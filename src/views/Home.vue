<template>

  <div class="home push">
  	<div :class="'flex-column'" >
  	  <Nav />
  	  <Header :loaded="!getLoading" />
  	</div>
  </div>

</template>

<script>
	import Header from "@/components/Header.vue";
	import Nav from "@/components/Nav.vue";
	import { mapGetters } from 'vuex';
	export default {
	  name: "home",
	  components: {
	    Header,
	    Nav
	  },
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
