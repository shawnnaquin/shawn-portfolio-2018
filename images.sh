shopt -s globstar
gm mogrify -format jpg -quality 60 ./src/assets/portfolio/**/*.png
rm ./src/assets/portfolio/**/*.png