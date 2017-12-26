#!/usr/bin/python
#==========
# search.py
#==========

import cgi
import cgitb
import locale
import Cookie
import subprocess
import json
import re

locale.setlocale(locale.LC_ALL,'en_US.utf8')

dbg = False

c = Cookie.SimpleCookie()
c['chrishardick']='Hello World!'
c['chrishardick']['secure']=True


print c
print "Content-Type: text/html"
print ""

cgitb.enable()

print '''
<!doctype html>
<html lang="en">

<!-- 
H E A D
-->

<head>

<meta charset="utf-8">

<link rel="stylesheet" type="text/css" href="css/nav.css" media="all">

<script src="js/nav.js"></script>

<script>
window.onload = function() {
    on_load();
}
</script>

<title>Computing Notes</title>

</head>


<!-- 
B O D Y
-->

<body>
<div id="nav" class="nav"></div>
<div id="title" class="title"></div>

<!-- 
C O N T E N T
-->

<div id="content" class="content">

<h1>Search Results</h1>'''

form = cgi.FieldStorage()

#for f in form:
#    print "<p>" + f + ": |" + form[f].value + "|</p>"

if "searchbox" in form:
    srch_dta = form["searchbox"].value

    print "<p>Searching for " + srch_dta + "...</p>"

    phrase_match = re.search (r'^"(.*)"$',srch_dta)

    rtn_dta_json = ""

    or_match = False 

    if phrase_match:

        print "<p>PHRASE RESULTS "
        
        srch_dta_new = phrase_match.group(1)

        rtn_dta_json = subprocess.check_output(["/user2/python/tcp_client.py", "phrase", srch_dta_new])

        if dbg:
            print '<pre>SEARCH.PY: ' + rtn_dta_json + '</pre>'

    else:

        # or
        # a or b

        or_match = re.search (r'(.*?) OR (.*?)',srch_dta)
       
        if or_match:

            print "<p>OR RESULTS "
        
            srch_dta_new = re.sub (r' OR ', ' ',srch_dta)

            rtn_dta_json = subprocess.check_output(["/user2/python/tcp_client.py", "or", srch_dta_new])

            if dbg:
                print 'SEARCH.PY: OR RESULTS (JSON): LEN=' + str(len(rtn_dta_json)) + ' DTA=|' + rtn_dta_json + '|<br><br>'

    if not (phrase_match or or_match):

        print "<p>AND RESULTS "
        
        rtn_dta_json = subprocess.check_output(["/user2/python/tcp_client.py", "and", srch_dta])

        if dbg:
            print 'SEARCH.PY: AND RESULTS (JSON)' + rtn_dta_json + '<br><br>'

    py = {}

    try:
        # JSON to python dictionary/list

        if dbg:
            print 'SEARCH.PY: BEFORE JSON => PY' + rtn_dta_json + '<br>'

        py = json.loads(rtn_dta_json)

        if dbg:
            print 'SEARCH.PY: AFTER JSON => PY' + str(py) + '<br>'

    except:
    
        print "(#=0 *)</p>"     # display * for exception

    else:

        print "(#=" + str(len(py)) + ")</p>"

        print "<dl>"
    
        for l in py:
            print "<dt>" + py[l] + "</dt>"
            print "<dd><a href='" + l + "'>" + l + "</a></dd>"
            print "<br>"
    
        print "</dl>"

else:
    print "NO INPUT SPECIFIED"

print '''
</div>
</body>
</html>'''
