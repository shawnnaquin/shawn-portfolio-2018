<template>

	<div
	  :class="['main']"
	  :style="{height:height}"
	>

	  <FocusLock
	    :disabled="!$store.state.modalOpen"
	    v-if="$store.state.openContact"
	  >

		<div
		  :class="['flex-container']"
		>

			<button
			  @click="closeContact"
			  :class="['close']"
			>
			  <close/>
			</button>

			<form :class="['form']">

			  <template v-for="input in inputs">

				<div
				  :class="[
				    'div-input',
				    { [ 'error' ]: input.error },
				    { [ 'focus' ]: input.focus },
				    { [ 'fill' ]: input.data }
				  ]"
				  :key="input.id"
				>

					<label
					  :class="['label']"
					  :for="input.id"
					>
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
						<span>{{ input.label }}</span>
					</div>

					<div :class="['line']"/>

				</div>

			  </template>

				<g-recaptcha
				  :data-tabindex="String( Object.keys(inputs).length + 1 )"
				  :data-sitekey="'6LcOPH4UAAAAAOAkGz3AiBzFJ0xugr2Cxh8ST4YQ'"
				  :data-validate="processForm"
				  :data-callback="submitForm"
				  :data-btn-disabled="sending || success || error"
				  :class="['form-submit']"
				>
					<span
					  :class="['external']"
					  :tabindex="Object.keys(inputs).length + 1"
					>
						<span>{{ submitText }}</span>
					</span>

				</g-recaptcha>

			</form>

		  <transition
			name="fade"
			mode="out-in" 
		  >
			<div
			  v-if="errorMessage"
			  :key="errorMessage"
			  :class="[ 'error-message' ]"
			>
				{{ errorMessage }}
			</div>
		  </transition>

		</div>
	  </FocusLock>
	</div>

</template>

<script>

import axios from "axios";
import close from "@/components/icons/close";
import H from "@/mixins/height";
import gRecaptcha from "@finpo/vue2-recaptcha-invisible";
import validator from "validator";
import xssFilters from "xss-filters";
import FocusLock from "vue-focus-lock";

export default {
	components: {
		gRecaptcha,
		close,
		FocusLock
	},

	mixins: [H],

	data() {
		return {
			errorMessage: "",
			inputs: {
				name: {
					id: "name",
					type: "text",
					label: "Name",
					required: true,
					pattern: ".{2,}",
					error: false,
					focus: false,
					data: null,
					tabIndex: 1
				},
				subject: {
					id: "subject",
					type: "text",
					label: "Subject",
					required: true,
					pattern: ".{2,}",
					error: false,
					focus: false,
					data: null,
					tabIndex: 2
				},
				email: {
					id: "email",
					type: "email",
					label: "Email",
					required: true,
					pattern: false,
					error: false,
					focus: false,
					data: null,
					tabIndex: 3
				},
				message: {
					id: "message",
					type: "text",
					label: "Message",
					required: true,
					pattern: ".{2,}",
					error: false,
					focus: false,
					data: null,
					tabIndex: 4
				}
			},
			error: false,
			formready: true,
			sending: false,
			success: false,
			submitText: "Submit"
		};
	},
	created() {
        this.$store.dispatch("openContact", true);
	    this.$store.dispatch("setLoading");
	},
	beforeDestroy() {
        this.$store.dispatch("openContact", false);
	},
	watch: {
		"$store.state.openContact"(o) {
			if (o) {
				this.keyPress();
				this.forceNoTouchMove = false;
				this.$nextTick(() => {
					this.heightTrigger = true;
				});

				let q = this.$route.query;

				let name = q.name || this.inputs.name.data || "";
				let subject = q.subject || this.inputs.subject.data || "";
				let email = q.email || this.inputs.email.data || "";
				let message = q.message || this.inputs.message.data || "";

				this.resetForm();

				if (
					encodeURI(subject) == "Resum%C3%A9%20Request" &&
					!this.$route.query.subject
					) {
					subject = "";
			}

		// console.log( {
		// 	name: name,
		// 	subject: subject,
		// 	email: email,
		// 	message: message
		// } );

		this.$set(this.inputs.name, "data", this.getString(name));
		this.$set(this.inputs.subject, "data", this.getString(subject));
		this.$set(this.inputs.email, "data", this.getString(email));
		this.$set(this.inputs.message, "data", this.getString(message));

		this.$router.replace(this.$route.path);

		if (window.innerWidth > 630) {
			this.$nextTick(() => {
				let $i = document.querySelector(
					`input[name=${Object.keys(this.inputs)[0]}]`
					);
				$i.focus();
				$i.select();
				setTimeout(() => {
					$i.setSelectionRange(0, 999);
				}, 1);
			});
		}

		this.$store.commit("setModalOpen", "contact");

	} else {
		this.forceNoTouchMove = false;
		this.heightTrigger = false;
		window.onkeydown = false;
		this.closeModal();
	}
}
},
methods: {
	closeModal() {
		this.$store.commit("setModalOpen", false);
		this.$router.push( this.$store.state.lastRoute );
	},
	getString(v) {
		if (typeof v == "string") {
			return decodeURI(v.trim());
		} else {
			return "&nbsp;";
		}
	},
	closeContact() {
		this.$store.dispatch("openContact", false);
	},
	keyPress() {
		window.onkeydown = event => {
			switch (event.keyCode) {
				case 27:
				this.$store.dispatch("openContact", false);
				break;
				default:
				return;
			}
		};
	},
	processForm() {
		let error = false;

		if (!navigator.onLine) {
			this.handleFormError(
				"Contact Form is Offline. 1337, Please try again l8r sk8r.",
				"offline"
				);
			return !error;
		} else {
			// this.errorMessage = "";
		}

		for (let v in this.inputs) {
			if (document.querySelector(`input[name="${v}"]`)) {
				document.querySelector(`input[name="${v}"]`).blur();
			}

			if (this.inputs[v].error || !this.inputs[v].data.length) {
				error = true;
			}
		}

		return !error;
	},

	submitForm(token) {
		if (token) {

			this.formready = false;
			this.sending = true;
			this.submitText = "Sending...";

			let bodyFormData = new FormData();

			const getName = name => {
				return validator.trim(
					validator.escape(
						xssFilters.inHTMLData(validator.blacklist(name, "\\[\\]"))
						)
					);
			};

			bodyFormData.append("name", getName(this.inputs.name.data));
			bodyFormData.append("email", getName(this.inputs.email.data));
			bodyFormData.append("subject", getName(this.inputs.subject.data));
			bodyFormData.append("message", getName(this.inputs.message.data));
			bodyFormData.append("token", getName(token));

			axios({
				method: "POST",
				url: "https://shawns-contact-form.herokuapp.com/",
				data: bodyFormData,
				config: {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}
			})
			.then(() => {
				// console.log(response.data);
				this.handleFormResponse();
			})
			.catch( error => {

				let e = {
					error: 'error',
					type: 'type'
				};

				if ( error.response && error.repsponse.data ) {
					e = error.response.data;
				}

				this.handleFormError( e.error, e.type);
			});
		} else {
			// if you use data-size show reCAPTCHA , maybe you will get empty token.
			// alert('please check you are not robot');
			// this.inputs.name.error = true;
			this.handleFormError("please check you are not a robot", "recaptcha");
		}
},

getInputData(element) {
	return this.inputs[element.getAttribute("name")];
},

focus(e) {
	let input = this.getInputData(e.target);
	input.error = false;
	input.focus = true;
},

blur(e) {
	let input = this.getInputData(e.target);
	input.focus = false;
	this.checkErrors(e.target);
	this.checkErrorMessage();
},

checkErrors($input) {
	let input = this.getInputData($input);

	if (
		input.data !== null &&
		input.type == "email" &&
		!validator.isEmail(input.data)
		) {
		input.error = true;
	this.errorMessage = "Please type a valid Email Address: **@**.**";
} else if (input.type == "email") {
	input.error = false;
	this.errorMessage = "";
} else {
	let v = $input.validity;

	for (let error in v) {
		if (error !== "valid" && v[error] === true) {
			input.error = true;
			if (error == "patternMismatch" || error == "valueMissing") {
				this.errorMessage = "Whoops, looks like something is missing!";
			} else {
				this.errorMessage = $input.validationMessage;
			}
			break;
		} else {
			input.error = false;
			// can't null message here, since others may have an error
		}
	}
}
},

checkErrorMessage() {
	let error = false;
	for (let e in this.inputs) {
		if (this.inputs[e].error) {
			error = true;
		}
	}
	if (!error) {
		this.errorMessage = null;
	}
},

handleFormResponse() {
	this.submitText = "Success!";
	this.error = false;
	this.success = true;
	this.sending = false;

	this.$store.commit('setMessageError', false );
	this.$store.commit('setMessage', this.submitText + '\n Message sent' );

    this.$store.dispatch("openContact", false);

},

handleFormError(err, type) {

	this.success = false;
	this.sending = false;
	this.formready = true;
	this.submitText = "Submit";

	this.errorMessage = err + '\n Please try again';

	this.$store.commit('setMessage', false );

	this.$nextTick( ()=> {
		this.$store.commit('setMessageError', true );
		this.$store.commit('setMessage', err );
	});

	if (Object.keys(this.inputs).includes(type)) {
		this.inputs[type].error = true;
	}

},

resetForm() {
	for (let v in this.inputs) {
		this.inputs[v].data = null;
		this.inputs[v].error = false;
		this.inputs[v].focus = false;

		if (document.querySelector(`input[name="${v}"]`)) {
			document.querySelector(`input[name="${v}"]`).blur();
		}
	}

	this.success = false;
	this.formready = true;
	this.submitText = "Submit";
	this.errorMessage = null;

		}
	}
};
</script>

<style lang="scss">

	.outside-badge {
		margin-bottom: 1rem;
	}

	.form-submit {
		div > button {
			background: transparent;
			outline: 0;
			border: 0;
		}
	}

</style>

<style lang="scss" scoped>

	.form {
		max-width: 630px;
	}

	.main {
		position: absolute;

		top: 0;
		left: 0;
		z-index: 2;
		pointer-events: auto;
		width: 100%;

	}

	.flex-container {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
		background: darken(white, 2%);
		@media only screen and (max-height: 375px) {
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			justify-content: flex-start;
		}
	}

	.form-submit {
		margin-bottom: 2rem;
		margin-top: 2rem;
		div > button {
			background: transparent;
			outline: 0;
			border: 0;
		}
	}

	.form {
		width: 75%;
	}

	.error-message {
		width: 75%;
		@media only screen and (max-height: 375px) {
			margin-bottom: 5rem;
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
		z-index: 0;
		position: relative;
		display: block;
		padding-top: 32px;
		overflow: hidden;
		margin-top: 8px;

		&::after {
			content: "";
			display: block;
			position: absolute;
			height: 1px;
			top: auto;
			bottom: 0;
			left: 0;
			height: 1px;
			width: 100%;
			background: rgba(black, 0.3);
			z-index: 3;
		}

	}

	.label,
	.span,
	.line,
	.top-label {
		position: absolute;
		top: 0;
		left: 0;
	}

	.label,
	.top-label,
	.input {
		line-height: 32px;
	}

	.label,
	.top-label {
		top: auto;
		bottom: 0;
		transition: transform 150ms ease-in;
		transition-property: opacity, transform, color;
	}

	.label {
		z-index: 3;
	}

	.input {
		position: relative;
		z-index: 2;
		width: 100%;
		border: 0;
		outline: 0;
		padding-left: 8px;
		background: darken(white, 2%);
		margin: 0;
		padding: 0;
		overflow: visible;
		font-size: 16px;
		padding-bottom: 2px;
	}

	.top-label {
		top: auto;
		bottom: 0;
		opacity: 0;
		transition-timing-function: ease-out;
		z-index: 1;
		color: black;
		font-size: 12px;
	}

	.line {
		height: 2px;
		top: auto;
		bottom: 0px;
		left: 0;
		height: 2px;
		width: 100%;
		background: lighten(black, 33%);
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

	.fill,
	.error {
		.line {
			transform: translateX(0%);
			transition-timing-function: ease-in;
		}
	}

	.focus,
	.fill,
	.error {

		.label {
			transform: translateY(-50%);
			transition-timing-function: ease-out;
			opacity: 0;
		}

		.top-label {
			transition: transform 150ms ease-in 400ms, opacity 150ms ease-in 300ms,
			color 150ms ease-in 0s;
			transform: translateY(-90%);
			opacity: 1;
		}
	}

	@keyframes in {
		100% {
			opacity: 1;
		}
	}

	.close {

		cursor: pointer;
		position: fixed;
		opacity: 0;
		color: white;
		text-decoration: none;
		animation-name: in;
		animation-duration: 200ms;
		animation-fill-mode: forwards;
		animation-timing-function: ease;
		animation-delay: 700ms;
		background: transparent;
		border: 0;
		outline: 0;
		font-size: 10px;
		z-index: 103;
		width: 32px;
		height: 32px;
		left:0;
		top:0;
		padding-left:0;
		padding-right:0;
		padding-top:0;
		padding-bottom:0;

		> svg {
			width: 100%;
			height: 100%;
			fill: black;
			transition: fill 200ms ease;
			transition-property: fill, filter;
			filter: blur(0px);
		}

		&:focus,
		&:active {
			> svg {
				fill: darken(white, 20%);
				filter: blur(2px);
			}
		}

		@media only screen and (min-width: 630px) {

			width:32px;
			height:32px;
			left:16px;
			top:16px;
			&:hover {
				> svg {
					fill: darken(white, 20%);
					filter: blur(2px);
				}
			}
		}

		@media only screen and (max-width: 630px) {
			top: 4px;
			left: 4px;
			width: 24px;
			height: 24px;
			// font-size:8px;
			// > svg {
			// 	width: 10px;
			// 	height:10px;
			// }
		}
	}
</style>
