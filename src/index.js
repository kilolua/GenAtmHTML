const fetch = require("node-fetch");
const fs = require("fs");
const supportHtml = require("./supportHtml.js")
const HTMLConstants = require('./textHtmlConst')

fetch("https://api.figma.com/v1/files/wx5gaDdT6XEU8YeZFLGyeV", {
  headers: {
    "X-Figma-Token": '166351-7aac409c-54bc-4425-90c8-eb1a8585d613'
  }
}).then((data)=>{
  data.json().then((data)=>{
    createHTML(data);
    fs.writeFileSync("./webiusHTML/out.json", JSON.stringify(data));
  })
});


let rootBox;
let rootFrame;
let cssText
let support = new supportHtml.SupportHtml;
const createHTMLContainer=(rootFrame, rootBox)=>{
  console.log("OK")
  var res = ""
  if (!!rootFrame.children && !!rootFrame.children.length && rootFrame.children.length > 0) {
    rootFrame.children.forEach(node => {
      if (typeof node.visible === "undefined") {
        if (node.name[0] === "!") {
          res += support.getNodeImage(node, rootBox)
        } else
          {
            res += support.getNodeHTML(node, rootBox);
            res += createHTMLContainer(node, node.absoluteBoundingBox);
            res += "</div>"
        }
      }
    })
  }
  else{
    return ''
  }
  return res
}

const createHTML = data => {
  let rootFrames = data.document.children[0].children;
  rootFrames.forEach((rootFrame, index)=>{
    rootBox = rootFrame.absoluteBoundingBox;
    let doc = HTMLConstants.beginHTML;

    doc += createHTMLContainer(rootFrame, rootBox);

    doc += HTMLConstants.endHTML;
    fs.writeFileSync(`./webiusHTML/${rootFrame.name}.html`, doc);
    support.generateDataMock(rootFrame.name)
  })
  support.generateCSSFile()
}
