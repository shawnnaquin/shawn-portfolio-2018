const testFolder = './public/img/portfolio/marketing/';
const srcFolder = './src/assets/portfolio/marketing/';
const fs = require('fs');

const json = JSON.parse( fs.readFileSync( './public/json/marketing.json', 'utf8') );


fs.readdir( srcFolder, (err, files)=>{

	files.forEach(file => {

		let name = file.split('.').slice(0, -1);

		if ( name[0] == 'main' ) {
			json[ name[1] ].mainImage.path = name.join('.');
		} else {

			const aa = json[ name[1] ].content.images;
			let pos = null;

			aa.forEach( (image,i)=> {
				if ( image.path == name.join('.') ) {
					pos = i;
				}
			});

			if ( pos === null ) {
				aa.push( { path: name.join('.') } );
			}
		}

	});

	fs.writeFileSync('./public/json/marketing.json', JSON.stringify(json) );

});

// image-lg_1x.webp 1x, image-lg_2x.webp 2x
// image-md_1x.webp 1x, image-md_2x.webp 2x
// image-sm_1x.webp 1x, image-sm_2x.webp 2x
// image-sm_1x.jpg 600w, image-md_1x.jpg 900w, image-lg_1x.jpg 1440w
// image_lg_1x.jpg