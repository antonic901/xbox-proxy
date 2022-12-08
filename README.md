# Xbox Proxy
Have you ever tried to create some plugin or script for XBMC4Xbox that needs to communicate with some API and you were getting some TLS crap error? Well I did, and I lost two days to figure out what is happening behind scene. XBMC4Xbox comes with Python 2.7.11 with OpenSSL 0.9.8zg which only supports TLS1.0/1.1 which are considered unsecure by many modern APIs. Fix for this would be either to create Python module inside C/C++ that will be using build-in libCurl or to build Python with OpenSSL 1.0.1+. But because this is not an easy task we will be using this proxy to bypass this error until someone manages to port newer OpenSSL to Xbox.

## How this works
It's simple. Xbox sends some request to proxy, proxy passes that to the API. Then API returns response to proxy and proxy passed that to Xbox. Nothing special is happening here.

## How to use this
If you are developer, clone this repo, open your terminal and type npm start. Proxy will start on some IP Address in your home LAN network. Here are commands:
```console
git clone https://github.com/antonic901/xbox-proxy.git
cd xbox-proxy
npm install
npm start
```

**All my plugins and scripts will be using this proxy which I will be hosting to the public. End users of my plugins and scripts wont need to deal with this setting up proxy. They will just install plugins/scripts on Xbox and use them out-of-the-box.**
