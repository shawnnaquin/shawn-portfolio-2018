fs = require('fs');
var builder = require('xmlbuilder');

let types = ['marketing','interactive','website','tech','contact'];
let all = [];
for( let type in types ) {

	type = types[type];


	if ( !all.includes(type) ) {
		all.push({
			path: type,
			priority: '0.8',
			changefreq: 'weekly',
			lastmod: '2018-11-30'
		});
	}

	if( type == 'marketing' || type == 'interactive' || type == 'website' ) {

		let data = require( `./public/json/${type}.json` );

		Object.keys( data ).forEach( key => {
			if ( !all.includes( type + '/' + key ) ) {
				all.push({
					path: type + '/' + key,
					priority: '0.6',
					changefreq: 'weekly',
					lastmod: '2018-11-30'
				});
			}

			if ( data[key].content.images && data[key].content.images.length ) {
				data[key].content.images.forEach( image => {
					if ( !all.includes( type + '/' + key + '/' + image.path ) ) {
						all.push({
							path: type + '/' + key + '/' + image.path,
							priority: '0.4',
							changefreq: 'weekly',
							lastmod: '2018-11-30'
						});
					}
				});
			}

		});
	}


}

let t = builder.create('urlset', { encoding: 'utf-8' })
	.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
	t.ele('url')
	    .ele('loc', 'https://shawnnaquin.github.io/' ).up()
	    .ele('lastmod', '2018-11-30' ).up()
		.ele('changefreq', 'monthly' ).up()
		.ele('priority', '1.0' ).up()
	.up();

Object.keys(all).forEach( a => {
	t.ele('url')
	    .ele('loc', 'https://shawnnaquin.github.io/?p=' + all[a].path ).up()
	    .ele('lastmod', all[a].lastmod ).up()
		.ele('changefreq', all[a].changefreq ).up()
		.ele('priority', all[a].priority ).up()
	.up();
});


fs.writeFile(`./public/sitemap.xml`, t.end({pretty:true}), function(err) {
  if (err) throw err;
});