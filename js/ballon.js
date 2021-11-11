let arrowRef=document.getElementById('arrow');
let ballonRefs=document.querySelectorAll('.ballons')
let arrow_top=0,arrow_left=0;

// Id of ballon which is selected
let activeBallonId = null
// Calculating the extra height and width wrt, screen
let extraHeight = window.scrollY + document.querySelector('#myBoard').getBoundingClientRect().top
let extraWidht = window.scrollX + document.querySelector('#myBoard').getBoundingClientRect().left

window.addEventListener('keyup',(ev)=>{
    console.log("pressed...",ev.keyCode);
    if(ev.keyCode===40 && arrow_top <=360){
        arrow_top+=10;
        arrowRef.style=`top:${arrow_top}px`
    }
    if(ev.keyCode===38 && arrow_top >=10){
        arrow_top-=10;
        arrowRef.style=`top:${arrow_top}px`
    }
    if(ev.keyCode===13 ){
   
       let interval= setInterval(()=>{
            arrow_left+=10;
            
            //checkIfCollide(arrow_left+100,arrow_top+5)

            if(arrow_left >=500|| checkIfCollide(arrow_left+100,arrow_top+5)) {
                clearInterval(interval)
                arrow_left = 0
                arrow_top=0
            }
            arrowRef.style=`left:${arrow_left}px;top:${arrow_top}px`
        },50)
      
    }
});


ballonRefs.forEach(ballonRef=>{
    ballonRef.addEventListener('click',(ev)=>{
        console.log("classList:",ev.target.classList);

        activeBallonId = "#"+ballonRef.id

        let activeElement=document.querySelector('.active')
        if(activeElement){
            activeElement.classList.remove('active')
        }
        ev.target.classList.add('active')
    })
})

/**
 * Method to check if arrow is coliding with active ballon
 * arrowRight-right cordinate of arrow
 * arrowBottom-Bottom cordinate of arrow
*/
function checkIfCollide(arrowRight, arrowBottom) {
    if(activeBallonId === null) return;

    //calculating top and left cordinates of ballon w.r.t board 
    let ballonTop = window.scrollY + document.querySelector(activeBallonId).getBoundingClientRect().top-extraHeight;
    let ballonLeft = window.scrollX + document.querySelector(activeBallonId).getBoundingClientRect().left-extraWidht;

    // if right cordinate of arrow is greater then left cordinate of ballon.
    // And top of arrow is between top and bottom of selected ballon then ballon vanished.
    if(arrowRight >= ballonLeft && arrowBottom >= ballonTop && arrowBottom <= ballonTop+50){
        document.getElementById(activeBallonId.substr(1)).style.display = "none"
        activeBallonId = null
        return true
    }
    return false
}

