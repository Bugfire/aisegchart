aisegchart
==========

# Description:
  Panasonic MKN700 のWeb画面からデータを取得し、グラフを生成します。

# Requirements:
* MKN700
* node.js / npm forever (proxy.js as proxy server for MKN700)
* Webserver for index.html (存在しないなら、node.jsで返すのが自然だと思います)
* Webbrowser 

# Installation:
Makefileを参考に

    TARGET=__TARGET_DIR__
    
    AISEG_HOST=__AISEG_IP_OR_HOST__
    AISEG_PASS=__AISEG_PASSWORD__
    PROXY_HOST=__PROXY_IP_OR_HOST__
    PROXY_PORT=__PROXY_PORT__

を設定してください。
