export default {
  data() {
    return {
      frame: false
    };
  },

  beforeDestroy() {
    cancelAnimationFrame(this.frame);
  },

  methods: {
    beforeEnter: function(el) {
      el.style.opacity = 0;
    },

    enter: function(el, done) {
      let delay = el.dataset.index * 200;

      setTimeout(() => {
        let f = 0;
        let fr = (this.frame = requestAnimationFrame(t));

        function t() {
          if (el.style.opacity < 1) {
            requestAnimationFrame(t);
            el.style.opacity = f += 0.08;
          } else {
            cancelAnimationFrame(fr);
            el.style.opacity = 1;
            done;
            return;
          }
        }
      }, delay);
    },

    leave: function(el, done) {
      done;
    }
  }
};
