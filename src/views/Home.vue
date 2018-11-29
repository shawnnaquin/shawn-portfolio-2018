<template>

  <div :class="['home', 'push', 'max-width' ]">
  	<router-link to="/website" :class="['external']" >
  		View More
  	</router-link>

  	<form action="https://shawns-contact.form.herokuapp.com/send_email" method="POST">
  		<div class="form-group">
  			<label>Name</label>
  			<input type="text" name="name" class="form-control" placeholder="Name" required>
  		</div>
  		<div class="form-group">
  			<label>Your Email</label>
  			<input type="email" name="email" class="form-control" placeholder="Your E-mail" required>
  		</div>
  		<div class="form-group">
  			<label>Subject</label>
  			<input type="text" name="subject" class="form-control" placeholder="Subject" required>
  		</div>
  		<div class="form-group">
  			<textarea class="form-control" name="message" rows="7" placeholder="Message" required>
  			</textarea>
  		</div>
  		<div class="text-center">
  			<input type="submit" value="Submit" class="btn btn-primary">
  		</div>
  	</form>

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