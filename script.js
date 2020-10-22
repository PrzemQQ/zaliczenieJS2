var css = document.querySelector("h3");
var kolor1 = document.querySelector(".kolor1");
var kolor2 = document.querySelector(".kolor2");
var body = document.getElementById("gradient");

function kolorek() {
  body.style.background = "linear-gradient(to right, "
  + kolor1.value
  + ","
  + kolor2.value
  +")";
  css.textContent = body.style.background + ";";
}
kolor1.addEventListener("input", kolorek);
kolor2.addEventListener("input", kolorek);
function wyglad() {
  setTimeout(function(){ $(".calosc").css("display","block"); }, 750);
}
function zegar() {
var data = new Date();
var godzina = data.getHours();
var min = data.getMinutes();
var sek = data.getSeconds();
 var terazjest = ""+godzina+
((min<10)?":0":":")+min+
((sek<10)?":0":":")+sek;
document.getElementById("zegarek").innerHTML = terazjest;
setTimeout("zegar()", 1000); }
zegar();

var tlo = document.querySelector("body");
var text1 =document.querySelector("h1");
var text2 = document.querySelector("h2");
function nruno() {
  $("h4").css("font-size", "5vw");
  $("h1").css("display", "none");
  $("h1").css("text-align", "left");
  $("h1").css("font-family", "'Indie Flower', cursive");
  $("h1").css("opacity", "1");
  $("h1").css("text-transform", "lowercase");
  body.style.background = "linear-gradient(to right, red, black)";
  $("h2").css("font-size", "4vw");
  $("h2").css("font-family", "'Srisakdi', cursive;");
  $("h2").css("color", "green");
  $("button").css("color", "black");
  $("button").css("background-color", "white");
  $("h4").css("display", "FLEX");
    $("h4").css("text-transform", "uppercase");
    $("#lay1").css("display", "block");
    $("h4").css("float", "left");
    $("#lay1").css("float", "left");
    $("#lay1").css("width", "20%");
        $("h4").css("display", "flex");
        $("button").css("both", "clear");
          $("#zegarek").css("font-size", "8vw");
          $("#zegarek").css("color", "magenta");
          $("h2").css("display", "block");
          $("h3").css("display", "block");
          $("#zegarek").css("display", "block");
          $("button").css("opacity", "1");
            $("#lay2").css("display", "none");
            $("h5").css("display", "none");
              $("input").css("display", "inline");

}
function nrduo() {
  body.style.background = "url(xd.jpg)";
$("h1").css("display", "none");
$("h2").css("display", "none");
$("h3").css("display", "none");
$("input").css("display", "none");
$("#zegarek").css("display", "none");
$("button").css("color", "white");
  $("button").css("background-color", "black");
    $("button").css("opacity", "0.2");
        $("h4").css("display", "none");
        $("#lay1").css("display", "none");
        $("#lay2").css("display", "block");
        $("p.xd").css("display", "block");
        $("h5").css("display", "block");
}
function  nrtres() {
    $("h5").css("display", "none");
    $("p.xd").css("display", "none");
      $("#lay2").css("display", "none");
      $("#lay1").css("display", "none");
      $("h4").css("display", "none");
      $("button").css("opacity", "1");
      $("#zegarek").css("display", "block");
      $("input").css("display", "inline");
      $("h1").css("display", "block");
      $("h2").css("display", "block");
      $("h3").css("display", "block");
      body.style.background ="linear-gradient(to right, #bc0707, #f9f513)";
      $("#zegarek").css("color", "white");
      $("#zegarek").css("font-size", "3vw");
      $("h2").css("font-size", "4vw");
      $("h2").css("font-family", "'Caveat', cursive");
      $("h2").css("color", "black");

      $("h1").css("text-align", "center");
      $("h1").css("font-family", "'Francois One', sans-serif");
      $("h1").css("opacity", "0.7");
      $("h1").css("text-transform", "uppercase");
}
