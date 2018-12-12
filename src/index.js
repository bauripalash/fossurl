function fetchJSON(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function pushJSON(url, data) {
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify(data));
    // console.log(request.responseText , request.status);
}

// var hashh = window.location.hash.substr(1);
// if (window.location.hash != "") {
//     // console.log("START")
//     var res = JSON.parse(fetchJSON(endpoint + '/' + hashh));
//     var data = res.result;
//     // console.log(data)
//     if (data != null) {
//         window.location.href = data;
//     }

// }

document.getElementById("sbtn").addEventListener("click", shorturl);


function cinp() {
    document.getElementById("erbox").innerHTML = "";
    var cival = document.getElementById("custominput").value;

    var res = JSON.parse(fetchJSON(endpoint + '/' + cival));
    var data = res.result;


    if (data != null) {
        // console.log("Already Used Custom Address");
        

        return false;

    } else if (data == null) {
        // console.log("Available Custom Address");
        
        return true;

    }


}

function geturl() {
    var url = document.getElementById("urlinput").value;
    return url;

}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function genhash() {
    if (document.getElementById("custominput").value == "") {
        window.location.hash = getrandom();
        check_is_unique();
    } else {
        window.location.hash = document.getElementById("custominput").value;

    }
}

function check_is_unique() {
    url = window.location.hash.substr(1);
    // console.log('URL CHECK ' + url);
    var res = JSON.parse(fetchJSON(endpoint + '/' + url));
    // console.log(res)
    var data = res.result;

    if (data != null) {
        genhash();
        // console.log("Already Used Address");
    }


}

function copyer(containerid) {
    var elt = document.getElementById(containerid);
    if (document.selection) { // IE
        if(elt.nodeName.toLowerCase() === "input"){
            document.getElementById(containerid).select();
            document.execCommand("copy");
        }else{
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select();
            document.execCommand("copy");
        } 

    } else if (window.getSelection) {
        if(elt.nodeName.toLowerCase() === "input"){
            document.getElementById(containerid).select();
            document.execCommand("copy");
        }else{
            var range_ = document.createRange();
            range_.selectNode(document.getElementById(containerid));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range_);
            document.execCommand("copy");
    }
    }
}

function send_request(url) {
    myurl = url;
    var address = endpoint + "/" + window.location.hash.substr(1);
    // console.log(address)
    pushJSON(address, myurl);

    document.getElementById('shortenedURL').value = window.location.href;
    document.getElementById('sucess').innerHTML = "Short URL Copyed to Clipboard!";
    copyer("shortenedURL");
}

function shorturl() {
    var longurl = geturl();
    var re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    var cre = /^([a-zA-Z0-9 _-]+)$/;
    var protocol_ok = re.test(longurl);
    if (!protocol_ok) {
        document.getElementById("erbox").style.color = "red";
        document.getElementById("erbox").innerHTML = "❌ Invalid URL";
    } else {
        document.getElementById("erbox").innerHTML = "";
        if ( document.getElementById("custominput").value == ""){
            genhash();
            send_request(longurl);

        }else{
        if (cre.test(document.getElementById("custominput").value)){
            if (cinp()){
                document.getElementById("erbox").style.color = "cyan";
                document.getElementById("erbox").innerHTML = " Custom Address Available ✔️";
                genhash();
                send_request(longurl);
            }else{
                document.getElementById("erbox").style.color = "red";
                document.getElementById("erbox").innerHTML = "❌ Custom Address Already Used, Choose Another";
                document.getElementById("custominput").placeholder = document.getElementById("custominput").value;
                document.getElementById("custominput").value = "";
            }
        }else{
            document.getElementById("erbox").style.color = "red";
            document.getElementById("erbox").innerHTML = "Invalid Custom URL! Use only Alphanumerics and underscore!";
            document.getElementById("custominput").placeholder = document.getElementById("custominput").value;
            document.getElementById("custominput").value = "";

        }
    }
        
        
    }
}