const json2html = require('node-json2html');
const fs = require("fs");
const fetch = require("node-fetch");
const sfetch = require('sync-fetch')

class SupportHtml{
  constructor() {
   this.cssText = "html {\n" +
     "      overflow: hidden;\n" +
     "      /*cursor: none;*/\n" +
     "      font-family: \"Open Sans light\", Arial, serif;\n" +
     "}\n" +
     "@font-face {\n" +
     "      font-family: 'Open Sans light';\n" +
     "      src: local('Open Sans'), local('OpenSans'), url('./font/opensans.woff2') format('woff2'), url('./font/opensans.woff') format('woff'), url('./font/opensans.ttf') format('truetype');\n" +
     "      font-weight: 400;\n" +
     "      font-style: normal;\n" +
     "}\n" +
     "\n" +
     "@font-face {\n" +
     "      font-family: 'Open Sans';\n" +
     "      src: local('Open Sans Semibold'), local('OpenSans-Semibold'), url('./font/opensanssemibold.woff2') format('woff2'), url('./font/opensanssemibold.woff') format('woff'), url('./font/opensanssemibold.ttf') format('truetype');\n" +
     "      font-weight: 400;\n" +
     "      font-style: normal;\n" +
     "}";
   this.namingCounter = 1;
  }

  getBeginHtml(){
    return `<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <div style="width:800px; height: 600px">\n`
  }

  getEndHtml(){
    return `    </div>
</body>
</html>`
  }

  getNamingCounter(){
    this.namingCounter += 1;
    return this.namingCounter;
  }

  editTabHtml(text){
    return '\t\t'+text+"\n"
  }

  getCorrectlyClassNameCSS(name){
    let res = name
    res = res.replace(/[0-9]/g, '');
    res += this.namingCounter
    res = res.replace(/ /g, '_');
    res = res.replace(/!/g, '');
    res = res.replace(/:/g, '');
    return res

  }

  generateCSS(node, rootBox){
    let x = node.absoluteBoundingBox.x - rootBox.x;
    let y = node.absoluteBoundingBox.y - rootBox.y;
    let className = this.getCorrectlyClassNameCSS(node.name);
    let bgColor = 'none';
    let borderRadius = "";
    let font_size = "";
    if (node.type === "TEXT"){
      if (!!node.style && !!node.style.fontSize){
        font_size = node.style.fontSize + 'px';
      }
    }
    // console.log(node.fills[0])
    if (!!node.fills && node.fills.length > 0 && node.fills[0].color){
      let color = node.fills[0].color;
      bgColor = `rgb(${Math.round(color.r*100)}%,${Math.round(color.g*100)}%, ${Math.round(color.b*100)}%)`;
    }
    if (!!node.rectangleCornerRadii && node.rectangleCornerRadii.length > 0){
      let border = node.rectangleCornerRadii;
      borderRadius = `border-radius: ${border[0]}px ${border[1]}px ${border[2]}px ${border[3]}px`
      console.log(1)
    }
    let resCSS = `.${className} {
      width: ${node.absoluteBoundingBox.width}px;
      height: ${node.absoluteBoundingBox.height}px;
      position: absolute;
      ${node.type === "TEXT"?"color: "+bgColor:"background: "+bgColor};
      ${borderRadius === ""?"":borderRadius};
      left: ${x}px;
      top: ${y}px;
      ${font_size !== ""?"font-size: "+font_size: ""};
}\n\n`;
    this.cssText += resCSS

  }

  getImageNodeHTML(node, rootBox, url){
    let className = this.getCorrectlyClassNameCSS(node.name);
    let transform = {'<>':'div','class':className,'html':[
        {'<>':'img','alt':'','src':url},
      ]};
    //console.log(json2html.transform({},transform));
    this.generateCSS(node, rootBox);
    this.namingCounter += 1;
    return this.editTabHtml(json2html.transform({},transform));
  }

  getImageData(id){
    let res = sfetch("https://api.figma.com/v1/images/vZRgcyWMOz8tg1lzH4SjSx?ids="+id, {
      headers: {
        "X-Figma-Token": '166351-7aac409c-54bc-4425-90c8-eb1a8585d613'
      }
    }).json();
    if (res.err === null){
      return res.images[id];
    }
    else{
      return ""
    }
  }

  getNodeImage(node, rootBox){
    var data = this.getImageData(node.id);

    if (data !== "")
      return this.getImageNodeHTML(node, rootBox, data)
    else
      return ""
  }


  getNodeHTML(node, rootBox){
    if (typeof node.characters !== "undefined" || !!node.fills && node.fills.length > 0 && node.fills[0].color) {
      let className = this.getCorrectlyClassNameCSS(node.name);
      let transform = {
        '<>': 'div',
        'class': className,
        'id': 'label-' + className,
        'html': `${typeof node.characters === "undefined" ? "" : node.characters}`
      };
      this.generateCSS(node, rootBox);
      this.namingCounter += 1;
      return this.editTabHtml(json2html.transform({}, transform));
    }
    return ""
  }

  generateCSSFile(){
    fs.writeFileSync('./webiusHTML/main.css', this.cssText);
  }

}

module.exports.SupportHtml = SupportHtml;