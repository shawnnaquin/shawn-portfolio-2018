<template>
	<ul :class="[ 'tech-list' ]" >
		<template v-for="t in techList" >
			<li :key="t" :class="[ 'tech-item' ]" >
				<router-link :name="t" :aria-label="t" :title="t" :class="[ 'external', 'tech-link' ]" :to="`/${ getProjectLink(t) }`" >{{ t }}</router-link>
			</li>
		</template>
	</ul>
</template>

<script>
export default {
  props: {
    techList: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  methods: {
    getProjectLink(t) {
      return window.encodeURI(t);
    }
  }
};
</script>

<style lang="scss" scoped>
.tech-list {
  margin: 24px auto;
  line-height: 32px;
  font-size: 16px;
  list-style: none;
  max-width: 630px;
  // &:before, &:after {
  // 	color: darken(white, 50%);
  // }
  // &:before  {
  // 	content: '[';
  // 	padding-right:16px;
  // }
  // &:after {
  // 	content: ']';
  // 	padding-left:16px;
  // }
}

.tech-item {
  display: inline-block;
  margin: 4px 16px;
  margin-left: 0;
  color: darken(white, 80%);
  // &:after {
  // 	color: darken(white, 32%);
  // 	padding: 0 8px;
  // }
  // &:not( :nth-last-child(1) ):after {
  // 	content: '-';
  // 	letter-spacing:0px;

  // }
}

.tech-link {
  display: inline-block;
  position: relative;
  padding: 6px 10px;
  font-weight: normal;
  line-height: 1;
  &:before {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background: darken(white, 5%);
    z-index: -1;
    pointer-events: none;
  }
  // @media only screen and (min-width:1100px) {
  // 	&:hover {
  // 	}
  // }
}
</style>
