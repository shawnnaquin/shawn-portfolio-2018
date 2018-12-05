const fs = require("fs");
const dir = ["marketing", "interactive", "website"];

dir.forEach(d => {
  const testFolder = `./public/img/portfolio/${d}/`;
  const srcFolder = `./src/assets/portfolio/${d}/`;
  const json = JSON.parse(fs.readFileSync(`./public/json/${d}.json`, `utf8`));

  fs.readdir(srcFolder, (err, files) => {
    files.forEach(file => {
      if (file.includes("DS_Store")) return;
      // let name = file.split('.').slice(0, -1);
      const nameA = file.split(".");
      const projectName = nameA[nameA.length - 2];
      const prefix = nameA[0];
      const path = nameA.slice(0, -1).join(".");

      if (prefix == "main") {
        json[projectName].mainImage.path = path;
      } else {
        if (!json[projectName] || !json[projectName].content) {
          console.log(nameA);
        }

        const aa = json[projectName].content.images;
        let pos = null;

        aa.forEach((image, i) => {
          if (image.path == path) {
            pos = i;
          }
        });

        if (pos === null) {
          aa.push({ path: path });
        }
      }
    });

    fs.writeFileSync(`./public/json/${d}.json`, JSON.stringify(json));
  });
});

// image-lg_1x.webp 1x, image-lg_2x.webp 2x
// image-md_1x.webp 1x, image-md_2x.webp 2x
// image-sm_1x.webp 1x, image-sm_2x.webp 2x
// image-sm_1x.jpg 600w, image-md_1x.jpg 900w, image-lg_1x.jpg 1440w
// image_lg_1x.jpg
