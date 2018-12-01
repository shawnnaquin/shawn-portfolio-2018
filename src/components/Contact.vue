<template>

	<div :class="['main']" :key="$store.state.openContact" v-if="$store.state.openContact" >

	<button @click="closeContact" :class="['close']" ><close></close></button>

	<form :class="['form']">

		<template v-for="(input,i) in inputs">

		    <div :class="[
		    	'div-input',
		    	{ ['error']: input.error },
		    	{ ['focus']: input.focus },
		    	{ ['fill']: input.data }
		    ]">

		        <label :class="['label']" :for="input.id">
		            <span> {{ input.label }} </span>
		        </label>

		        <input
					:ref="input.id"
					:name="input.id"
					@focus="focus"
					@blur="blur"
					:class="[ 'input' ]"
					:type="input.type"
					:id="input.id"
					:required="input.required"
					:aria-label="input.label"
					:pattern="input.pattern"
					v-model="input.data"
		        >

		        <div :class="['top-label']" >
		            <span>{{input.label}}</span>
		        </div>

		        <div :class="['line']"></div>

		    </div>

		</template>

		<button
			:class="['external']"
			:disabled="sending || success || error"
			@click.prevent="processForm" type="submit"
		>
		<!-- v-if="formready" -->
			<span>{{submitText}}</span>
		</button>

	</form>

	<transition name="fade" mode="out-in" >
	    <div v-if="errorMessage" :key="errorMessage" :class="[ 'error-message' ]">
	        {{ errorMessage }}
	    </div>
	</transition>
	</div>

	<div v-else :key="$store.state.openContact" :class="['if-closed']">
		<transition name="fade" appear>
			<span v-if="showInterim">Message Sent!</span>
		</transition>
	</div>

</template>

<script>
import axios from 'axios';
import close from '@/components/icons/close';
import H from '@/mixins/height';
import { mapGetters } from 'vuex';

export default {

	components: {
		close
	},

	mixins: [ H ],

	computed: {
		...mapGetters({

		})
	},
	data() {
		return {
			showInterim: false,
		    errorMessage: '',
		    inputs: {
		        name: {
		            'id': 'name',
		            'type': 'text',
		            'label': 'Name',
		            'required': true,
		            'pattern': '.{2,}',
		            'error': false,
		            'focus': false,
		            'data': ''
		        },
		        subject: {
		            'id': 'subject',
		            'type': 'text',
		            'label': 'Subject',
		            'required': true,
		            'pattern': '.{2,}',
		            'error': false,
		            'focus': false,
		            'data': ''
		        },
		        email: {
		            'id': 'email',
		            'type': 'email',
		            'label': 'Email',
		            'required': true,
		            'pattern': false,
		            'error': false,
		            'focus': false,
		            'data': ''
		        },
		        message: {
		            'id': 'message',
		            'type': 'text',
		            'label': 'Message',
		            'required': true,
		            'pattern': '.{2,}',
		            'error': false,
		            'focus': false,
		            'data': ''
		        }
		    },
		    formready: true,
		    sending: false,
		    success: false,
		    error: false,
		    submitText: 'Submit'
		}
	},
	beforeDestroy() {
	},
	watch: {
		'$store.state.openContact'(o) {
			if ( o ) {

				this.keyPress();

				document.documentElement.scrollTop = document.body.scrollTop = this.$store.state.lastScroll;

				let q = this.$route.query;

				this.$set(
					this.inputs.name,
					'data',
					decodeURI( q.name || '' )
				);

				this.$set(
					this.inputs.subject,
					'data',
					decodeURI( q.subject || '' )
				);

				this.$set(
					this.inputs.email,
					'data',
					decodeURI( q.email || '' )
				);

				this.$set(
					this.inputs.message,
					'data',
					decodeURI( q.message || '' )
				);

				setTimeout(()=> {
					this.$store.commit('toggleNoScroll');
				}, 300 );

			} else {

				if( this.success ) {
					this.showInterim = true;
				}

				window.onkeydown = false;

				this.$store.commit('toggleNoScroll');

		    	this.$router.replace( this.$store.state.lastRoute );

		    	setTimeout(()=> {
		    		console.log(this.$store.state.lastScroll);
		    		this.$scrollTo( ':root', 100, { offset: this.$store.state.lastScroll }  );
		    	}, 200 );
			}
		}
	},
	mounted() {
	},
	methods: {
		closeContact() {
			this.$store.commit('setOpenContact', false);
		},
		keyPress() {

			window.onkeydown = ( event ) => {

				switch( event.keyCode ) {

					case 27:
						this.$store.commit('setOpenContact', false);
						break;
					default:
						return;

				}

			};

		},
		processForm() {

			let error = false;

            let blurevt = new Event('blur');

		    for (let v in this.inputs ) {

		    	if ( this.inputs[v].error || !this.inputs[v].data.length ) {
		    		error = true;
		    		if ( document.querySelector(`input[name="${v}"]`) ) {
				    	document.querySelector(`input[name="${v}"]`).dispatchEvent(blurevt);
		    		}
		    		break;
		    	}
		    }

			if ( error ) return;

			this.formready = false;
			this.sending = true;
			this.submitText = 'Sending...'

			let bodyFormData = new FormData();

			bodyFormData.append('name', this.inputs.name.data );
			bodyFormData.append('email', this.inputs.email.data );
			bodyFormData.append('subject', this.inputs.subject.data );
			bodyFormData.append('message', this.inputs.message.data );

			axios({
				method: 'POST',
				url: 'https://shawns-contact-form.herokuapp.com/',
				data: bodyFormData,
				config:
					{
						headers: {
								'Content-Type': 'multipart/form-data'
						}
					}
			})
			.then( (response) => {

				this.submitText = 'Success!'
				this.success = true;
				this.sending = false;

				setTimeout( ()=> {
					this.resetForm()
					this.showInterim = false;
				}, 3000 );

			})
			.catch( (response) => {
				this.error = true;
				this.sending = false;
				this.submitText = 'ERROR!';
				setTimeout( this.resetForm, 1000 );
			});

		},

		getInputData(element) {
			return this.inputs[ element.getAttribute('name') ];
		},

		focus(e) {
			let input = this.getInputData(e.target);
			input.error = false;
			input.focus = true;
		},

		blur(e) {
			let input = this.getInputData(e.target);
			input.focus = false;
			this.checkErrors( e.target );
			this.checkErrorMessage();
		},

		checkErrors($input) {

			let input = this.getInputData( $input );

		    let v = $input.validity;
		    for (let error in v) {
		      if ( error !== 'valid' && v[error] === true ) {
		        input.error = true;

		        if ( error == 'patternMismatch' || error == 'valueMissing' ) {
		            this.errorMessage = 'Whoops, looks like something is missing!';
		        } else {
		            this.errorMessage = $input.validationMessage;
		        }
		        break;
			  } else {
		      	input.error = false;
		        // can't null message here, since others may have an error
		      }

		    }

		},

		checkErrorMessage() {
			let error = false;
		    for (let e in this.inputs) {
		        if ( this.inputs[e].error ) {
		        	error = true;
		        }
		    }
		    if ( !error ) {
		    	this.errorMessage = null;
		    }
		},

		resetForm() {
            let blurevt = new Event('blur');

		    for (let v in this.inputs ) {
		    	this.inputs[v].data = '';
		    	this.inputs[v].error = false;
		    	this.inputs[v].focus = false;
		    	if ( document.querySelector(`input[name="${v}"]`) ) {
			    	document.querySelector(`input[name="${v}"]`).dispatchEvent(blurevt);
		    	}
		    }

		    this.success = false;
		    this.error = false;
		    this.formready = true;
		    this.submitText = 'Submit';
		    this.errorMessage = null;
		    setTimeout(()=> {
		    	this.$store.commit('setOpenContact', false );
		    }, 1000 );
		}

	}

};
</script>
<style lang="scss" scoped>

.if-closed {
	pointer-events: none;
	position: fixed;
	top:0;
	left:0;
	z-index: 2;
	width:100%;
	span {
		display: block;
		background: lighten(green,10%);
		width: 100%;
		color: white;
		padding: 12px;
	}
}

.main {
	position:fixed;
	z-index:100;
	top:0;
	left:0;
	right:0;
	bottom:0;
	background: darken(white,2%);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column;
}
.external {
	margin-bottom: 2rem;
	margin-top: 2rem;
}
.form {
	width:75%;
}
.error-message {
	width:75%;
}


	/*
		.div-input
			.label
				span
			.input
			.top-label
				span
			.line
	*/

	.div-input {
		// width:100%;
		z-index:0;
		position:relative;
		display: block;
		padding-top: 32px;
		overflow: hidden;
		margin-top:8px;

		&::after {
			content: '';
		    display: block;
		    position: absolute;
		    height: 1px;
		    top: auto;
		    bottom: 0;
		    left: 0;
		    height: 1px;
		    width: 100%;
		    background: rgba( black, 0.3);
		    z-index: 3;
		}

		&.focus {
			&:after {
			}
		}

	}

	.label, .span, .line, .top-label {
		position:absolute;
		top:0;
		left:0;
	}

	.label,.top-label, .input {
		line-height:32px;
	}

	.label, .top-label {
		top:auto;
		bottom:0;
		transition: transform 150ms ease-in;
		transition-property: opacity, transform, color;
		span {

		}
	}

	.label {
		z-index:3;
	}

	.input {
		position:relative;
		z-index:2;
		width:100%;
		border:0;
		outline:0;
		padding-left:8px;
		background: darken(white,2%);
		margin: 0;
		padding: 0;
		overflow: visible;
		font-size: 16px;
		padding-bottom:2px;
	}

	.top-label {
		top:auto;
		bottom:0;
		opacity:0;
		transition-timing-function: ease-out;
		z-index:1;
		color:black;
		font-size:12px;
		span {

		}
	}

	.line {
		height: 2px;
		top: auto;
		bottom: 0px;
		left: 0;
		height: 2px;
		width: 100%;
		background: lighten(black,33%);
		z-index: 4;
		transform: translateX(-100%);
		transition: transform 300ms ease-out;
		transition-property: transform, background;
	}

	.error {
		.top-label {
			color: darken(Aqua, 10%);
		}
		.line {
			background: darken(Aqua, 5%);
		}
	}

	.fill, .error {
		.line {
			transform: translateX(0%);
			transition-timing-function: ease-in;
		}
	}

	.focus, .fill, .error  {

		.label {
			transform: translateY(-50%);
			transition-timing-function: ease-out;
			opacity:0;
		}

		.top-label {
			transition: transform 150ms ease-in 400ms, opacity 150ms ease-in 300ms, color 150ms ease-in 0s;
			transform: translateY( -90% );
			opacity:1;
		}
	}

	@keyframes in {
		100% {opacity:1;}
	}

	.close {
		cursor:pointer;
		position:absolute;
		top: 16px;
		right: 16px;
		opacity:0;
		color: white;
		text-decoration: none;
		animation-name: in;
		animation-duration: 200ms;
		animation-fill-mode:forwards;
		animation-timing-function: ease;
		animation-delay: 700ms;
		background: transparent;
		border:0;
		outline:0;
		padding: 10px;
		font-size:10px;
		z-index:103;

		&:after {
			display:block;
			position:relative;
			right:0;
			bottom:-10px;
			padding-top:4px;
			padding-bottom:4px;
			background:black;
		}
		> svg {
			width: 32px;
			height: 32px;
			fill: black;
			transition: fill 200ms ease;
			transition-property: fill, filter;
			filter: blur(0px);
			margin-left:10px;
		}

		@media only screen and (min-width:630px) {
			&:hover {
				> svg {
					fill: darken(white,20%);
					filter: blur(2px);
				}
			}
		}

		@media only screen and (max-width: 630px) {
			top: 0;
			right: 0;
			// font-size:8px;
			// > svg {
			// 	width: 10px;
			// 	height:10px;
			// }
		}
	}
</style>