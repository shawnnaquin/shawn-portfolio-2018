<template>

	<div :class="[ 'project', 'max-width' ]"  style="overflow: hidden;" >

	<transition :name="mainTrans.trans" :mode="mainTrans.mode" appear v-on:afterLeave="pageAfterLeave" v-on:enter="pageEnter" >

	<article class="" v-if="show" >

	  <transition name="fade" appear mode="out-in">
	  	<div :style="{minHeight:'500px'}" v-if="!project" :class="['article-header']">
		<div>
		<h1>
			Project Loading
			<transition name="fade" >
				<span v-if="!project">
					&hellip;
				</span>
			</transition>
		</h1>
		</div>
		<p
		  :class="[ 'loading' ]"
		>
			LOADING
			<Loader :go=" !project " />
		</p>
		
		</div>

		<div v-else :class="[ 'article-header' ]" >

			<transition name="fade" appear mode="out-in" >
				<div>
				<h1> {{project.title}}</h1>
				<p>{{project.projectDescription}}</p>
				</div>
			</transition>

			<youtube-video v-if="project.content.video.length" :videoId="project.content.video" :videoImg=" `${getBase}${ type }/${ images.video }`" ></youtube-video>

			<div v-if="project && ( project.content.code || project.content.externalSite )" class="buttons" >

				<a :href="project.content.externalSite" v-if="project.content.externalSite" target="_blank" :class="[ 'external' ]" > Live Site <span :class="['external-span']"><external/></span> </a>
				&nbsp;

				<a :href="project.content.code" v-if="project.content.code" target="_blank" :class="[ 'external' ]" >
					//code
				</a>

			</div>

			<div :class="[ 'built-with' ]" >

			<h2>
				Built With:
			</h2>

			<techList :techList="project.content.techList" />

			</div>

		</div>

	  </transition>

		<div :class="[ 'image-container' ]" v-if="images.mobile && images.mobile.length" >

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

		<div :class="[ 'image-container' ]" v-if="images.horiz && images.horiz.length" >

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

		<div :class="[ 'image-container' ]" v-if="images.regular && images.regular.length" >

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
		<transition name="fade" appear >
		<div v-if="showBlurb && project" :class="[ 'article-header' ]" style="transition-delay: 1000ms" >

			<p v-if="project.content.article" :class="['description']">
				{{ project.content.article }}
			</p>

			<div class="buttons" >

				<router-link :to="`/${type}/${ prevProject.link }`" :class="['external']">
					&lt;
				</router-link>

				<router-link :to="`/${type}/${ nextProject.link }`" :class="['external']">
					 &gt;
				</router-link>

			</div>

		</div>
		</transition>
	</article>
	</transition>
	</div>

</template>

<script>

import YoutubeVideo from '@/components/YoutubeVideo';
import Picture from '@/components/Picture.vue';

import Loader from "@/components/Loader.vue";
import external from '@/components/icons/external';
import techList from '@/components/techList';
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
		external,
		techList
	},

	mixins: [ animateIn, projects ],
	computed: {

		...mapGetters({
			getLoading: 'getLoading',
			mainTrans: 'getTrans',
			getSticky: 'getSticky'
		}),
		getBase() {
			return `${ process.env.BASE_URL }img/portfolio/`;
		},
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
				prev = this.projectNames.length - 1;
			}
			return prev;
		},

		prevProject() {
			if ( !this.projects ) return;
			return this.projects[ this.projectNames[ this.prevProjectKey ] ];
		}

	},

	beforeRouteUpdate(to,from,next) {

		if ( !this.nextProject ) {
			next();
		}

		if ( to.params.project == this.nextProject.link ) {
			this.$store.commit('setTrans', {trans: `fade-right`, mode: '' } );
		} else {
			this.$store.commit('setTrans', {trans: `fade-left`, mode: '' } );
		}


		this.$nextTick( ()=> {
			this.show = false;
			next();
		});


	},

	data() {
		return {
			phoneHorizLoaded: false,
			phoneVertLoaded: false,
			show: false, // show the page
			showBlurb: false,
			direction: ''
		}
	},

	mounted() {
		this.checkPhone();
		this.startProject = this.$route.params.project;
		this.show = true;
		// console.log( this.getBase );
	},
	watch: {
		'$route'(to,from) {
		},
		'$store.state.projects'(p) {
			if ( !this.projectNames.includes(this.$route.params.project ) ) {
				this.$router.replace(`/${this.$route.params.type}`);
			}
		}
	},
	methods: {
		pageEnter(el,done)	 {

			if ( this.$store.state.resetScroll ) {
				document.body.style.height = this.$store.state.lastScroll + window.innerHeight + 'px';
				this.$scrollTo( ':root', 100, { offset: this.$store.state.lastScroll }  );
			} else {
				this.$scrollTo( ':root', 100 );
			}

			setTimeout(()=> {
				this.showBlurb = true;
				document.body.style.height = '';
				done();
			}, 100 )

		},

 		pageAfterLeave(el) {
			this.show = true;
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
	// font-size:32px;
}
h3 {
		// margin-bottom:65px;
	}

	.built-with {
		margin-top:0;
		transform:translateY(-5px);
		padding-top: 24px;
	}

	.image-container {
		align-self: normal;
		> .grid {
			&.horiz {
				@media only screen and (max-width:630px) {
					> div {
						display:none;
					}
				}
			}
			&:not(.horiz) {
				> div {
					@media only screen and (max-width:630px) {
						display:none;
						&:nth-child(1), &:nth-child(2) {
							display:block;
						}
					}
					// @media only screen and (min-width:630px) {
						// display:block;
					// }
				}
			}
		}
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

		@media only screen and (max-width:1100px) {
			text-align:left;
		}
	}

	.article-header {
		padding-bottom: 5%;
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