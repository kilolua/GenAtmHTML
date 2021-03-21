const fetch = require("node-fetch");
const fs = require("fs");
const json2html = require('node-json2html');
const supportHtml = require("./supportHtml.js")

fetch("https://api.figma.com/v1/files/vZRgcyWMOz8tg1lzH4SjSx", {
  headers: {
    "X-Figma-Token": '166351-7aac409c-54bc-4425-90c8-eb1a8585d613'
  }
}).then((data)=>{
  data.json().then((data)=>{
    createHTML(data);
  })
});

let rootBox;
let rootFrame;
let support = new supportHtml.SupportHtml;

const createHTMLContainer=(rootFrame, rootBox)=>{
  var res = ""
  //console.log(rootFrame);
  if (!!rootFrame.children && !!rootFrame.children.length && rootFrame.children.length > 0) {
    rootFrame.children.forEach(node => {
      if (typeof node.visible === "undefined") {
        if (node.name[0] === "!") {
          //console.log(support.getNodeImage(node, rootBox));
          res += support.getNodeImage(node, rootBox)
          //console.log(1);
        } else
          {
          res += createHTMLContainer(node, rootBox);
          res += support.getNodeHTML(node, rootBox);
        }
      }
    })
  }
  else{
    // res += support.getNodeHTML()
    return ''
  }
  return res
}

const createHTML = data => {
  rootFrame = data.document.children[0].children[0]
  rootBox = rootFrame.absoluteBoundingBox;

  let doc = support.getBeginHtml();

  doc += createHTMLContainer(rootFrame, rootBox);

  doc += support.getEndHtml();
  support.generateCSSFile();
  fs.writeFileSync("./webiusHTML/out.html", doc);
}
