#!/usr/bin/python
#==========
# http_request_headers.py
#==========

import os
import cgi
import cgitb
import locale
import Cookie

locale.setlocale(locale.LC_ALL,'en_US.utf8')

c = Cookie.SimpleCookie()
c['chrishardick']='Hello World!'
c['chrishardick']['secure']=True


print c
print "Content-Type: text/html"
print "Cache-Cotrol: no-cache"
print ""

cgitb.enable()

print "<html>"
print "<head>"
print "</head>"
print "<p>"

for headername, headervalue in os.environ.iteritems():
    print "NAME=|%s| VALUE=|%s|<br>" % (headername, headervalue)

print "</p>"

print "</html>"

