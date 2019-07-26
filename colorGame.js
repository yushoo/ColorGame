
//Design does not incorporate objects as recommended by conventional javascript design pattern
var numberSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


//first method to be called when the web page starts
init();

//set up the buttons, squares, and reset for start gameplay
function init(){
	setupModeButtons();
	setupSquares();
    reset();
}

function setupModeButtons(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            // removes styling from both game mode buttons
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            // adds back the selected styling on the one selected by the click event listener
            this.classList.add("selected");
            // ternary operator: first part is the condition, next two parts are conditions
            this.textContent === "Easy" ? numberSquares =3: numberSquares = 6;
            reset();
        });
    }
}

function setupSquares(){
    for(var i = 0; i < squares.length; i++){
        //add click listeners to squares
            squares[i].addEventListener("click", function(){
                //grab color of clicked square
                /*!!!! 
                    Because The domObj.style only returns styles that are set inline using the style attribute.
                    For styles that come from a CSS file you need to use something like: window.getComputedStyle
                */
                // var clickedColor = this.style.backgroundColor;
                // console.log(this.style.backgroundColor);
                // alert(this.style.background);

                var elem = this;
                var clickedColor = window.getComputedStyle(elem,null).getPropertyValue("background-color");
                //console.log(clickedColor);
                //compare color to pickedColor
                //alert(clickedColor + " "+ pickedColor)
                if(clickedColor === pickedColor){
                    messageDisplay.textContent = "Correct!";
                    resetButton.textContent = "Play Again?"
                    changeColors(clickedColor);
                    h1.style.background = clickedColor;
                    //console.log("HEY THIS IS THE RIGHT COLOR");
                    //alert("clicked");
                } else {
                    this.style.background = "#232323";
                    messageDisplay.textContent = "Try Again"
                }
            });
        }
}

function reset(){
    //generate all new colors
    colors = generateRandomColors(numberSquares);
    //pick a new random color for array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    //change colors of squares
    for(var i = 0 ; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
}



resetButton.addEventListener("click", function(){
    reset();
});


    
//changes all the div boxes to coloDisplay
function changeColors(colorDisplay){
    for(var i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = colorDisplay;
    }
}

//selects and returns a single color
function pickColor(){
   var random = Math.floor( Math.random() * colors.length);
   return colors[random];
}

//generates and returns an array of random rgb random colors
function generateRandomColors(num){
    //make an array
    var arr = [];
    //add num random colors to array
    for(var i = 0; i < num; i++){
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

//generates and returns random rgb values 
function randomColor(){
    //pick a "red" from 0 - 255
    var red = Math.floor(Math.random() * 256);
    //pick a "green" from 0 - 255
    var green = Math.floor(Math.random() * 256)
    //pick a "blue" from 0 - 255
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
 }