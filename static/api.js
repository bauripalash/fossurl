// var endpoint = "https://www.jsonstore.io/79a85a647a95f875559fd3683f975e61b120279d8dcfd0e7e73e764979b3332e"; //production
var endpoint = "https://www.jsonstore.io/555c7f37bd06ffbffa45384535655a49ff6d320dc9f3966f54e5e1e3a09f0b27"; //for experiments on development

console.log("API LOADED");

var hashh = window.location.hash.substr(1);
if (window.location.hash != "") {
    if (hashh.startsWith("CSL")){
        _shorturl(hashh.substr(4));
    }
}

function check_is_unique(url){
    console.log('URL CHECK ' + url);
    $.getJSON(endpoint + "/" + url, function (data) {
        data = data["result"];

        if (data != null) {
            console.log("Already Used Address");
            return false;
            
        }else{
            return true;
        }

    });

}

function geturl(rawurl){
    var protocol_ok = rawurl.startsWith("http://") || rawurl.startsWith("https://") || rawurl.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+rawurl;
        return newurl;
        }else{
            return rawurl;
        }
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function get_u_random(){
    var rnd = getrandom();
    while (!check_is_unique(rnd)) {
        get_u_random();
        
    }
    return rnd;
}

function _shorturl(rawurl){
    var url = geturl(rawurl);
    var shortcode = get_u_random();
    send_request(url , shortcode);
    re_data(url);
    
}