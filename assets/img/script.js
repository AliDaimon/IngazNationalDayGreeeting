window.onload = function(){
     var canvas = document.getElementById("myCanvas");
     var context = canvas.getContext("2d");
     var imageObj = new Image();
     imageObj.onload = function(){
         context.drawImage(imageObj, 10, 10);
         context.font = "40pt Calibri";
         context.fillText("hello,world", 20, 20);
     };
     imageObj.src = "download.jpeg"; 
};
