<template>

	<div :class="['home', 'push', 'max-width' ]">
		<router-link to="/website" :class="['external']" >
			View More
		</router-link>
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
<style lang="scss" scoped>
	.external {
		display:inline-block;
		margin-top: 32px;
		margin-bottom:64px;
	}
</style>