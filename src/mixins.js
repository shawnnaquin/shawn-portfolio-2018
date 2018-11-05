export default {
	methods: {
		beforeEnter: function (el) {
		  el.style.opacity = 0;
		},
		enter: function (el, done) {

		  let delay = el.dataset.index * 200;
		  // console.log(delay);
		  setTimeout( () => {

		  	let f = 0;
		  	let p = requestAnimationFrame( t );

		  	function t() {
		  		if ( el.style.opacity < 1 )  {
		  			requestAnimationFrame(t);
		  			el.style.opacity = f += 0.08;
		  		} else {
		  			cancelAnimationFrame(p);
		  			el.style.opacity = 1;
		  			done;
		  			return;
		  		}
		  	}

		  }, delay );

		},
		leave: function (el, done) {
			done;
		}
	}
};