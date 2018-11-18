<template>

	<div :class="[ 'project', 'max-width' ]" key="project" v-if="project" ref="project" >

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

			<div :class="[ 'built-with' ]" >

			<h2>
				Built With:
			</h2>
			<ul :class="[ 'tech-list' ]" >
			<template v-for="t in project.content.techList" >
				<li :class="[ 'tech-item' ]" >{{ t }}</li>
			</template>
			</ul>

			</div>

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

				<router-link :to="`/${type}/${ prevProject.link }`" @click.native="setDirection('left')" :class="['external']">
					Prev Project
				</router-link>

				<router-link :to="`/${type}/${ nextProject.link }`" @click.native="setDirection('right')" :class="['external']">
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
			'getLoading',
			'getSticky'
		]),

		getStartProjectKey() {
			return Object.keys( this.projects ).indexOf( this.startProject );
		},

		projectNames() {
			if ( !this.projects ) return;
			return Object.keys(this.projects);
		},

		projectKey() {
			if ( !this.project ) return;
			let k = this.projectNames.indexOf( this.project.link );
			return k;
		},

		nextProjectKey() {

			if ( this.projectKey === undefined || this.projectKey === null || this.projectKey === false ) return;

			let k = ( ( 1 + this.projectKey ) % this.projectNames.length );
			return k;

		},

		nextProject() {
			if ( !this.projects ) return;
			return this.projects[ this.projectNames[ this.nextProjectKey ] ];
		},

		prevProjectKey() {
			if ( !this.projects ) return;
			let prev = this.projectKey - 1;
			if ( prev < 0 ) {
				prev = this.projectNames.length - 2;
			}
			return prev;
		},

		prevProject() {
			if ( !this.projects ) return;
			return this.projects[ this.projectNames[ this.prevProjectKey ] ];
		}

	},

	beforeRouteUpdate(to,from,next) {

		this.next = true;

		const el = () => {
		    const el = document.scrollingElement || document.documentElement;
			return el;
		}

		// if ( this.nextProjectKey == this.getStartProjectKey ) {
		// 	let n = ( 1 + this.$store.state.types.indexOf( this.$route.params.type ) ) % this.$store.state.types.length;
		// 	// console.log(  );
		// 	this.$router.replace(`/${this.$store.state.types[ n ]}`)
		// 	return;
		// } else {
		this.$store.commit('setTrans', {trans: `fade-${ this.direction }`, mode: '' } )

		if ( this.direction == 'right' ) {

			this.$refs.project.style.transition = 'transform 0.2s ease-out';
			this.$refs.project.style.transitionProperty = 'opacity, transform';
			this.$refs.project.style.transform = 'translateX(100%)';
			this.$refs.project.style.opacity = 0;

		} else {

			this.$refs.project.style.transition = 'transform 0.2s ease-out';
			this.$refs.project.style.transitionProperty = 'opacity, transform';
			this.$refs.project.style.transform ='translateX(-100%)';
			this.$refs.project.style.opacity = 0;

		}
		// if( ) {
		// 	this.$store.commit('setTrans', { trans: 'fade-right', mode: 'out-in' } );
		// } else {
		// 	this.$store.commit('setTrans', { trans: 'fade-left', mode: 'out-in' } );
		// }
		setTimeout(()=> {
			this.$store.commit('setLastScroll', {
			    last: el().scrollTop
			});

			this.$store.commit('setProjects', {} );

			next();
		}, 100 );

		// }

	},

	watch: {

		'project'(p) {

			const el = () => {
			    const el = document.scrollingElement || document.documentElement;
			    return el;
			};

			if ( p && this.next ) {
				this.next = false;
				this.$nextTick(()=> {
					el().scrollTop = el().offsetHeight;
				});
			}

		}

	},

	data() {
		return {
			phoneHorizLoaded: false,
			phoneVertLoaded: false,
			showImages: false,
			articleLoaded: false,
			next: false,
			direction: ''
		}
	},
	mounted() {
		this.checkPhone();
		this.startProject = this.$route.params.project;
	},
	methods: {

		setDirection(d) {
			this.direction = d;
		},

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

	.built-with {
		margin-top:12px;
		transform:translateY(-5px);
		padding-top: 48px;
	}

	.tech-list {

		margin: 24px auto;
		line-height:32px;
		font-size:16px;
		list-style:none;

		&:before, &:after {
			color: darken(white, 50%);
		}
		&:before  {
			content: '[';
			padding-right:16px;
		}
		&:after {
			content: ']';
			padding-left:16px;
		}
	}

	.tech-item {
		display:inline;
		color: darken(white, 80%);
		&:after {
			color: darken(white, 32%);
			padding: 0 8px;
		}
		// &:before {
		// 	content: '\'';
		// 	color: darken(white, 32%);
		// 	padding-right:8px;
		// 	padding-left:4px;
		// }
		// &:nth-last-child(1):after {
		// 	content: '\'';
		// }
		&:not( :nth-last-child(1) ):after {
			content: '-';
			letter-spacing:0px;

		}
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
		width:100%;
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