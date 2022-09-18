let textContainer;
let t = "sample text";

// Get the values that you have entered in the textarea and
// write it in the DIV over the image.

let writeText = (ele) => {
  t = ele.value;
  document.getElementById("theText").innerHTML = t.replace(/\n\r?/g, "<br />");
};

// Finally, save the image with text over it.
let saveImageWithText = () => {
  textContainer = document.getElementById("theText"); // The element with the text.

  // Create an image object.
  let img = new Image();
  img.crossOrigin = "anonymous";
  img.src = document.getElementById("myimage").src;

  // Create a canvas object.
  let canvas = document.createElement("canvas");

  // Wait till the image is loaded.
  img.onload = function () {
    drawImage();
    downloadImage("ingaz_greeting"); // Download the processed image.
  };

  // Draw the image on the canvas.
  let drawImage = () => {
    let ctx = canvas.getContext("2d"); // Create canvas context.

    // Assign width and height.
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image.
    ctx.drawImage(img, 0, 0);

    textContainer.style.border = 0;

    // Get the padding etc.
    let left = parseInt(window.getComputedStyle(textContainer).left);
    let right = textContainer.getBoundingClientRect().right;
    let top = parseInt(window.getComputedStyle(textContainer).top, 0);
    let center = textContainer.getBoundingClientRect().width / 2;

    let paddingTop = window
      .getComputedStyle(textContainer)
      .paddingTop.replace("px", "");
    let paddingLeft = window
      .getComputedStyle(textContainer)
      .paddingLeft.replace("px", "");
    let paddingRight = window
      .getComputedStyle(textContainer)
      .paddingRight.replace("px", "");
    //console.log("padding",paddingLeft)
    // Get text alignement, colour and font of the text.
    let txtAlign = window.getComputedStyle(textContainer).textAlign;
    let color = window.getComputedStyle(textContainer).color;
    let fnt = window.getComputedStyle(textContainer).font;
    console.log(txtAlign,color,fnt);
    // Assign text properties to the context.
    ctx.font = fnt;
    ctx.fillStyle = color;
    ctx.textAlign = txtAlign;

    // Now, we need the coordinates of the text.
    //عدل المكان هنا
    let x; // coordinate.
    if (txtAlign === "right"  || txtAlign === "start") {
        x = right + parseInt(paddingRight); //- 11;
    }
    if (txtAlign === "left" || txtAlign === "start") {
      x = left + parseInt(paddingLeft);
    }
    if (txtAlign === "center" || txtAlign === "start") {
      x = center + left;
    }
    // Get the text (it can a word or a sentence) to write over the image.
    let str = t.replace(/\n\r?/g, "<br />").split("<br />");

    // finally, draw the text using Canvas fillText() method.
    for (let i = 0; i <= str.length - 1; i++) {
      ctx.fillText(
        str[i].replace("</div>", "").replace("<br>", "").replace(";", ""),
        x,
        parseInt(paddingTop, 10) + parseInt(top, 10) + 10 + i * 15
      );
    }

    // document.body.append(canvas);  // Show the image with the text on the Canvas.
  };

  // Download the processed image.
  let downloadImage = (img_name) => {
    let a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = img_name;
    document.body.appendChild(a);
    a.click();
  };
};
