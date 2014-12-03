#

TARGET=__TARGET_DIR__

AISEG_HOST=__AISEG_IP_OR_HOST__
AISEG_PASS=__AISEG_PASSWORD__

WEBSERVER_PORT=__WEBSERVER_PORT__

install: $(TARGET)/ccchart.js $(TARGET)/aisegserv.js $(TARGET)/index.html

clean:
	rm -f $(TARGET)/ccchart.js $(TARGET)/aisegserv.js $(TARGET)/index.html

$(TARGET)/ccchart.js:
	curl http://ccchart.com/js/ccchart.js > ccchart.js
	patch -p0 < ccchart.js.diff
	cp ccchart.js $@

$(TARGET)/aisegserv.js:
	sed -e 's&AISEG_HOST&$(AISEG_HOST)&g' -e 's&AISEG_PASS&$(AISEG_PASS)&g' -e 's&WEBSERVER_PORT&$(WEBSERVER_PORT)&' < aisegserv.js > $@

$(TARGET)/index.html: index.html
	cp index.html $@
