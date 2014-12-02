#

TARGET=__TARGET_DIR__

AISEG_HOST=__AISEG_IP_OR_HOST__
AISEG_PASS=__AISEG_PASSWORD__
PROXY_HOST=__PROXY_IP_OR_HOST__
PROXY_PORT=__PROXY_PORT__

PROXY_HEAD=http://$(PROXY_HOST):$(PROXY_PORT)

install: $(TARGET)/ccchart.js $(TARGET)/proxy.js $(TARGET)/index.html

clean:
	rm -f $(TARGET)/ccchart.js $(TARGET)/proxy.js $(TARGET)/index.html

$(TARGET)/ccchart.js:
	curl http://ccchart.com/js/ccchart.js > ccchart.js
	patch -p0 < ccchart.js.diff
	cp ccchart.js $@

$(TARGET)/proxy.js:
	sed -e 's&AISEG_HOST&$(AISEG_HOST)&g' -e 's&AISEG_PASS&$(AISEG_PASS)&g' -e 's&PROXY_PORT&$(PROXY_PORT)&' < proxy.js > $@

$(TARGET)/index.html:
	cp index.html $@
