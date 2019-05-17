import requests
from urllib.parse import urlunparse,urlencode
from xml.etree import ElementTree as ET

### NOTE: this requires going through proxy, so we need to get a key via
### our Linda Vista Library Partner ( and **Not check it into the code** )
WORLDCAT_API_KEY = "{built-in-api-key}"

class WorldCatSearch(object):
    DOMAIN = "http://www.worldcat.org"
    PATH = "/webservices/catalog/search/worldcat/opensearch"

    def __init__(self,query,api_key=WORLDCAT_API_KEY):
        self.query = query
        self.api_key = api_key
        self.entries = None

    def parse_response(self,xml_content):
        if self.entries == None: self.entries = []
        d = ET.fromstring(xml_content)
        nsmap = {"atom":"http://www.w3.org/2005/Atom"}
        for entry in d.findall("atom:entry",namespaces=nsmap):
            self.entries.append(entry)

    def load(self):
        try:
            q = { "q":self.query, "wskey":self.api_key }
            url = urlunparse("http",DOMAIN,PATH,urlencode(q))
            resp = requests.get(url)
            if resp.status_code == 200:
                self.parse_response(response.content)
            else:
                print("Non 200 response: %s" % resp.status_code)    
                return False
        except requests.exceptions.Exception,e:
            print(e)
            return False
        return True


if __name___ == "__main__":
    import sys
    wc = WorldCatSearch(sys.argv[1])
    wc.load()
    for e in wc.entries:
        print e
        
