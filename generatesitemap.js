var fs = require("fs");
var builder = require("xmlbuilder");

let types = ["marketing", "interactive", "website", "tech", "contact"];
let all = [];
let te = [];

for (let type in types) {
  type = types[type];

  if (!all.includes('/'+type)) {
    all.push({
      path: '/'+type,
      priority: "0.8",
      changefreq: "daily",
      lastmod: "2018-12-09"
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
            lastmod: "2018-12-09"
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
          lastmod: "2018-12-09"
        });
      }

      if (data[key].content.images && data[key].content.images.length) {
        data[key].content.images.forEach(image => {
          if (!all.includes('/' + type + "/" + key + "/" + image.path)) {
            all.push({
              path: '/' + type + "/" + key + "/" + image.path,
              priority: "0.4",
              changefreq: "monthly",
              lastmod: "2018-12-09"
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
  .ele("loc", "https://noladev.com/")
  .up()
  .ele("lastmod", "2018-12-09")
  .up()
  .ele("changefreq", "daily")
  .up()
  .ele("priority", "1.0")
  .up()
  .up();

Object.keys(all).forEach(a => {
  t.ele("url")
    .ele("loc", "https://noladev.com/" + all[a].path)
    .up()
    .ele("lastmod", all[a].lastmod)
    .up()
    .ele("changefreq", all[a].changefreq)
    .up()
    .ele("priority", all[a].priority)
    .up()
    .up();
});

Object.keys(te).forEach(a => {
  t.ele("url")
    .ele("loc", "https://noladev.com/" + te[a].path)
    .up()
    .ele("lastmod", te[a].lastmod)
    .up()
    .ele("changefreq", te[a].changefreq)
    .up()
    .ele("priority", te[a].priority)
    .up()
    .up();
});

fs.writeFile(`./public/sitemap.xml`, t.end({ pretty: true }), function(err) {
  if (err) throw err;
});
