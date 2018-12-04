<template>

	<div :class="['main', {['open']: $store.state.openContact}]" :style="{height:height}" >

	<div :class="['if-closed', { ['error']: error } ]">
		<transition name="fade" appear>
			<span v-if="showInterim">{{interimMessage}}</span>
		</transition>
	</div>

	<transition name="fade" appear >

	<div :class="['flex-container']" :key="$store.state.openContact" v-if="$store.state.openContact" >

	<button @click="closeContact" :class="['close']" ><close></close></button>

	<form :class="['form']">

		<template v-for="(input,i) in inputs">

			<div :class="[
				'div-input',
				{ [ 'error' ]: input.error },
				{ [ 'focus' ]: input.focus },
				{ [ 'fill'  ]: input.data  }
			]">

				<label :class="['label']" :for="input.id">
					<span> {{ input.label }} </span>
				</label>

				<input
					:tabindex="input.tabIndex"
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

		<g-recaptcha
		  :data-tabindex="String( Object.keys(inputs).length + 1 )"
		  data-sitekey="6LcOPH4UAAAAAOAkGz3AiBzFJ0xugr2Cxh8ST4YQ"
		  :data-validate="processForm"
		  :data-callback="submitForm"
		  :data-btn-disabled="sending || success || error"
		  :class="['form-submit']"
		>
			<span :class="['external']" :tabindex="Object.keys(inputs).length + 1" >
				<span>{{submitText}}</span>
			</span>

		</g-recaptcha>

	</form>

	<transition name="fade" mode="out-in" >
		<div v-if="errorMessage" :key="errorMessage" :class="[ 'error-message' ]">
			{{ errorMessage }}
		</div>
	</transition>

	</div>
	</transition>
	</div>

</template>

<script>

import axios from 'axios';
import close from '@/components/icons/close';
import H from '@/mixins/height';
import gRecaptcha from '@finpo/vue2-recaptcha-invisible';
import validator from 'validator';
import xssFilters from 'xss-filters';

import { mapGetters } from 'vuex';

export default {

	components: {
		gRecaptcha,
		close
	},

	mixins: [ H ],

	data() {
		return {
			showInterim: false,
			interimMessage: 'Message Sent!',
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
					'data': null,
					'tabIndex': 1
				},
				subject: {
					'id': 'subject',
					'type': 'text',
					'label': 'Subject',
					'required': true,
					'pattern': '.{2,}',
					'error': false,
					'focus': false,
					'data': null,
					'tabIndex': 2
				},
				email: {
					'id': 'email',
					'type': 'email',
					'label': 'Email',
					'required': true,
					'pattern': false,
					'error': false,
					'focus': false,
					'data': null,
					'tabIndex': 3
				},
				message: {
					'id': 'message',
					'type': 'text',
					'label': 'Message',
					'required': true,
					'pattern': '.{2,}',
					'error': false,
					'focus': false,
					'data': null,
					'tabIndex': 4
				}
			},
			error: false,
			formready: true,
			sending: false,
			success: false,
			submitText: 'Submit'
		}
	},
	beforeDestroy() {
	},
	watch: {
		'$store.state.openContact'(o) {
			if ( o ) {

				this.keyPress();
				this.forceNoTouchMove = false;
				this.$nextTick(()=> {
					this.heightTrigger = true;
				});

				let q = this.$route.query;

				let name = q.name || this.inputs.name.data || '';
				let subject = q.subject || this.inputs.subject.data || '';
				let email = q.email || this.inputs.email.data || '';
				let message = q.message || this.inputs.message.data || '';

				this.resetForm();

				function getString(v) {
					if ( typeof v == 'string' ) {
						return  decodeURI( v.trim() );
					} else {
						return '&nbsp;';
					}
				}

				if( encodeURI(subject) == 'Resum%C3%A9%20Request' && !this.$route.query.subject ) {
					subject = '';
				}

				// console.log( {
				// 	name: name,
				// 	subject: subject,
				// 	email: email,
				// 	message: message
				// } );

				this.$set( this.inputs.name, 'data', getString(name) );
				this.$set( this.inputs.subject, 'data', getString(subject) );
				this.$set( this.inputs.email, 'data', getString(email) );
				this.$set( this.inputs.message, 'data', getString(message) );

				this.$router.replace(this.$route.path);
				if ( window.innerWidth > 630 ) {
					this.$nextTick(()=> {
						let $i = document.querySelector( `input[name=${ Object.keys( this.inputs )[0] }]` );
						$i.focus();
						$i.select();
						setTimeout(()=> {
							$i.setSelectionRange(0,999);
						}, 1 );
					});
				}

				setTimeout(()=> {
					this.$store.commit('toggleNoScroll');
				}, 300 );

			} else {

				this.forceNoTouchMove = false;
				this.heightTrigger = false;

				if( this.success ) {
					this.showInterim = true;
				}

				window.onkeydown = false;
				this.$store.commit('toggleNoScroll');
				this.$scrollTo(':root', 100, {offset: this.$store.state.lastScroll });

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

				if ( document.querySelector(`input[name="${v}"]`) ) {
					document.querySelector(`input[name="${v}"]`).dispatchEvent(blurevt);
				}

				if ( this.inputs[v].error || !this.inputs[v].data.length ) {
					error = true;
				}

			}

			return !error;

		},

		submitForm(token) {

			if (token) {

				this.errorMessage = '';

				this.formready = false;
				this.sending = true;
				this.submitText = 'Sending...'

				let bodyFormData = new FormData();

				const getName = (name)=> {
				    return validator.trim(
				        validator.escape(
				            xssFilters.inHTMLData(
				                validator.blacklist( name, '\\[\\]')
				            )
				        )
				    );

				};

				bodyFormData.append('name', getName( this.inputs.name.data ) );
				bodyFormData.append('email', getName( this.inputs.email.data ) );
				bodyFormData.append('subject', getName( this.inputs.subject.data ) );
				bodyFormData.append('message', getName( this.inputs.message.data ) );
				bodyFormData.append('token', getName( token ) );

				axios({
					method: 'POST',
					url: 'https://shawnnaquin.github.io/',
					data: bodyFormData,
					config:
						{
							headers: {
									'Content-Type': 'multipart/form-data'
							}
						}
				})
				.then( (response) => {
					// console.log(response.data);
					this.handleFormResponse();
				})
				.catch( (error) => {
					let e = error.response.data;
					this.handleFormError( e.error, e.type )
				});

			} else {
			  // if you use data-size show reCAPTCHA , maybe you will get empty token.
			  // alert('please check you are not robot');
			  // this.inputs.name.error = true;
			this.handleFormError( 'please check you are not robot', 'recaptcha' );

			}

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

		handleFormResponse() {

			this.submitText = 'Success!'
			this.error = false;
			this.success = true;
			this.sending = false;
			this.interimMessage = 'Message Sent!';
			this.showInterim = true;

			setTimeout( ()=> {

				setTimeout(()=> {
					this.$store.commit('setOpenContact', false );
					setTimeout( this.resetForm, 100 );
				}, 500 );

				setTimeout(()=> {
					this.showInterim = false;
				}, 2000 );

			}, 1000 );

		},

		handleFormError(err,type) {

			this.interimMessage = 'ERROR SENDING!';
			this.showInterim = true;
			this.error = true;

			setTimeout(()=> {
				this.showInterim = false;
				setTimeout( ()=> {
					this.error = false;
				}, 1000 );
			}, 2000 );

			this.success = false;
			this.sending = false;
			this.formready = true;
			this.submitText = 'Submit';

			this.errorMessage = err;

			if ( Object.keys(this.inputs).includes(type) ) {
				this.inputs[type].error = true;
			}

		},

		resetForm() {
			let blurevt = new Event('blur');

			for (let v in this.inputs ) {
				this.inputs[v].data = null;
				this.inputs[v].error = false;
				this.inputs[v].focus = false;
				if ( document.querySelector(`input[name="${v}"]`) ) {
					document.querySelector(`input[name="${v}"]`).dispatchEvent(blurevt);
				}
			}

			this.success = false;
			this.formready = true;
			this.submitText = 'Submit';
			this.errorMessage = null;

		}

	}

};
</script>
<style lang="scss">

.form-submit {
	div > button {
		background: transparent;
		outline:0;
		border:0;
	}
}
</style>
<style lang="scss" scoped>

.form {
	max-width:630px;
}

.if-closed {
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
	&.error {
		span {
			background: lighten(red,5%);
		}
	}
}

.main {

	position: absolute;

	top:0;
	left:0;
	z-index:2;
	pointer-events:none;
	width:100%;

	&.open {
		pointer-events:auto;
	}
}

.flex-container {
	position:absolute;
	z-index:1;
	top:0;
	left:0;
	width:100%;
	height:100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column;
	background: darken(white,2%);
	@media only screen and (max-height:375px) {
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		justify-content:flex-start;
	}
}

.form-submit {
	margin-bottom: 2rem;
	margin-top: 2rem;
	div > button {
		background: transparent;
		outline:0;
		border:0;
	}
}

.form {
	width:75%;
}

.error-message {
	width:75%;
	@media only screen and (max-height:375px) {
		margin-bottom:5rem;
	}
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
		transform: translateX(-101%);
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
		position:fixed;
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
		&:focus, &:active {
			> svg {
				fill: darken(white,20%);
				filter: blur(2px);
			}
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