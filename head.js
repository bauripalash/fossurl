var endpoint = "https://www.jsonstore.io/79a85a647a95f875559fd3683f975e61b120279d8dcfd0e7e73e764979b3332e"; //production
// var endpoint = "https://www.jsonstore.io/555c7f37bd06ffbffa45384535655a49ff6d320dc9f3966f54e5e1e3a09f0b27"; //for experiments on development

function fetchJSON(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}
var hashh = window.location.hash.substr(1);
if (window.location.hash != "") {
    // console.log("START")
    var res = JSON.parse(fetchJSON(endpoint + '/' + hashh));
    var data = res.result;
    // console.log(data)
    if (data != null) {
        window.location.href = data;
    }

}