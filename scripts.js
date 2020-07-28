window.onload = start;

const plant1 = "<a onClick='plant()'> ___________</a>";
const pot = "\n[___________]\n |         |\n |         |\n |         |\n |_________|";
var data = null;
var maturityLevel=-1;
var maturity=0;
var planted = false;
function start(){
    $("#plant").html(plant1+pot);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        data = JSON.parse(xmlhttp.responseText);
        load();

        if(planted){
            changePlant(maturityLevel);
            updateStats();
            tick();
            console.log("Loaded plant from save start ticking");
        }
    };
    xmlhttp.open("GET","plantsData.json",true);
    xmlhttp.send();


}
function autosave(){
    save();
    setTimeout(autosave, 60*1000);
}
function load(){
    planted =  (window.localStorage.getItem("planted") == 'true');
    maturity = parseInt(window.localStorage.getItem("maturity"));
    maturityLevel = parseInt(window.localStorage.getItem("maturityLevel"));
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
function save(){
    window.localStorage.setItem("maturityLevel", maturityLevel);
    window.localStorage.setItem("maturity", maturity);
    window.localStorage.setItem("planted", planted);
}
function harvest(){
    $("#plant").html(plant1+pot);
    maturity=0;
    maturityLevel=-1;
    planted = false;
    save();
}
function tick(){
    console.log("tick: m:"+maturity);
    maturity++;
    updateStats();
    var level = Math.floor(maturity / (100/data.grow.length));
    if(level > maturityLevel && level < data.grow.length){
        maturityLevel = level;
        changePlant(maturityLevel);
    }
    if(level = data.grow.length){
        return;
    }
    setTimeout(tick, Math.random()*2*1000);
}
function updateStats(){
    $("#stats").html("Maturity: "+maturity+" %");
}