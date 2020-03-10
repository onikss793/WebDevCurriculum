## Topics

-   GET/POST
-   node.js `http` module

*   `req`와 `res` 객체

## Checklist

-   HTTP의 GET과 POST 메소드는 어떻게 다른가요?

    -   다른 HTTP 메소드에는 무엇이 있나요?

-   HTTP 서버에 GET과 POST를 통해 데이터를 보내려면 어떻게 해야 하나요?
    -   HTTP 요청의 `Content-Type` 헤더는 무엇인가요?
    -   Postman에서 POST 요청을 보내는 여러 가지 방법(`form-data`, `x-www-form-urlencoded`, `raw`, `binary`) 각각은 어떤 용도를 가지고 있나요?

## Node.js "http" module

node.js에서 HTTP를 사용하기 위해서는 http 모듈을 사용해야 한다. 해당 모듈은 기존에 사용하기 까다롭고 어려웠던 http에 관한 프로토콜들을(예를 들어, 큰 스트림 데이터, chunk-encoded-data) 손쉽게 사용할 수 있도록 여러 기능을 지원한다.

-   ### http의 기본 생김새는 이러하다

    Properties

    -   http.METHODS
    -   http.STATUS_CODES
    -   http.globalAgent

    Methods

    -   http.createServer()
    -   http.request() \* http.get()

    Classes

    -   http.Agent
    -   http.ClientRequest
    -   http.Server
    -   http.ServerResponse \* http.IncomingMessage

-   ### http.ClientRequest

    http.request(), http.get()가 호출될 때 반환되는 객체이다.

    이 겍체는 큐에 들어가 현재 진행 중인 요청을 나타낸다. 헤더는 `setHeader(name, value)`, `getHeader(name)`, `removeHeader(name)`API를 이용해서 변경이 가능하다. 실제 헤더는 첫번째 data-chunk, 혹은`request.end()`가 호출될 때 전송된다.

    응답을 받기 위해 `request` 객체에 "listener"를 추가해야 한다. "response"의 headers를 받게 되면 `response` 이벤트가 발생한다. `response` 이벤트는 `http.IncomingMessage`의 인스턴스를 인자로 받아 실행된다.

    `response` 이벤트가 발생되면 `data` 이벤트를 수신하기 위해 "response" 객체에 "listener"를 추가할 수 있다.

    만약 event handler가 추가되지 않았으면 "response"는 버려진다. 하지만 "response"에 event handler가 달리면 "response" 객체로부터의 데이터를 읽을 수 있다. 데이터를 읽어들이지 않는다면 메모리를 지속적으로 소비하게 되어 `process out of memory` 에러가 발생할 수 있다.

    `request` 객체와는 달리 "response"가 불안정하게 종료될 경우, "response" 객체는 "error"를 반환하지 않고 "aborted" 이벤트가 발생된다.

-   ### http.ServerResponse

    이 객체는 HTTP server에 의해 내부적으로 생성된다. `request` 이벤트의 두번째 인자로 전달된다.

## HTTP Mehod

HTTP는 주어진 리소스에 대해 어떠한 행동을 할 것인지를 가리키기 위한 요청 메소드를 갖고 있다.

명사도 있지만 REST에서는 주로 동사로서 HTTP의 액션을 정의하는데 사용된다.

-   ### GET

    우선 GET은 데이터를 읽는데 사용되는 요청이다. 요청을 보낼 때 body가 없으며 만약 성공적으로 응답이 올 경우 body에 데이터가 들어있다. 캐시가 가능하다.

-   ### POST

    POST는 서버로 데이터를 전송할 때 사용된다. body의 타입은 요청의 헤더에 `Content-Type`에 명시되어 있다.

    POST와 PUT의 차이점은 PUT은 멱등성을 가진다는 것이다. 쉽게 말해 연산을 PUT 요청을 여러번 보내더라도 그 결과가 달라지지 않는 다는 의미이다. 그러나 POST의 경우에는 일종의 `Side Effect`가 일어날 수도 있다.

    POST 요청은 기본적으로 HTML form을 통해 전송되고, 서버에서 응답을 받는 구조이다. 이럴 경우 `<form>` 태그의 `enctype`에 따라 content-type이 결정된다.

    `Content-Type`은 여러가지가 있지만 우선 몇 가지만 살펴보면,

    `application/x-www-form-urlencoded` : key, value가 &로 구분되고, =로 나뉘어진 key-value 튜플로 인코딩된다. 만약 문자나 숫자가 아닐 경우, key-value는 모두 [percent-encoding](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding) 된다. 그래서 바이너리 데이터에 해당 타입을 적용하면 안 되는데, 바이너리 데이터의 경우, `multipart/form-data`를 사용해야 한다.

    `multipart/form-data` : 각각의 value는 user-agent에서 정한 경계 기호로 나뉘어진 데이터의 블록으로 전달된다. 해당 키는 `Content-Disposition`에서 지정한다.

-   ### Other HTTP Methods

    -   PATCH: Patch는 해당 리소스에 대한 부분적인 변화를 의미한다.
    -   PUT: PUT은 새로운 리소스를 생성하거나, 기존에 있던 타켓 리소스를 request의 payload로 교체하는 것을 말한다.
    -   DELETE: DELETE은 지정된 리소스를 삭제하는데 사용되는 메소드이다.
    -   CONNECT: CONNECT는 양방향 연결에 사용된다. 이를 이용해서 SSL(HTTPS)에 접속할 때 사용할 수 있다. 예를 들어 클라이언트가 HTTP Proxy 서버로 원하는 목적지로 TCP 터널을 연결해달라는 요청을 보낼 수 있다.
    -   OPTIONS: OPTIONS는 타겟 리소스에 대한 커뮤니케이션 옵션들을 나타낼 때 사용된다.

## Content-Type

Content-Type는 리소스의 미디어 타입이 무엇인지 알려주는 역할을 한다.

`response`에서 Content-Type는 클라이언트에게 응답해주는 콘텐츠의 미디어 타입이 무엇인지 알려준다. 브라우저는 특정 경우에 MIME sniffing을 하고, 반드시 해당 헤더 값을 따르지는 않는다. 만약 이 작동을 막고 싶다면 헤더의 `X-Content-Type-Options` 값에 nosniff로 설정해두면 된다.

`request`(예: POST, PUT)에서는 클라이언트가 서버에게 전송하는 데이터의 타입을 명시해둔다.

Content-Type에 사용되는 주요 MIME은 다음과 같다.

```
text/plain
text/html
image/jpeg
image/png
audio/mpeg
audio/ogg
audio/*
video/mp4
application/octet-stream
```

기본적인 구분은 다음과 같다.

    text: 모든 종류의 텍스트를 포함하는 모든 문서
    image: 모든 종류의 이미지(gif와 같은 애니매이션 이미지는 포함)
    audio: 모든 종류의 오디오 파일
    video: 모든 종류의 비디오 파일
    application: 모든 종류의 이진 파일

Postman에서 요청을 보낼 때, body에 어떠한 데이터를 담아서 전송할 경우 해당 데이터의 타입을 명시해주어야 한다. `form-data`, `x-www-form-urlencoded`, `raw`, `binary`와 같은 것들은 그에 대한 명시이다.

`form-data`는 multipart/form-data를 말한다. `--`를 구분으로 여러 개의 다양한 타입의 데이터를 함께 전송할 수 있다.  
`x-www-form-urlencoded`는 key와 value 형태로 이루어져 &로 구분된 하나의 긴 텍스트 형태이다.  
`raw`는 텍스트의 형태로 작성할 수 있는 모든 형태의 데이터를 말한다. 예를 들어, `json`, `html`, `javascript`, `xml`  
`binary`는 파일을 전송할 때 사용된다.
