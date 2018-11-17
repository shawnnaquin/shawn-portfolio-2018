<template>
	<div class="project" >

	<article class=""  >

	  <transition name="fade" appear mode="out-in"
		v-on:enter="articleEnter"
		v-on:after-enter="articleAfterEnter"
	  >

		<p
		  v-if="!project"
		  :class="[ 'loading' ]"
		>
			LOADING
			<Loader :go=" !project " />
		</p>

		<div v-else :class="[ 'article-header' ]" >

			<transition name="fade" appear mode="out-in" >
				<div>
				<h1> {{project.title}}</h1>
				<h3>{{project.projectDescription}}</h3>
				</div>
			</transition>

			<youtube-video v-if="project.content.video.length" :videoId="project.content.video" :videoImg=" `/img/portfolio/${ type }/${ images.video }-lg_1x.jpg`" ></youtube-video>
			<p :class="['tech-list']" >{{ project.content.techList }}</p>

			<div v-if="project && ( project.content.code || project.content.externalSite )" class="buttons" >

				<a :href="project.content.externalSite" v-if="project.content.externalSite" target="_blank" :class="[ 'external' ]" > Live Site <span :class="['external-span']"><external/></span> </a>
				&nbsp;

				<a :href="project.content.code" v-if="project.content.code" target="_blank" :class="[ 'external' ]" >
					//code
				</a>

				<router-link :to="'/'" :class="['external']">
					About Shawn
				</router-link>

			</div>

		</div>

	  </transition>

		<div :class="[ 'image-container' ]" v-if="showImages && images.mobile && images.mobile.length" >

		  <transition-group
			name="staggered-fade"
			tag="div"
			v-bind:css="false"
			v-on:before-enter="beforeEnter"
			v-on:enter="enter"
			v-on:leave="leave"
			:class="[ 'mobile', 'grid' ]"
		  >

			<div
			  v-for=" (image,i) in images.mobile"
			  style="position:relative;"
			  :data-index="i"
			  v-bind:key="image.path"
			  v-if="phoneVertLoaded"
			>

				<router-link
				  :to=" `/${type}/${project.link}/${image.path}`"
				  :class="['link']"
				>
					<picture-query
					  :type="type"
					  :path="image.path"
					  :alt="image.alt"
					>
						{{ image.caption }}
					</picture-query>
				</router-link>
			</div>

		  </transition-group>

		</div>

		<div :class="[ 'image-container' ]" v-if="showImages && images.horiz && images.horiz.length" >

		  <transition-group
			name="staggered-fade"
			tag="div"
			v-bind:css="false"
			v-on:before-enter="beforeEnter"
			v-on:enter="enter"
			v-on:leave="leave"
			:class="[ 'horiz', 'grid' ]"
		  >

			<div
			  v-for=" (image,i) in images.horiz"
			  style="position:relative;"
			  :data-index="i"
			  v-bind:key="image.path"
			  v-if="phoneVertLoaded"
			>
				<router-link
				  :to=" `/${type}/${project.link}/${image.path}`"
				  :class="['link']"
				>
					<picture-query
					  :type=" type "
					  :path=" image.path "
					  :alt="image.alt"
					>
						{{ image.caption }}
					</picture-query>
				</router-link>
			</div>

		  </transition-group>

		</div>

		<div :class="[ 'image-container' ]" v-if="showImages && images.regular && images.regular.length" >

		  <transition-group
			name="staggered-fade"
			tag="div"
			v-bind:css="false"
			v-on:before-enter="beforeEnter"
			v-on:enter="enter"
			v-on:leave="leave"
			:class="[ 'grid' ]"
		  >

			<div
			  v-for=" (image,i) in images.regular"
			  style="position:relative;"
			  :data-index="i"
			  v-bind:key="image.path"
			  v-if="phoneVertLoaded"
			  :style="{ paddingBottom: project.content.imageRatio }"
			>
				<router-link
				  :to=" `/${type}/${project.link}/${image.path}`"
				  :class="['link']"
				>
					<picture-query
					  :type=" type "
					  :path=" image.path "
					  :alt="image.alt"
					>
						{{ image.caption }}
					</picture-query>
				</router-link>
			</div>

		  </transition-group>

		</div>

		<div v-if="project" :class="[ 'article-header' ]" >

			<p v-if="project.content.article" :class="['description']">
				{{ project.content.article }}
			</p>

			<div v-if="project" class="buttons" >

				<router-link :to="'/'" :class="['external']">
					Back to Top
				</router-link>

				<router-link :to="'/'" :class="['external']">
					Next Project
				</router-link>

			</div>

		</div>

	</article>
	</div>
</template>

<script>

import YoutubeVideo from '@/components/YoutubeVideo';
import Picture from '@/components/Picture.vue';

import Loader from "@/components/Loader.vue";
import external from '@/components/icons/external';

import PhoneVert from '@/assets/ui/mobile.vert.png';
import PhoneHoriz from '@/assets/ui/mobile.horiz.png';

import animateIn from '@/mixins/animateIn';
import projects from '@/mixins/projects';

import { mapGetters } from 'vuex';

export default {

	components: {
		Loader,
		'picture-query': Picture,
		'youtube-video': YoutubeVideo,
		external
	},

	mixins: [ animateIn, projects ],
	computed: {
		...mapGetters([
			'getLoading'
		])
	},
	data() {
		return {
			phoneHorizLoaded: false,
			phoneVertLoaded: false,
			showImages: false,
			articleLoaded: false
		}
	},

	mounted() {
		this.checkPhone();
	},

	methods: {
		articleEnter(el,done){
			if  ( el.classList.contains('article-header') ) {
				this.showImages = true;
			}
			done();
		},

		articleAfterEnter(el) {
			if ( el.classList.contains('article-header') ) {
				this.articleLoaded = true;
			}
		},

		checkPhone() {
			let imgVert = new Image();
			imgVert.src = PhoneVert;
			imgVert.onload = () => {
				this.phoneVertLoaded = true;
				return;
			};

			let imgHoriz = new Image();
			imgHoriz.src = PhoneHoriz;
			imgHoriz.onload = () => {
				this.phoneHorizLoaded = true;
				return;
			}

		}
	}

};

</script>

<style lang="scss" scoped >
.loading {
	margin-top:112px;
}
h1 {
	font-size:32px;
}
h3 {
		// margin-bottom:65px;
	}
	.tech-list {
		line-height:32px;
		font-size:18px;
		margin-top:0;
	}

	.image-container {
		align-self: normal;
	}

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
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding:0 10%;
	}

	.article-header {
		max-width:800px;
		padding-bottom: 10%;
		margin-top:48px;
		&.no-padding {
			padding-bottom:0;
		}
		.buttons {
			h1,h2,h3,h4 {
				margin-top:0;
			}
			a,button {
				margin-top:32px;
				font-size:18px;
				margin-bottom:12px;
			}
		}
	}
	.description {
		display:inline-block;
		column-count:1;
		text-align:center;
		font-size:18px;
		line-height:1.4;
		text-align:left;
		max-width:600px;
		@media only screen and (min-width:630px) {
			column-count:1;
		}

		// @media only screen and (min-width:1100px) {
		// 	column-count:3;
		// }

	}

	</style>