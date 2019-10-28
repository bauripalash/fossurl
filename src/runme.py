import re
import uuid

JSONBOX_WEBSITE = "https://jsonbox.io/"

endpoint_source = '''var endpoint = "%s";function fetchJSON(a){var e=new XMLHttpRequest;e.open("GET",a,false);e.send(null);return e.responseText}var hashh=window.location.hash.substr(1);if(window.location.hash!=""){var res=JSON.parse(fetchJSON(endpoint+"/"+hashh));var data=res.result;if(data!=null){window.location.href=data}}
'''

info_yml = "endpoint: %s \nendpoint_dashboard: %s"

def getEndpoint():
    box_name = str(uuid.uuid4()).replace("-", "_")
    return "fossurl_" + box_name


def main():
    print("=== Welcome to FOSSURL Configuration Wizard! ===")
    endpoint = getEndpoint()
    print("Your JSONBOX Endpoint is : " + JSONBOX_WEBSITE +  endpoint);
    print("Your JSONBOX Dashboard URL is : " + JSONBOX_WEBSITE + "dashboard.html?box=" + endpoint )

    with open("header.js" , "w") as f:
        f.write(endpoint_source %(JSONBOX_WEBSITE +  endpoint))

    with open("DELETE_ME.yml" , "w") as f:
        f.write(info_yml %(JSONBOX_WEBSITE +  endpoint ,JSONBOX_WEBSITE + "dashboard.html?box=" + endpoint ))

main()

