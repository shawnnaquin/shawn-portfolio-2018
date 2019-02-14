<template>
	<div :class="['banner', { ['error']: error } ]">
	    <span><b> {{ message }} </b></span>
	</div>
</template>

<script>

export default {
	props: {
		message: {
			required: false,
			default: '',
			type: String
		},
		error: {
			required: false,
			default: false,
			type: Boolean
		}
	}
};

</script>

<style lang="scss" scoped >

	.banner {

		position: fixed;
		top: 0;
		left: 0;
		z-index: 3;
		width: 100%;

		span {
			display: block;
			background: lighten(green, 10%);
			width: 100%;
			color: white;
			padding: 12px;

		}

		&.error {
			span {
				background: lighten(red, 5%);
			}
		}
	}

</style>