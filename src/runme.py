import re
import uuid

JSONHOST_WEBSITE = "https://jsonconnect.com/"

endpoint_source = '''var endpoint="%s";function fetchJSON(a){var f=new XMLHttpRequest;f.open("GET",a,false);f.send(null);return f.responseText}function isURL(a){var f=/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;if(f.test(a)){console.log(f.test(a));return true}else{console.log(f.test(a));return false}}var hashh=window.location.hash.substr(1);if(window.location.hash!=""){var res=JSON.parse(fetchJSON(endpoint+"/?q=s:"+hashh))[0];var data=res["l"];if(data!=null){if(isURL(data)){window.location.href=data}}}
'''

info_yml = "endpoint: %s \nendpoint_dashboard: %s"

def getEndpoint():
    box_name = str(uuid.uuid4()).replace("-", "_")
    return "fossurl_" + box_name


def main():
    print("=== Welcome to FOSSURL Configuration Wizard! ===")
    endpoint = getEndpoint()
    print("Your JSONHOST Endpoint is : " + JSONHOST_WEBSITE +  endpoint);
    print("Your JSONHOST Dashboard URL is : " + JSONHOST_WEBSITE + "dashboard.html?box=" + endpoint )

    with open("head.js" , "w") as f:
        f.write(endpoint_source %(JSONHOST_WEBSITE +  endpoint))

    with open("DELETE_ME.yml" , "w") as f:
        f.write(info_yml %(JSONHOST_WEBSITE +  endpoint ,JSONHOST_WEBSITE + "dashboard.html?box=" + endpoint ))

main()

