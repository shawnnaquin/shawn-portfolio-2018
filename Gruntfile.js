// const imagemin = require("imagemin");
// const pngToJpeg = require("png-to-jpeg");

module.exports = function(grunt) {
  grunt.initConfig({
    cwebp: {
      dynamic: {
        options: {
          q: 60
        },
        sizes: [
          { name: "sm", suffix: "_2x", quality: 60, width: 1200 },
          { name: "md", suffix: "_2x", quality: 60, width: 1800 },
          { name: "lg", suffix: "_2x", quality: 60, width: 2880 }
        ],
        files: [
          {
            expand: true,
            cwd: "./public/img/portfolio/",
            src: ["**/*.{jpg,png}"],
            dest: "./public/img/portfolio/"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-responsive-images");
  grunt.loadNpmTasks("grunt-cwebp");
  grunt.registerTask("default", ["responsive_images", "cwebp"]);
};
