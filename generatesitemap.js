var fs = require("fs");
var builder = require("xmlbuilder");

const lastmod = function formatDate(date) {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
};

let types = ["marketing", "interactive", "website", "tech", "contact"];
let all = [];
let te = [];
let paths = [];

for (let type in types) {
  type = types[type];

  if (!all.includes('/'+type)) {
    all.push({
      path: '/'+type,
      priority: "0.8",
      changefreq: "daily",
      lastmod: lastmod()
    });
  }

  if (type == "marketing" || type == "interactive" || type == "website") {
    let data = require(`./public/json/${type}.json`);

    for (let project in data) {
      let techList = data[project].content["techList"];
      for (let tech in techList) {
        tech = encodeURI( techList[tech].toLocaleLowerCase() );
        if (!te.includes(tech)) {

          te.push({
            path: '/tech/'+tech,
            priority: "0.6",
            changefreq: "monthly",
            lastmod: lastmod()
          });

        }
      }
    }

    Object.keys(data).forEach(key => {
      if (!all.includes('/' + type + "/" + key)) {
        all.push({
          path: '/'+type + "/" + key,
          priority: "0.6",
          changefreq: "monthly",
          lastmod: lastmod()
        });
      }

      if (data[key].content.images && data[key].content.images.length) {
        data[key].content.images.forEach(image => {
          if (!all.includes('/' + type + "/" + key + "/" + image.path)) {
            all.push({
              path: '/' + type + "/" + key + "/" + image.path,
              priority: "0.4",
              changefreq: "monthly",
              lastmod: lastmod()
            });
          }
        });
      }
    });
  }
}

let t = builder
  .create("urlset", { encoding: "utf-8" })
  .att("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");

t.ele("url")
  .ele("loc", "https://devnola.com/")
  .up()
  .ele("lastmod", lastmod() )
  .up()
  .ele("changefreq", "daily")
  .up()
  .ele("priority", "1.0")
  .up()
  .up();

paths.push( "/" );

Object.keys(all).forEach(a => {
  
  t.ele("url")
    .ele("loc", "https://devnola.com" + all[a].path)
    .up()
    .ele("lastmod", all[a].lastmod)
    .up()
    .ele("changefreq", all[a].changefreq)
    .up()
    .ele("priority", all[a].priority)
    .up()
    .up();

  paths.push( all[a].path );

});

Object.keys(te).forEach(a => {
  t.ele("url")
    .ele("loc", "https://devnola.com" + te[a].path)
    .up()
    .ele("lastmod", te[a].lastmod)
    .up()
    .ele("changefreq", te[a].changefreq)
    .up()
    .ele("priority", te[a].priority)
    .up()
    .up();

  paths.push( te[a].path );

});

// let pathObj = {
//   "paths": paths,
//   "lazyLoad": true,
// };

// fs.writeFile('./public/_ssr.json', JSON.stringify( pathObj ), (err) => {
//     if (err) throw err;
// });

fs.writeFile(`./public/sitemap.xml`, t.end({ pretty: true }), function(err) {
  if (err) throw err;
});
