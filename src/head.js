var endpoint = "<HEY,PUT ENDPOINT HERE>";
function fetchJSON(a){var e=new XMLHttpRequest;e.open("GET",a,false);e.send(null);return e.responseText}var hashh=window.location.hash.substr(1);if(window.location.hash!=""){var res=JSON.parse(fetchJSON(endpoint+"/"+hashh));var data=res.result;if(data!=null){window.location.href=data}}
