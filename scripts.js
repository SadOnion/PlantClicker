window.onload = start;

var plant1 = "<a onClick='tick()'> ___________</a>";
var pot = "\n[___________]\n |         |\n |         |\n |         |\n |_________|";
var data = null;
var tickNum=0;
function start(){
    $("#plant").html(plant1+pot);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        data = JSON.parse(xmlhttp.responseText);
    };
    xmlhttp.open("GET","plantsData.json",true);
    xmlhttp.send();
}
function changePlant(growNum){
        $("#plant").html(data.grow[growNum]+pot);
}
function tick(){
    changePlant(tickNum);
    tickNum++;
    setTimeout(tick, 5000);
}
