///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////DATA//////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var startButton = document.getElementById("start-slider");
var images = document.querySelectorAll(".slider-image");
var next = document.querySelector(".next"); 
var previous = document.querySelector(".previous");
var actual = 0;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////FUNCTIONS/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function launchSlider(){

    makeRadio();
    next.addEventListener("click",nextImage);
    previous.addEventListener("click",previousImage);
    startButton.addEventListener("click",startSlider);
    document.addEventListener("keydown",keyboard);
    
    console.log("slider launched");

}

function toggleAnimation(){

    for(var i = 0 ; i < images.length ; i++){

        if(images[i].classList.contains("active")){

            
            images[i].classList.remove("show");

            images[i].classList.add("inactive");
            images[i].classList.add("hide");
            
            actual = i ;
            
            setTimeout(function(){

                images[actual].classList.remove("active");
                
            },20);

        }else{
            images[i].classList.add("hide");
        }
    }
    
}

function makeRadio(){

    var radio = document.createElement("div");
    document.querySelector(".radio-selector").appendChild(radio);
    radio.classList.add("radio");
    radio.classList.add("selected-radio");

    console.log("First selector has been created");


    for(var i = 1 ; i <= images.length -1 ; i++){

        var radio = document.createElement("div");
        document.querySelector(".radio-selector").appendChild(radio);
        radio.classList.add("radio");
        radio.addEventListener("click", showImage);

        console.log("Selector has been made");

    }

}

function nextImage(){

    var radio = document.querySelectorAll(".radio");

    for( var i = 0 ; i < radio.length ; i++ ){

        if(radio[i].classList.contains("selected-radio")){

            actual = i;

            images[i].classList.remove("active");
            images[i].classList.remove("hide");
            
            images[i].classList.add("show");
            images[i].classList.add("inactive");

            setTimeout(function(){
                images[actual].classList.remove("inactive");
                images[actual].classList.add("active");
            },20);
        }

    }

   

    radio[actual].classList.remove("selected-radio");
    images[actual].classList.remove("show");
    images[actual].classList.add("hide");

    actual ++;

    if(actual >= images.length){

        actual = 0;

    }

    radio[actual].classList.add("selected-radio");
    images[actual].classList.add("show");
    images[actual].classList.remove("hide");
        
}

function previousImage(){

    var radio = document.querySelectorAll(".radio");

    for( var i = 0 ; i < radio.length ; i++ ){

        if(radio[i].classList.contains("selected-radio")){

            actual = i;
            images[i].classList.add("hide");
            images[i].classList.add("inactive");

            images[i].classList.remove("show");
            images[i].classList.remove("active");

            setTimeout(function(){
                images[actual].classList.remove("inactive");
                images[actual].classList.add("active");
            },20);
        }

    }

    radio[actual].classList.remove("selected-radio");
    images[actual].classList.remove("show");
    images[actual].classList.add("hide");

    actual --;

    if(actual < 0){

        actual = images.length -1;

    }

    radio[actual].classList.add("selected-radio");
    images[actual].classList.add("show");
    images[actual].classList.remove("hide");

}

function startSlider(){

    interval = setInterval(nextImage, 3000);

    startButton.removeEventListener("click",startSlider);

    console.log("Slider has started");

    startButton.addEventListener("click",stopSlider);

}

function stopSlider(){

    clearInterval(interval);

    console.log("slider has stopped");

    startButton.removeEventListener("click",stopSlider);

    startButton.addEventListener("click",startSlider);  

}

function keyboard(event){

    if(event.keyCode == 37){
        previousImage();
    }else if(event.keyCode == 39){
        nextImage();
    }else if(event.keyCode == 32){
        startSlider();
    }

}

function showImage(){

    document.addEventListener("click", function (event){//This approach is called event delegation, and it works by taking advantage of something called event bubbling.

        // If the clicked element doesn't have the right selector, bail
        if(!event.target.matches(".radio")) return;

        // Don't follow the link
        event.preventDefault();

        // Log the clicked element in the console
        //console.log(event.target);

        var radio = document.querySelectorAll(".radio");
        
        for( var i = 0 ; i < radio.length ; i++){

            radio[i].classList.remove("selected-radio");
            images[i].classList.remove("active");
            images[i].classList.remove("show");
            images[i].classList.add("hide");
            images[i].classList.add("inactive");

        }

        event.target.classList.add("selected-radio");

        for( var i = 0 ; i < radio.length ; i++ ){

            if(radio[i].classList.contains("selected-radio")){
    
                actual = i;
    
                images[i].classList.remove("active");
                images[i].classList.remove("hide");
                
                images[i].classList.add("show");
                images[i].classList.add("inactive");
    
                setTimeout(function(){
                    images[actual].classList.remove("inactive");
                    images[actual].classList.add("active");
                },20);
            }
    
        }

    })
    
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////MAIN//////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", launchSlider);