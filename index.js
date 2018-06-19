var urldb = "https://www.jsonstore.io/79a85a647a95f875559fd3683f975e61b120279d8dcfd0e7e73e764979b3332e";
// var urllist = "https://www.jsonstore.io/634de8a8aa3d48c3074c5a01ec605368cd11248502306ee7a4916ad67d2222b0";

function genran() {

    if (window.location.hash == "") {
        window.location.hash = Math.random().toString(32).substring(2, 5) + Math.random().toString(36).substring(2, 5);
        // $.getJSON(urllist + "/" + window.location.hash, function(data){
        //     data = data["result"];
        //     if(data!=null){
        //         window.location.hash =Math.random().toString(32).substring(2, 5) + Math.random().toString(36).substring(2, 5);
        //     }

        // });

    }

}

function geturl(){
    var urlb = document.getElementById("urlbox").value;
    var protocol_ok = urlb.startsWith("http://") || urlb.startsWith("https://") || urlb.startsWith("ftp://");
    if(!protocol_ok){
        url = "http://"+urlb;
        return url;
    }else{
        return urlb;
    }
}

$("#sbtn").click(shorten);
// document.getElementById("sbtn").onclick = shorten;
function shorten() {
    fixedurl = geturl();
    genran();
    short_url(fixedurl);
    console.log("shorten");

}

function short_url(url) {
    this.url = url;
    $.ajax({
        'url': urldb + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
    })

    //   $.ajax({
    //     'url': urllist + "/" + "urllist997695",
    //     'type': 'PUT',
    //     'data': JSON.stringify(this.url),
    //     'dataType': 'json',
    //     'contentType': 'application/json; charset=utf-8'
    //   })
    // console.log("short_url");
    simplecopy(window.location.href);
}
var hashh = window.location.hash.substr(1)


if (window.location.hash != "") {
    $.getJSON(urldb + "/" + hashh, function (data) {
        data = data["result"];

        if (data != null) {
            window.location.href = data;
        }

    });
}

