aisegchart
==========

# Description:
  Panasonic MKN700 のWeb画面からデータを取得し、グラフを生成します。

# Requirements:
* MKN700
* node.js / npm forever (proxy.js as proxy server for MKN700)
* Webbrowser 

# Installation:
Makefile の以下の部分を変更してください。

    TARGET=__TARGET_DIR__
    
    AISEG_HOST=__AISEG_IP_OR_HOST__
    AISEG_PASS=__AISEG_PASSWORD__
    WEBSERVER_PORT=__WEBSERVER_PORT__

を設定してください。
