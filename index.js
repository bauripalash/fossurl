// var endpoint = "https://www.jsonstore.io/79a85a647a95f875559fd3683f975e61b120279d8dcfd0e7e73e764979b3332e"; //production
var endpoint = "https://www.jsonstore.io/555c7f37bd06ffbffa45384535655a49ff6d320dc9f3966f54e5e1e3a09f0b27"; //for experiments on development

var hashh = window.location.hash.substr(1);
if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];

        if (data != null) {
            window.location.href = data;
        }

    });
}

$("#sbtn").click(shorturl);

function hideerror(){
    document.getElementById("erbox").innerHTML = "";
}

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function genhash(){
    // var cinput = document.getElementById("custominput");
    // if( cinput.value ){
        
    //     if(check_custom_unique(cinput.value)){
    //         window.location.hash = cinput.value;
    //     }
        
    // }else{
    window.location.hash = getrandom();
    check_is_unique();
    // }
}

// function check_custom_unique(cu){
//     // url = window.location.hash.substr(1);
//     console.log('Cu URL CHECK ' + cu);
//     $.getJSON(endpoint + "/" + cu, function (data) {
//         data = data["result"];

//         if (data != null) {
//             console.log("Already Used Custom Address");
//             document.getElementById("custominput").value = "";

//             document.getElementById("erbox").innerHTML = "Custom Already Used, Choose Another";
//             return false;
            
//         }

//     });
    

// }

function check_is_unique(){
    url = window.location.hash.substr(1);
    console.log('URL CHECK ' + url);
    $.getJSON(endpoint + "/" + url, function (data) {
        data = data["result"];

        if (data != null) {
            genhash();
            console.log("Already Used Address");
        }

    });

}

function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
});
simplecopy(window.location.href);
}

function shorturl(){
    var longurl = geturl();
    genhash();
    send_request(longurl);
}
