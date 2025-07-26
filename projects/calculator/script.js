$(document).ready(function(){
    /*var testNumLength = function(number) {
        if (number.length > 9) {
            totaldiv.text(number.substr(number.length-9,9));
            if (number.length > 15) {
                number = "";
                totaldiv.text("Err");
            }
        }
    };*/

    var isSeconNumber = false;
    var number = "";
    var newnumber = "";
    var operator = "";
    var totaldiv = $("#total");
    totaldiv.children("h2").text("0");

    $(".left .button").click(function(){
        number += $(this).children("h3").text();

        if (isSeconNumber === true) {
            totaldiv.children("h2").text(newnumber + operator + number);
        }
        else {
            totaldiv.children("h2").text(number);
        }

        //testNumLength(number);
    });
    $(".right .button").not("#equals ,#clearall").click(function(){
        isSeconNumber = true;
        operator = $(this).children("h3").text();
        newnumber = number;
        number = "";
        totaldiv.children("h2").text(newnumber + operator);
    });
    $("#clearall").click(function(){
        isSeconNumber = false;
        number = "";
        totaldiv.children("h2").text("0");
        newnumber = "";
        $("title").text("Calculator");
    });
    //Add your last .click() here!
    $("#equals").click(function() {

        isSeconNumber = false;
        var result = ""

        if(operator === "+") {
            number = parseInt(number, 10);
            newnumber = parseInt(newnumber, 10);
            result = newnumber + number;

        }
        else if (operator === "-") {
            number = parseInt(number, 10);
            newnumber = parseInt(newnumber, 10);
            result = newnumber - number;
        }
        else if (operator === "÷") {
            number = parseInt(number, 10);
            newnumber = parseInt(newnumber, 10);
            result = newnumber / number;
        }
        else if (operator === "×") {
            number = parseInt(number, 10);
            newnumber = parseInt(newnumber, 10);
            result = newnumber * number;
        }
        else {
            result = number;
        }

        result = result.toString(10);
        //testNumLength(result);
        totaldiv.children("h2").text(result);
        $("title").text("The Answer is " + result);
        number = "";
        newnumber = "";


    });



    //MATERIAL DESIGN CLICK EFFECT
    //***************************
    //http://thecodeplayer.com/walkthrough/ripple-click-effect-google-material-design
    // VERY BUGGY

    var parent, ink, d, x, y;
    $(".button h3").click(function(e){
       parent = $(this).parent();

       //create .ink element if it doesn't exist
       if(parent.find(".ink").length == 0)
          parent.prepend("<span class='ink'></span>");

       ink = parent.find(".ink");

       //incase of quick double clicks stop the previous animation
       ink.removeClass("animate");

       //set size of .ink
       if(!ink.height() && !ink.width())
       {
           //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
           d = Math.max(parent.outerWidth(), parent.outerHeight());
           ink.css({height: d, width: d});
       }

       //get click coordinates
       //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
       x = e.pageX - parent.offset().left - ink.width()/2;
       y = e.pageY - parent.offset().top - ink.height()/2;

       ink.css({top: y+'px', left: x+'px'}).addClass("animate");
    });






});
