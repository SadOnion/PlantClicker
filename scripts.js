window.onload = start;

var plant1 = "<a onClick='changePlant()'> ___________</a>";
var plant2 = " ____...____";
var pot = "\n[___________]\n |         |\n |         |\n |         |\n |_________|";
var xd = false;
var data = null;
function start(){
    $("#plant").html(plant1+pot);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.status == 0){
        alert(JSON.parse(xmlhttp.responseText));
  }
};
xmlhttp.open("GET","plantsData.json",true);
xmlhttp.send();
    

}
function changePlant(){
        $("#plant").html(plant2+pot);
       alert(data);
}
