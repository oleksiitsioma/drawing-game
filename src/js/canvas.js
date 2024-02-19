const canvases = document.getElementsByClassName('gameCanvas');
const sourceCanvas = document.getElementById('canvas-source');
const replicaCanvas = document.getElementById('canvas-replica');

const eraseCanvasesButton = document.getElementById('tool-erase-canvases');
const saveSourceCanvasButton = document.getElementById('tool-save-source');
const compareCanvasesButton = document.getElementById('tool-compare-canvases');
const overlapOutput = document.getElementById('tool-output-overlap');

// Drawing
const width = 20;

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
const getPositionTouch = ( canvas , e ) =>{
    const touch = e.touches[0]
    coord.x = touch.clientX - canvas.offsetLeft;
    coord.y = touch.clientY - canvas.offsetTop;
}
    
const startPainting = ( canvas , e , method ) => {
    paint = true;
    method == 'touch' ? getPositionTouch( canvas , e ) : getPosition( canvas , e );
}

const stopPainting = () =>{
    paint = false;
}

const sketch = ( canvas , e , method ) => {
    if (!paint) return;
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.moveTo(coord.x, coord.y);
    method == 'touch' ? getPositionTouch( canvas , e ) : getPosition( canvas , e );
    ctx.lineTo(coord.x , coord.y);
    ctx.stroke();
}

for (let i = 0; i < canvases.length; i++) {

    canvasInit( canvases[i] );
    
    canvases[i].addEventListener('mousedown', (e) => {
        startPainting( canvases[i] , e , 'mouse');
    });
    canvases[i].addEventListener('pointerup', stopPainting);
    canvases[i].addEventListener('pointerout', stopPainting);
    canvases[i].addEventListener('touchcancel', stopPainting);
    canvases[i].addEventListener('mousemove', (e) => {
        sketch( canvases[i] , e , 'mouse' )
    });
    canvases[i].addEventListener('touchstart', (e) => {
        startPainting( canvases[i] , e , 'touch' );
    });
    canvases[i].addEventListener('touchmove', (e) => {
        sketch( canvases[i] , e , 'touch')
    });



}


const saveSourceCanvas = () =>{
    sourceCanvas.classList.add('gameCanvas_inactive');
    replicaCanvas.classList.remove('gameCanvas_inactive');
}
const eraseCanvases = () =>{
    for (let i = 0; i < canvases.length; i++) {
        const ctx = canvases[i].getContext('2d');
        ctx.clearRect( 0 , 0 , canvases[i].offsetWidth , canvases[i].offsetHeight );
    }
    sourceCanvas.classList.remove('gameCanvas_inactive');
    replicaCanvas.classList.add('gameCanvas_inactive');
    overlapOutput.textContent = '';
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

    overlapOutput.textContent = Math.round( comparisonRate * 100 ) + '%';


}

saveSourceCanvasButton.addEventListener( 'click' , saveSourceCanvas);
eraseCanvasesButton.addEventListener( 'click' , eraseCanvases);
compareCanvasesButton.addEventListener( 'click' , () => {
    compareCanvases( sourceCanvas , replicaCanvas )
});

