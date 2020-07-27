window.onload = start;

var plant1 = "<a onClick='tick()'> ___________</a>";
var pot = "\n[___________]\n |         |\n |         |\n |         |\n |_________|";
var data = null;
var maturityLevel=0;
var maturity=0;
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
        $("#plant").html(data.grow[maturityLevel]+pot);
}
function tick(){
   
    maturity++;
    var level = maturity / 20;
    if(level > maturityLevel){
        maturityLevel = level;
        changePlant(maturityLevel);
    }
    setTimeout(tick, Math.random()*2*1000);
}
