const canvases = document.getElementsByClassName('gameCanvas');
const sourceCanvas = document.getElementById('canvas-source');
const replicaCanvas = document.getElementById('canvas-replica');

const eraseCanvasesButton = document.getElementById('tool-erase-canvases');
const saveSourceCanvasButton = document.getElementById('tool-save-source');
const compareCanvasesButton = document.getElementById('tool-compare-canvases');

// Drawing
const width = 10;

const canvasInit = ( el ) => {
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    el.setAttribute( 'width' , width );
    el.setAttribute( 'height' , height );
}

const canvasesStatus = {};
let coord = {x:0 , y:0};
let paint = false;

const getPosition = ( canvas , e ) =>{
    coord.x = e.clientX - canvas.offsetLeft;
    coord.y = e.clientY - canvas.offsetTop;
}
    
const startPainting = ( canvas , e ) => {
    paint = true;
    getPosition( canvas , e );
}

const stopPainting = () =>{
    paint = false;
}

const sketch = ( canvas , e ) => {
    if (!paint) return;
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.moveTo(coord.x, coord.y);
    getPosition( canvas , e );
    ctx.lineTo(coord.x , coord.y);
    ctx.stroke();
}

for (let i = 0; i < canvases.length; i++) {

    canvasInit( canvases[i] );
    
    canvases[i].addEventListener('pointerdown', (e) => {
        startPainting( canvases[i] , e );
    });
    canvases[i].addEventListener('pointerup', stopPainting);
    canvases[i].addEventListener('pointermove', (e) => {
        sketch( canvases[i] , e)
    });



}


const saveSourceCanvas = () =>{
    sourceCanvas.classList.add('gameCanvas_inactive');
    replicaCanvas.classList.remove('gameCanvas_inactive');
}
const eraseCanvases = () =>{
    sourceCanvas.classList.remove('gameCanvas_inactive');
    replicaCanvas.classList.add('gameCanvas_inactive');
}

const compareCanvases = ( source , replica ) => {
    
    const sourceCtx = source.getContext('2d');
    const sourceData = sourceCtx.getImageData( 0 , 0 , source.offsetWidth , source.offsetHeight ).data;
    
    const replicaCtx = replica.getContext('2d');
    const replicaData = replicaCtx.getImageData( 0 , 0 , replica.offsetWidth , replica.offsetHeight ).data;

    if( !sourceData.some(channel => channel !==0 ) ){
        alert('Source canvas is empty');
        return;
    }

    if( !replicaData.some(channel => channel !==0 ) ){
        alert('Replica canvas is empty');
        return;
    }
    
    let whitePixels = 0;
    let correctPixels = 0;

    for (let i = 0; i < sourceData.length; i++) {
        if( sourceData[i] !== 0){
            if( sourceData[i] === replicaData[i]){
                correctPixels++;
            }
        } else {
            whitePixels++
        }
    }

    const activePixels = sourceData.length - whitePixels;

    const comparisonRate = correctPixels / activePixels;

    console.log( Math.round( comparisonRate * 100 ) + '%' );


}

saveSourceCanvasButton.addEventListener( 'click' , saveSourceCanvas);
eraseCanvasesButton.addEventListener( 'click' , eraseCanvases);
compareCanvasesButton.addEventListener( 'click' , () => {
    compareCanvases( sourceCanvas , replicaCanvas )
});

