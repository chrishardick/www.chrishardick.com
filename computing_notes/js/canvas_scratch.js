//=============================================================================
//
//  canvas_scratch.js
//
//  JS for 
//
//  IMPORTANT FUNCTIONS
//  ===================
//
//=============================================================================


//
//
//
function on_mouse_over (e)
{
    console.info("on_mouse_over: ENTER");

    var msg_element = document.getElementById('msg');

    p.innerHTML = msg_element.toString();
    
    console.info("on_mouse_over: LEAVE");
}

//
// register click events for calculator buttons
//


console.info("canvas_scratch.js: ENTER");

var canvas_element = document.getElementById('canvas');

canvas_element.addEventListener("onclick", on_mouse_over, false);

