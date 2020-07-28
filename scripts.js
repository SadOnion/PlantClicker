window.onload = start;

var plant1 = "<a onClick='plant()'> ___________</a>";
var pot = "\n[___________]\n |         |\n |         |\n |         |\n |_________|";
var data = null;
var maturityLevel=-1;
var maturity=0;
var planted = false;
function start(){
    $("#plant").html(plant1+pot);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        data = JSON.parse(xmlhttp.responseText);
    };
    xmlhttp.open("GET","plantsData.json",true);
    xmlhttp.send();
}
function autosave(){
    window.localStorage.setItem("maturityLevel", maturityLevel);
    window.localStorage.setItem("maturity", maturity);
    setTimeout(autosave, 60*1000);
}
function plant(){
    $("#plant").html(data.grow[0]+pot);
    planted = true;
    window.localStorage.setItem("planted", planted);
    tick();
}
function changePlant(growNum){
    if(growNum == data.grow.length){
        $("#plant").html("<a onClick='harvest()'>"+data.grow[maturityLevel]+pot+"</a>");
    }else{

        $("#plant").html(data.grow[maturityLevel]+pot);
    }
}

function harvest(){
    $("#plant").html(plant1+pot);
    window.localStorage.setItem("maturityLevel", 0);
    window.localStorage.setItem("maturity", 0);
    window.localStorage.setItem("planted", false);
    planted = false;
}
function tick(){
    maturity++;
    var level = Math.floor(maturity / (100/data.grow.length));
    if(level > maturityLevel){
        maturityLevel = level;
        changePlant(maturityLevel);
    }
    if(maturity >= 100){
        return;
    }
    setTimeout(tick, Math.random()*10*1000);
}
function updateStats(){
    $("#stats").html("Maturity: "+maturity+" %");
}