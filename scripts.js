window.onload = start;

const plant1 = "<a onClick='plant()'> ___________</a>";
const pot = "\n[___________]\n |         |\n |         |\n |         |\n |_________|";
var data = null;
var maturityLevel=0;
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
            console.log("Loaded plant from save start ticking");
        }
    };
    xmlhttp.open("GET","plantsData.json",true);
    xmlhttp.send();
    tick();

}
function showLoadedData(){
    console.log("Mat:"+maturity+"\nMatLvl:"+maturityLevel+"\nPlanted:"+planted);
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
}
function changePlant(growNum){
    console.log("changing plant to "+growNum);
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
    maturityLevel=0;
    planted = false;
    save();
}
function tick(){
    if(planted){
        console.log("tick");
        mature();
        updateStats();
        var level = Math.floor(maturity / (100/data.grow.length-1));
        if(level > maturityLevel && level < data.grow.length){
            maturityLevel = level;
            changePlant(maturityLevel);
        }
        if(level >= data.grow.length && maturity >= 100){
            return;
        }
        setTimeout(tick, Math.random()*2*1000);
    }
    
}
function mature(){
    maturity++;
    if(maturity >= 100){
        maturity = 100;
    }
}
function updateStats(){
    $("#stats").html("Maturity: "+clamp(0,100,maturity)+" %");
}
function clamp(min,max,value){
    return Math.max(min,Math.min(max,value))
}
function reset(){
    window.localStorage.setItem("maturityLevel", 0);
    window.localStorage.setItem("maturity", 0);
    window.localStorage.setItem("planted", false);
}