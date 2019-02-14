<template>
	<div

	  :class="[ 'loader' ]"
	  ref="background"
	  :style="{height:height}"
	  :aria-hidden="$store.state.modalOpen !== false" >

	  <p :class="[ 'paragraph' ]" >
	    <span> Loading <Loader :go=" true " /></span>
	  </p>

	</div>
</template>

<script>

import H from "@/mixins/height";
import Loader from "@/components/Loader";

export default {
	mixins: [H],
	mounted() {
	    this.heightTrigger = true;
	},
	beforeDestroy() {
	    this.heightTrigger = false;
	},
	components: {
	  Loader
	}
};

</script>
<style lang="scss" scoped >

	.loader {
	  background: black;
	  position: fixed;
	  top: 0;
	  left: 0;
	  z-index: 100;
	  height: 100%;
	  width: 100%;
	  color: white;
	  display: flex;
	  justify-content: center;
	  flex-flow: column;

	  p {
	    position: absolute;
	    left: 50%;
	    transform: translate3d(-60%, 0, 0);
	    font-size: 32px;
	    font-weight: bold;
	    span {
	      position: absolute;
	      right: -32px;
	      bottom: 0;
	    }
	  }
	}

	.paragraph {
	  color: white;
	  margin: 0 auto;
	}

</style>