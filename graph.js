function init() {
 Draw() ;
}

var Canvas = document.getElementById('canvas');  
var Ctx = null ;

var Width = Canvas.width ;
var Height = Canvas.height ;

var MaxX = 10,MinX = -10;

function MaxY() {
  return MaxX * Height / Width;
}

function MinY() {
   return MinX * Height / Width;
}

function XC(x) {
  return (x - MinX) / (MaxX - MinX) * Width;
}

function YC(y) {
  return Height - (y - MinY()) / (MaxY() - MinY()) * Height;
}


function Draw() {

 eval(document.getElementById('function-code').value) ;
 
 if (Canvas.getContext) {
  
   // Set up the canvas:
   Ctx = Canvas.getContext('2d');
   Ctx.clearRect(0,0,Width,Height) ;

   // Draw:
   DrawAxes() ;
   RenderFunction(F) ;
  
  } 
}

var d = 1;
  
function DrawAxes() {
 Ctx.save() ;
 Ctx.lineWidth = 2 ;
 // +Y axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(0),YC(MaxY())) ;
 Ctx.stroke() ;

 // -Y axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(0),YC(MinY())) ;
 Ctx.stroke() ;

 // Y axis tick marks
 //var d = YTickDelta() ;
 for (var i = 1; (i*d) < MaxY() ; ++i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(0) - 5,YC(i*d)) ;
  Ctx.lineTo(XC(0) + 5,YC(i*d)) ;
  Ctx.stroke() ;  
 }

 //var d = YTickDelta() ;
 for (var i = 1; (i*d) > MinY() ; --i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(0) - 5,YC(i*d)) ;
  Ctx.lineTo(XC(0) + 5,YC(i*d)) ;
  Ctx.stroke() ;  
 }  

 // +X axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(MaxX),YC(0)) ;
 Ctx.stroke() ;

 // -X axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(MinX),YC(0)) ;
 Ctx.stroke() ;

 // X tick marks
 //var d = XTick ;
 for (var i = 1; (i*d) < MaxX ; ++i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(i*d),YC(0)-5) ;
  Ctx.lineTo(XC(i*d),YC(0)+5) ;
  Ctx.stroke() ;  
 }

 //var d = XTick ;
 for (var i = 1; (i*d) > MinX ; --i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(i*d),YC(0)-5) ;
  Ctx.lineTo(XC(i*d),YC(0)+5) ;
  Ctx.stroke() ;  
 }
 Ctx.restore() ;
}

var inc = (MaxX-MinX)/Width ;

function RenderFunction(f) {
  var first = true;

  Ctx.beginPath() ;
  for (var x = MinX; x <= MaxX; x += inc) {
   var y = f(x) ;
   if (first) {
    Ctx.moveTo(XC(x),YC(y)) ;
    first = false ;
   } else {
    Ctx.lineTo(XC(x),YC(y)) ;
   }
  }
  Ctx.stroke() ;
}



 
 
