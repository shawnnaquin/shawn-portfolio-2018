<template>

	<div :class="['trackback', {['dark']: dark }]">

		<ol
		  itemscope=""
		  itemtype="https://schema.org/BreadcrumbList"
		  class="breadcrumb"
		>

			<li
			  itemprop="itemListElement"
			  itemscope=""
			  itemtype="https://schema.org/ListItem"
			>
				<router-link
				v-if="$route.name != 'home' "
				  itemprop="item"
				  :to="`/`"
				>
					<span itemprop="name">Home</span>
				</router-link>
				<span
				  v-else
				  itemprop="name"
				 >
					 Home
				</span>
				<meta itemprop="position" content="1" />

			</li>

			<li
			  v-if="$route.name == 'tech' || $route.name == 'techtype' "
			  itemprop="itemListElement"
			  itemscope=""
			  itemtype="https://schema.org/ListItem"
			>

				<router-link
				  v-if="$route.name == 'techtype' "
				  itemprop="item"
				  :to="`/tech`"
				>
					<span itemprop="name">Tech</span>
				</router-link>

				<span
				  v-else
				  itemprop="name"
				 >
					Tech
				</span>
				<meta itemprop="position" content="2">

			</li>

			<li
			  v-if="$route.params.type"
			  itemprop="itemListElement"
			  itemscope=""
			  itemtype="https://schema.org/ListItem"
			 >
				<router-link
				  v-if="$route.params.project"
				  itemprop="item"
				  :to="`/${$route.params.type}`"
				 >
					<span itemprop="name">{{ $route.params.type }}</span>
				</router-link>

				<span
				  v-else
				  itemprop="name"
				>
					{{ $route.params.type }}
				</span>

				<meta itemprop="position" :content="$route.name == 'techtype' ? 3 : 2" >

			</li>

			<li
			  v-if="$route.params.project"
			  itemprop="itemListElement"
			  itemscope=""
			  itemtype="https://schema.org/ListItem"
			>
				<router-link
				  v-if="$route.params.image"
				  itemprop="item"
				  :to="`/${$route.params.type}/${$route.params.project}`"
				>
					<span itemprop="name" >
						{{ title }}
					</span>
				</router-link>

				<span
				  v-else
				  itemprop="name"
				>
					{{ title }}
				</span>

				<meta itemprop="position" content="3">

			</li>

			<li
			  v-if="$route.params.image"
			  itemprop="itemListElement"
			  itemscope=""
			  itemtype="https://schema.org/ListItem"
			>
				<span itemprop="name" style="text-transform:none;">
					{{ $route.params.image }}
				</span>

				<meta itemprop="position" content="4">

			</li>

		</ol>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				title:'',
			}
		},
		mounted() {
			if ( this.$route.params.project ) {
				this.title =  this.$store.state.projects[this.$route.params.type][this.$route.params.project].title ? this.$store.state.projects[this.$route.params.type][this.$route.params.project].title : this.$route.params.project;
			} else {
				this.title = '';
			}
		},
		methods: {
		},
		watch: {
			'$route'(to,from) {
				if ( to.params.project && Object.keys( this.$store.state.projects ).length ) {
					this.title =  this.$store.state.projects[to.params.type][to.params.project].title ? this.$store.state.projects[to.params.type][to.params.project].title : to.params.project;
				} else {
					this.title = '';
				}
			},
			'$store.state.projects'(p) {
				if ( Object.keys(p).length && this.$route.params.project ) {
					this.title = p[this.$route.params.type][this.$route.params.project].title
				} else {
					this.title = '';
				}
			},
		},
		props: {
			dark: {
				required: false,
				default: false,
				type: Boolean
			}
		}
	};

</script>

<style lang="scss" scoped>
.trackback {
	position: absolute;
	top: 3rem;
	width: 100%;
	text-align: left;
	left: 16px;

	@media only screen and (max-width: 1100px) {
		text-align: center;
		padding: 10px 80px;
		line-height: 1.5;
		left:auto;
		right:auto;
		top:auto;
		width:auto;
		li {
			word-break:break-all;
		}
	}

	ol {
		margin: 0;
		padding: 0;
		font-size: 12px;
		li {
			list-style: none;
			display:inline;
			margin: 0;
			padding: 0;
			text-transform: capitalize;
			span {
				font-size: 14px;
			}
			a {
				padding: 0;
			}

			&:not(:nth-last-child(1)):after {
				color: rgba(black, 0.5);
				content: " > ";
			}
		}
	}
	&.dark {

		z-index:2;

		@media only screen and (min-width: 1100px) {
			position:absolute;
			top:16px;
			left:16px;
		}

		li {
			color:white;
		}

		span {
			font-size: 10px;
		}

		a {
			color: white;
			&:visited, &:focus {
				color: gray;
			}
			&:hover {
				color: lighten(purple,10%);
			}
		}
	}
}
</style>