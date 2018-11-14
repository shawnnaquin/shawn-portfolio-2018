<template>

	<div>

		<transition name="fade" mode="out-in" appear >
			<h1 :key="type" class="push">
				{{type}} Projects
				<transition name="fade" >
					<span v-if="!projects" >
						&hellip;
					</span>
				</transition>
			</h1>
		</transition>

		<div style="position:relative; margin-bottom:124px;">

			<transition name="fade" appear >

				<p :key="type" v-if="!projects" :class="[ 'loading' ]">LOADING <Loader :go=" ( !projects ) " /> </p>

				<div
				v-else
				:class="[ 'portfolio' ]"
				>
<!--
	  			<transition-group
	  			  name="staggered-fade"
	  			  tag="div"
	  			  v-bind:css="false"
	  			  v-on:before-enter="beforeEnter"
	  			  v-on:enter="enter"
	  			  v-on:leave="leave"
	  			  appear

	  			> -->

					<router-link

						v-for="(p,i) in projects"
						:to="`/${type}/${p.link}`"
						:class="[ 'link' ]"
						:data-index="getIndex(p.link)"
						v-bind:key="p.mainImage.path"
						:style="{ 'animationDelay': String( getIndex(p.link) * 150 ) + 'ms' }"
					>
						<div :class="[ 'main-description' ]" >
							<h3>{{ p.title }}</h3>
							<small>{{ p.projectDescription }}</small>
						</div>

						<div :class="'image'" >
							<picture-query
								:type="type"
								:path="p.mainImage.path"
								:alt="p.mainImage.alt"
							>
								<h3>{{ p.mainImage.alt}}</h3>
								<p>{{p.mainImage.caption}}</p>
							</picture-query>
						</div>
					</router-link>
				</div>
			</transition>

		</div>


	</div>

</template>

<script>

	import { mapGetters } from 'vuex';
	import Loader from "@/components/Loader.vue";
	import Picture from '@/components/Picture.vue';
	import animateIn from '@/mixins/animateIn';
	import projects from '@/mixins/projects';

	export default {
		components: {
			Loader,
			'picture-query': Picture
		},
		mixins: [ animateIn, projects ],
		methods: {
			getIndex(name) {
				return Object.keys( this.projects ).indexOf( name );
			}
		}
	};

</script>

<style lang="scss" >
	.portfolio {

	}
</style>

<style lang="scss" scoped>

	.portfolio {
		padding: 0 10%;
  		display: grid;
		grid-template-columns: repeat( auto-fill, minmax(300px, 1fr) );
		grid-gap: 2rem;
		transition: grid-template-columns 5s ease;
	}

	h1 {
		text-align:left;
	}

	h1, .loading {
		text-transform:capitalize;
		display:inline-block;
		width:auto;
		position:relative;
		span {
			position: absolute;
			right: -16px;
			bottom: 0px;
		}
	}

	.loading {
		display:block;
		position:absolute;
		left:50%;
		transform:translateX(-50%);
		@media only screen and (max-width:1100px) {
			left:10%;
			transform:translateX(0);
		}
	}

	h1 span {
		right: -36px;
	}

/*
router-link
	figure
		picture
			source
			img
		figcaption
			h3
			p
*/
	a {
		text-decoration: none;
		color:black;
		text-align:left;
		border:1px solid rgba(black, 0.1);
		transition: border-color 200ms ease;
		transition-property: border-color, border-size;
		background: white;
		&:hover {
			border-color:rgba(black, 0.4);
			border-size:2;
		}
	}

	@keyframes in {
		100% { opacity:1; transform:translate3d(0,0,0); }
	}

	.link {

		display: flex;
		flex-flow: wrap;
		align-content: space-between;

		opacity:0;
		transform:translate3d(0,100px,0);
		animation-name: in;
		animation-delay:0s;
		animation-duration: 200ms;
		animation-timing-function: ease-in;
		animation-fill-mode: forwards;

	}

	.image {
		position:relative;
		width:100%;
		padding-bottom:120%;
	}

	.main-description {
		margin: 8px auto;
		padding-left:16px;
		padding-right: 16px;
		padding-bottom: 16px;
		font-size:16px;
	}

</style>