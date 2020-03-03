## Quest

-   tracert(Windows가 아닌 경우 traceroute) 명령을 통해 www.google.com 까지 가는 경로를 찾아 보세요.

    -   어떤 IP주소들이 있나요?
    -   그 IP주소들은 어디에 위치해 있나요?

```
1  10.140.160.1 (10.140.160.1)  2.249 ms  5.297 ms  1.776 ms
사설 IP 주소...

2 210.206.68.65 (210.206.68.65) 5.056 ms 6.337 ms 4.208 ms
LG U+ 용산구

3 10.19.14.61 (10.19.14.61) 5.931 ms 11.883 ms 6.337 ms
사설...

4 1.213.11.21 (1.213.11.21) 2.955 ms
1.208.11.13 (1.208.11.13) 26.159 ms
1.213.11.21 (1.213.11.21) 4.397 ms
LG U+ 용산구

5 1.208.8.57 (1.208.8.57) 2.817 ms
1.208.8.173 (1.208.8.173) 6.514 ms
1.213.8.173 (1.213.8.173) 4.145 ms
LG U+ 용산구

6 * * *

7 1.213.152.153 (1.213.152.153) 9.495 ms 3.210 ms
1.213.152.169 (1.213.152.169) 4.115 ms
LG U+ 용산구

8 210.120.105.117 (210.120.105.117) 6.278 ms
203.233.117.81 (203.233.117.81) 4.453 ms
1.208.175.113 (1.208.175.113) 31.666 ms
LG U+ 용산구

9 1.208.105.62 (1.208.105.62) 50.926 ms
1.213.148.126 (1.213.148.126) 50.476 ms
1.208.144.106 (1.208.144.106) 61.135 ms
LG U+ 용산구

10 1.208.150.182 (1.208.150.182) 64.817 ms
1.208.148.206 (1.208.148.206) 62.581 ms
1.208.106.106 (1.208.106.106) 48.340 ms
LG U+ 용산구

11 74.125.118.154 (74.125.118.154) 44.731 ms
72.14.215.29 (72.14.215.29) 49.711 ms
74.125.118.154 (74.125.118.154) 41.073 ms
Google LLC

12 108.170.241.1 (108.170.241.1) 51.067 ms \* \*
Google LLC

13 108.170.241.97 (108.170.241.97) 53.663 ms
216.239.42.89 (216.239.42.89) 49.999 ms
209.85.254.177 (209.85.254.177) 51.775 ms
Google LLC

14 216.239.42.89 (216.239.42.89) 57.747 ms
108.170.241.79 (108.170.241.79) 46.741 ms
hkg07s30-in-f4.1e100.net (216.58.200.68) 68.147 ms
Google LLC
```

-   Wireshark를 통해 www.google.com 으로 요청을 날렸을 떄 어떤 TCP 패킷이 오가는지 확인해 보세요

    -   TCP 패킷을 주고받는 과정은 어떻게 되나요?
    -   각각의 패킷에 어떤 정보들이 담겨 있나요?

    1.  우선 3-way handshake 과정을 거친다.

            1. Client: [SYN]      Seq=0
            2. Server: [SYN, ACK] Seq=0 Ack=1
            3. Client: [ACK]      Seq=1 Ack=1


    2.  Client: HTTP GET / HTTP/1.1

            서버로 HTTP 요청을 보낸다.

    3.  Server: [ACK] Seq=1 Ack=136

            서버는 HTTP 요청을 받고 나서 알겠다는 응답을 보낸다.

    4.  Server: [ACK] Seq=1 Ack=136

            서버는 전송을 시작한다.

            패킷이 클 경우, 이를 단편화하여 보내는데 ACK=136은 패킷을 단편화한 것이다.

            [TCP Segment Len: 1418] TCP 세그먼트의 크기이다.

            현재 Sequence Number: 1 에 TCP 세그먼트의 크기를 더한 1419가 [Next sequence number]가 된다.

            Acknowledge number: 136은 지속적으로 136 패킷을 받고 있다는 것을 의미한다.

    5.  Server: [ACK] Seq=1419 Ack=136

            136 패킷을 계속해서 전송한다.

    6.  Client: [ACK] Seq=136 Ack=2837

            클라이언트는 서버에게 136 패킷의 2837까지의 자료를 잘 받았다는 응답을 보낸다.

            이를 통해 신뢰성, 안정성을 보장한다.

    7.  Server: HTTP/1.1 200 OK (text/html)

            서버는 클라이언트에게 다보냈다는 OK 사인을 보낸다.

            [TCP Segment Len]       : 528
            Sequence number         : 5673
            [Next sequence number]  : 6201
            [Acknowledgment number] : 136

    8.  Client: [TCP Window Update] [ACK] Seq=136 Ack=6201

            버퍼가 얼마나 남았는지, 많은지 적은지를 보내주고 남은 크기에 따라 서버가 보내는 속도를 조절한다.

            이를 통해 Flow Control을 한다.

            [Calculated window size: 131072] => 이것이 0이 되면 보내는 것을 중단한다.

            남은 패킷을 위해 잠깐 기다린다.

    9.  Client: [FIN, ACK] Seq=136 Ack=6201

            클라이언트는 서버에게 연결 종료를 알린다.

    10. Server: [FIN, ACK] Seq=6201 ACK=137

            서버도 클라이언트에게 종료에 대해 알겠다는 사인을 보낸다.

            이렇게 종료를 마무리 하는 것을 "우아한 종료"라고 한다.

-   telnet 명령을 통해 http://www.google.com/ URL에 HTTP 요청을 날려 보세요.

    -   어떤 헤더들이 있나요?
    -   그 헤더들은 어떤 역할을 하나요?

    ```
    요청

    Accept: */*
    Accept-Encoding: gzip, deflate
    Connection: keep-alive
    Host: www.google.com
    User-Agent: HTTPie/2.0.0
    ```

    ```
    응답

    HTTP/1.1 200 OK
    Cache-Control: private, max-age=0
    Content-Encoding: gzip
    Content-Length: 5493
    Content-Type: text/html; charset=ISO-8859-1
    Date: Mon, 02 Mar 2020 08:41:59 GMT
    Expires: -1
    P3P: CP="This is not a P3P policy! See g.co/p3phelp for more info."
    Server: gws
    Set-Cookie: 1P_JAR=2020-03-02-08; expires=Wed, 01-Apr-2020 08:41:59 GMT; path=/; domain=.google.com; Secure
    Set-Cookie: NID=199=W1zT6NPGsOfPIEdftRA13Zj-W8TqzNHymIsF_EzaZV1EA7NJqTmGOMOehyhwZDRk-_g1PDGnq7etKuOUagbyxaqtOisYpkQ53x4HWWOmXZjaQBVmhO5XXJC4vmWFVpKueULm3IemnqEH81KHZ3peR_5WntuW0XiDjSvmsxNVjgI; expires=Tue, 01-Sep-2020 08:41:59 GMT; path=/; domain=.google.com; HttpOnly
    X-Frame-Options: SAMEORIGIN
    X-XSS-Protection: 0
    ```

#### HTTP 헤더 내 일반 헤더(General Header) 항목

요청 및 응답에서 모두 사용 가능한 일반 목적의 헤더

    Date            : HTTP 메시지 생성 일시

    Connection      : 클라이언트와 서버 간의 연결에 대한 옵션 (ex: Connection: close, Connection: Keep-Alive)

    Cache-Control   : 쿠키/캐시 관련

#### HTTP 엔티티 헤더

요청 및 응답에서 모두 사용 가능한 Entity(콘텐츠, 본문, 리소스 등)에 대한 설명 헤더 항목

구체적인 미디어 타입 등의 설명이 들어간다.

    Content-Type            : 해당 개체에 포함되는 미디어 타입 정보 (ex: Content-Type: text/html; charset=ISO-8859-1)

    Content-Language        : 해당 개체와 가장 잘 어울리는 사용자 언어

    Content-Encoding        : 해당 개체 데이터의 압축 방식 (ex: Content-Encoding: gzip, deflate)

    Content-Length          : 해당 개체의 바이트 크기

    Content-Location        : 해당 개체의 실제 위치

    Content-Disposition     : 응답 body를 브라우저가 어떻게 표시해야하는지 알려준다.
                              만약 서버가 파일을 전송하고 이를 다운로드시키길 원할 경우,
                              Content-Disposition: attachment; filename='filename.csv' 이런식으로 해줄 수 있다.

    Content-Security-Policy : 다른 외부 파일들을 불러오는 경우, 차단할 소스와 불러올 소스를 명시한다.
                              Content-Security-Policy: default-src https:   -> https를 통해서만 파일을 가져온다.
                              Content-Security-Policy: default-src 'self'   -> 자신의 도메인의 파일들만 가져온다.

    Location                : Resource가 Redirect된 때에 이동된 주소, 혹은 새로 생성된 Resource 주소를 명시한다.

#### HTTP 요청 헤더

HTTP 요청에서만 사용되며 가장 방대하다.

    Host                : HTTP/1.1 이후부터는 필수 항목이다.
                          도메인명 및 호스트명 모두를 포함한 전체 URI 지정이 필요하다.

    User-Agent          : 클라이언트 소프트웨어 명칭 및 버전 정보

    From                : 클라이언트 사용자 메일 주소

    Cookie              : Set-Cookie로 클라이언트에게 설정된 쿠키 정보

    Referer             : 바로 직전에 머물렀던 웹 링크 주소

    If-Modified-Since   : 제시한 일시 이후로만 변경된 리소스를 취득 요청

    Authorization       : 인증 토큰을 서버로 보낼 때 사용하는 헤더

    Origin              : 서버로 POST 요청을 보낼 때, 요청이 어느 주소에서 시작되었는지 나타낸다.
                          만약 요청을 보낸 주소와 받는 주소가 다르면 CORS 에러가 발행한다.

    다음은 Body의 내용 및 속성에 관련한 항목이다.
        Accept            : 클라이언트가 원하는 미디어 타입 및 우선 순위
                              ex) Accept: */*, Accept: image/*, ...

        Accept-Charset    : 클라이언트가 원하는 문자 집합

        Accept-Encoding   : 클라이언트가 원하는 문자 인코딩 방식

        Accept-Language   : 클라이언트가 원하는 가능한 언어

#### HTTP 응답 헤더

HTTP 응답에서 사용되며

    Server                      : 서버 정보

    Set-Cookie                  : 서버에서 클라이언트에게 세션 쿠키 정보를 설정

    Expires                     : 리소스가 지정된 일시까지 유효함을 나타낸다. 즉, 응답 콘텐츠의 만료 시점
                                  Cache-Control과 별개로 쓸 수 있다. 단, max-age가 있는 경우, 무시.
                                  ex) expires: Thu, 26 Jul 2018 07:28:00 GMT

    Age                         : 캐시 응답.
                                  max-age 시간 내에서 얼마나 흘렀는지 초 단위로 알려준다.

    ETag                        : HTTP 콘텐츠가 바뀌었는지 검사할 수 있는 태그

    Allow                       : 해당 엔티티에 대해 서버 측에서 지원 가능한 HTTP 메소드
                                ex) Allow: GET, HEAD

    Access-Control-Allow-Origin : 서버에서 프론트의 주소를 헤더에 담아주어야 CORS 에러가 나지 않는다.
                                  ex) Access-Control-Allow-Origin: *

#### HTTP 캐시/쿠키 관련 헤더

Cache

    Cache-Control
        * no-store        : 아무것도 캐시하지 않는다.
        * no-cache        : 모든 캐시를 쓰기 전에 서버에게 해당 캐시를 써도 되는지 확인한다.
        * must-revalidate : 만료된 캐시만 서버에 확인 받도록 한다.
        * public          : 공유캐시(중개 서버)에 저장해도 된다는 것을 의미한다.
        * private         : 브라우저 같은 특정 사용자 환경에서만 허용한다.
        * max-age         : 캐시 유효기간을 명시한다.

    ETag
        * 같은 주소의 자원이더라도 컨텐츠가 달라졌다면 ETag가 다르다.
        * 이 헤더 값이 변경되었다면 캐시를 지우고 새로 변경된 컨텐츠를 받는다.

    If-None-Match
        * 서버에 ETag가 달라졌는지 검사를 요청한다.
        * ETag가 다를 경우에만 컨텐츠를 새로 받는다.
        * 만약 ETag가 같다면 서버는 304 Not Modified를 응답해서 캐시를 그대로 사용한다.

Cookies

    서버에 의해 Set-Cookie로 클라이언트에게 설정된 쿠키 정보
    ex) Cookie: attribute1=value1; attribute2=value2;

    서버는 이 쿠키 헤더를 파싱해서 사용한다.

    CSRF 공격 같은 것을 막기 위해서 반드시 서버는 쿠키가 제대로 된 상황에서 온 것인지 확인하는 로직이 필요하다.

    Set-Cookie
        * 서버측에서 클라이언트에게 세션 쿠키 정보를 설정할 때 사용하는 항목 (RFC 2965에서 규정)
          ex) Set-Cookie: 속성이름(attribute)=속성값(value); 옵션들 형태로 다수 정보들이 설정됨

    Options
        * Expires: 쿠키 만료 날짜 설정
        * Max-Age: 쿠키 수명 설정. Expires는 무시
        * Secure: https에서만 쿠키가 전송된다.
        * HttpOnly: 자바스크립트에서 쿠키에 접근할 수 없다. XSS 요청을 막으려면 활성화해두는 것이 좋다.
        * Domain: 도메인을 적어주면 도메인이 일치하는 요청에서만 쿠키가 전송된다. 가끔 도메인이 다른 쿠키들이 있는데, 이런 쿠키들은 써드 파티 쿠키로 클라이언트를 추적하고 있는 쿠키이다.
        * Path: 해당 path와 일치하는 요청에서만 쿠키가 전송된다.
                ex) Set-Cookie: zerocho=babo; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly

    쿠키는 XSS 공격과 CSRF 공격 등에 취약하기 때문에 HttpOnly 옵션을 켜두고, 쿠키를 사용하는 요청은 서버 단에서 검증하는 로직을 마련해두는 것이 좋다.
