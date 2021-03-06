## Topics

-   Cookie
-   Session
-   Chrome developer tools > 'Resources' tab

## Checklist

-   쿠키란 무엇일까요?
    -   쿠키는 어떤 식으로 동작하나요?
    -   쿠키는 어떤 식으로 서버와 클라이언트 사이에 정보를 주고받나요?
-   웹 어플리케이션의 세션이란 무엇일까요?
    -   세션의 내용은 어디에, 어떤 식으로 저장되나요?

## Cookie란

"쿠키"라는 용어는 웹 브라우저 프로그래머인 루 몬툴리가 만들어냈다. 이것은 UNIX 프로그래머들이 사용했던 것으로, 프로그램이 데이터 수신 후 변경하지 않은 채로 반환하는 데이터의 패킷을 의미하는 `매직 쿠키`라는 용어에서 비롯되었다.

이러한 이름의 기원에서 알 수 있듯이 쿠키는 하이퍼 텍스트의 기록서의 일종으로 웹사이트로부터 전송된 사용자의 브라우저를 이용해 사용자의 컴퓨터에 설치되는 작은 기록 정보 파일을 말한다.

`Http 쿠키`, `웹 쿠키`, `브라우저 쿠키`와 같은 이름이 있는데 모두 이와 같은 기록 정보 파일을 말한다. 이런 사용자의 기록 정보 파일은 사용자가 같은 웹사이트를 방문할 때마다 읽히고 수시로 새로운 정보로 바뀌게 되는데 이를 활용해서 서버, 웹사이트가 브라우저의 신속성을 구축할 수 있다.

쿠키를 이용하여 특정 웹사이트에서의 사용자의 상태 정보를 저장하거나(예를 들어 온라인 쇼핑에서 쇼핑 카트에 담기), 혹은 사용자의 브라우징 기록(예를 들어 어떠한 버튼을 눌렀는지, 로그인을 했는지, 과거에 어떠한 페이지를 방문했는지 등)을 저장하는데 사용될 수도 있다.

쿠키는 소프트웨어가 아니기 때문에 컴퓨터 내애서 프로그램처럼 실행될 수 없고, 바이러스를 옮길 수도, 악성 코드를 심을 수도 없다. 그러나 `스파이웨어`를 통해 사용자의 브라우징 행동을 추적하는데 사용될 수도 있고, 만약 다른 이의 쿠키를 훔치게 되면 해당 사용자의 웹 계정 접근 권한을 획득할 수도 있는 취약점을 가지고 있다.

주요한 키워드는 다음과 같다.

1.  Session Cookie

    `in-memory cookie`라고도 알려져 있는 세션 쿠키는 사용자가 웹사이트를 사용하고 있을 때만 일시적으로 존재하는 메모리이다. 보통 사용자가 브라우저를 닫게 되면 세션 쿠키는 지워진다. 다른 쿠키들과는 다르게 쿠키 자체에 지정되어 있는 `expiration date`가 없고, 브라우저가 자동적으로 관리한다.

2.  Persistent Cookie

    세션 쿠키가 웹브랄우저가 종료되는 시점에 자동으로 만료되는 것과 다르게 `Persistent Cookie`는 특정한 시간이 흐르면 만료된다. 따라서 쿠키가 살아있는한 언제나 해당 데이터를 웹사이트 서버에 전송할 수 있다.

    그래서 `Tracking Cookies`라고도 불리우는 그 이유는 광고 회사에서 사용자의 브라우저 기록과 습관들을 일정 부분 기록하고 추적할 수 있기 때문이다. 또한 로그인 상태를 유지하는 것에 사용되기도 한다.

3.  Secure Cookie

    `Secure Cookie`는 `https`와 같은 암호화된 통신에서만 사용 가능하다. 그렇기 때문에 `http`와 같은 암호화되지 않은 연결에서는 사용할 수 없고, 쿠키의 데이터를 훔쳐보는 것을 어느 정도 예방할 수 있다. 쿠키에 `Secure` 플래그를 추가하는 것을 설정할 수 있다.

4.  Http-only Cookie

    `Http-Only` 쿠키는 클라이언트의 자바스크립트 API로도 읽어낼 수 없다. 이를 통해 `Cross-Site Scripting(XSS)` 와 같은 쿠키를 강탈해가는 것의 위협을 줄일 수 있다. 그러나 여전히 `Cross-Site Tracing(XST)`나 `Cross-Site Request Fregery(XSRF)`와 같은 공격으로부터 취약하다. 쿠키에 `HttpOnly` 플래그를 추가하는 것을 설정할 수 있다.

5.  Same Site Cookie

    2016년에 구글 크롬 버전 51에서 새로 공개된 쿠키이다. Same-Site cookie는 타겟 도메인으로 같은 origin을 갖고 있는 request만이 사용할 수 있다.

6.  Third Party Cookie

    보통 쿠키의 도메인 속성은 웹 브라우저의 주소창의 도메인과 같을 것이다. 이것을 `First-Party Cookie`라고 부른다. 하지만 `Third-Party Cookie`는 주소창에 보여지는 것과는 다른 도메인에 속한다. 배너 광고와 같은 외부의 다른 사이트에서 어떠한 기능, 콘텐츠를 지원할 때 사용된다. 이러한 쿠키를 사용해서 사용자가 자주 방문하는 사이트를 조회할 수도 있고, 비슷한 광고들을 제공하는 것에도 사용될 수 있다.

7.  Super Cookie

    `Super Cookie`는 `top-level`의 도메인 (예를 들어 .com)이나 공적인 suffix(예를 들어 .co.kr)과 같은 origin 으로부터의 쿠키이다. 보통의 쿠키들이 구체적인 도메인 이름을 갖는 것과는 상반된다.

### Cookie 사용법

쿠키는 주로 아래의 3가지를 목적으로 사용된다.

1. Session Management
2. Personalization
3. Tracking

쿠키로 세션을 관리하는 방법은 대략적으로 다음과 같다.

사용자가 웹사이트의 로그인 페이지에 방문하면 웹 서버는 클라이언트에게 고유한 일종의 session identifier를 쿠키로 전달한다. 사용자가 로그인에 성공하면 서버는 해당 session identifier의 권한을 승인하고 접근을 허용한다.

세션 쿠키는 고유한 session identifier를 갖고 있기 때문에 쿠키에 저장되는 정보의 양이 정해져 있어서 이를 토대로 사용자의 정보를 무한히 활용할 수 있다.

그렇다면 실질적으로 쿠키는 어떻게 사용할까.

쿠키는 string으로 이루어져있는 key-value 쌍의 값이다. (4kb를 넘길 수 없다)

클라이언트가 서버에 정보를 요청하면 서버는 저장하고 싶은 key-value를 쿠키로 만들어 header에 담아 보낸다.

`Set-Cookie: <cookie-key>: <cookie-value>`

클라이언트는 서버로 전송하는 모든 요청에 현재 브라우저에 있는 쿠키를 header에 담아 보낸다.

`Cookie: <cookie-key>: <cookie-value>`

이와 같은 쿠키는 Session Cookie를 말한다. 즉, 브라우저가 종료되는 시점에 모든 쿠키가 소멸된다. 만약 브라우저가 종료되어도 유지시키고 싶다면 Persistent Cookie를 사용하면 된다.

`Set-Cookie: yummy_cookie=choco; Expires=Wed, 21 Oct 2020 07:28:00 GMT;`

위에서 Expires는 쿠키가 만료될 날짜를 말하고, 만약 Max-age가 있다면 그것은 현재 시간을 기준으로 얼마나 오래 유지시킬 것인가를 나타낸다.

위에서 언급했었던 키워드 중에 쿠키의 보안을 위해서 추가할 수 있는 것들이 있었다.

Secure: HTTPS 프로토콜 상에서 암호화된 요청일 경우에만 전송된다.  
HttpOnly: Cross-site 스크립팅 공격을 방지한다. JavaScript의 document.cookie API에 접근할 수 없다.  
Domain, Path: 쿠키의 스코프를 정의한다.

아래와 같은 방식으로 적용시킬 수 있다.

`Set-Cookie: yummy_cokie=choco; secure; httpOnly;`

### Session

만약 사용자가 로그인을 한 뒤에 해당 웹사이트에서 이곳저곳을 탐색한다고 가정해보자. 해당 웹사이트에서 특정 권한이 있어야만 접근할 수 있는 페이지가 많을 경우, 위에서처럼 쿠키를 이용해서 사용자의 데이터를 서버와 클라이언트가 주고 받아 권한을 체크할 수 있을 것이다. 하지만 그렇게될 경우, 쿠키가 유출, 조작될 수 있는 심각한 보안 위기에 놓이게 된다. 따라서 HTTP 통신에 사용자의 데이터를 직접 담아 사용하는 것은 매우 위험하다.

Session은 비밀번호와 같은 인증 정보를 쿠키에 저장하지 않고 대신에 사용자의 식별자인 JSESSIONID(session id)를 저장한다. 서버에는 인증 정보와 더불어 이 ID에 해당하는 로그인 상태, 마지막 로그인 시간, 닉네임, 만료기한 등의 정보를 저장한다. 보안상 서버는 사용자의 개인 컴퓨터보다는 훨씬 안전하기 때문에 인증에 Session을 이용한다.

Session의 대략적인 동작 순서는 아래와 같다.

1. 클라이언트가 서버에 Request를 보낸다.
2. 서버에서는 session id 쿠키가 없다는 것을 확인하고 새로 발급해서 Response를 보낸다.
3. 이후 클라이언트는 전달받은 session id를, 서버에 Request 보낼 때마다 headers에 넣어 보낸다.
4. 서버는 해당 sessino id를 확인하여 사용자를 식별한다.
5. 클라이언트가 로그인을 요청하면 서버는 session을 로그인한 사용자 정보로 갱신하고 새로운 session id를 발급하여 Response를 보낸다. (그리고 해당 session id와 대응하는 로그인 상태, 마지막 로그인 시간, 닉네임, 만료기한 등을 함께 저장한다)
6. 이후 클라이언트는 로그인 사용자의 session id를 전달하고, 서버에서는 해당 session id를 통해 사용자를 식별한다.
7. 브라우저가 종료되면 session id를 제거하고 서버에서도 세션을 제거한다.

Session은 브라우저로 단위로 저장되기 때문에 브라우저가 종료되면 소멸된다.

Session은 위의 절차에서도 확인할 수 있듯이 로그인한 사용자에 대한 특별한 식별이 아니다. 따라서 로그아웃하면 새로운 사용자로 인식해서 새로운 세션이 생성된다.

Session을 사용하게 되면 사용자의 로그인 여부, 닉네임 등 자주 필요한 정보들을 세션에 따로 담아두면 요청을 주고 받을 때마다 데이터베이스에 접근할 필요가 없어서 효율적이다.

그러나 여전히 중간에서 탈취, 변조의 가능성이 있기 때문에 httpOnly를 적극 활용하는 것이 좋다.

### JWT

Session을 사용하게 되면 나타날 수 있는 부작용 중 하나는, 동시에 접속하는 사용자 수가 많아질 수 록 서버의 메모리에 과부하가 걸린다는 점이다. 이러한 단점을 해소하기 위해 모던 웹 어플리케이션에서는 JWT를 많이 사용한다.

JWT는 Json Web Token의 약자로 토큰 기반 인증 시스템에서 활용되는 웹표준의 JSON 객체이다. JWT는 그 자체로 필요한 정보를 모두 갖고 있다. 웹서버의 경우 대부분 HTTP의 헤더에 넣어서 전달되거나, URL의 파라미터로 전달된다.

JWT는 .을 기준으로 총 세 가지의 문자열로 구성되어 있다. header.payload.signature 이런 형태로 구성되어 있다.

1.  Header

    Header는 두 가지의 정보를 갖고 있다. 먼저 typ은 토큰의 타입을 말한다. JWT의 경우 jwt가 될 것이다. 그리고 alg가 있다. alg는 해싱에 사용할 알고리즘을 말한다. 대부분 SHA-256 해싱 함수를 사용한다.

2.  Payload

    Payload에는 토큰에 담을 정보가 담겨있다. 이 정보들은 name/value의 쌍으로 이루어져있고 한 쌍을 Claim 클레임이라고 부른다. 클레임에는 총 3가지가 있다. Registered Claim 등록된 클레임 / Publick Claim 공개 클레임 / Private 비공개 클레임.

    등록된 클레임

    ```
    필요한 정보들이 아닌, 토큰에 대한 선택적인 정보들을 말한다.
    iss: 토큰 발급자
    sub: 토큰 제목
    aud: 토큰 대상자
    exp: 토큰의 만료기간(형식은 NumericDate)
    nbf: 토큰의 활성 날짜(형식은 NumericDate)
    iat: 발급된 시간
    jti: 고유 식별자(일회용 토큰에 주로 사용)
    ```

    공개 클레임

    ```
    충돌이 방지된 이름을 갖는다.
    주로 URI 형식으로 짓는다.
    ```

    비공개 클레임

    ```json
    클라이언트 <--> 서버 사이에 사용되는 클레임 이름이다.
    충돌을 주의해야 한다.
    {
    	"iss": "mysite.com",
    	"exp": "1485270000000",
    	"https://mysite.com/is_admin": true,
    	"userId": "1234",
    	"username": "onikss793"
    }
    ```

3.  Signature
    Header의 인코딩된 값과 Payload의 인코딩된 값을 함친 후, 정해둔 비밀키로 해시하여 만든다.

이와 같은 JWT를 사용하면 Session에서 처럼 서버가 클라이언트의 상태에 대해 연결성을 유지하지 않아도 된다. (stateless)

앞서 말했던 바와 같이 서버, 혹은 세션 데이터를 저장하고 있는 데이터베이스에 과부하를 줄 가능성이 있을 뿐만 아니라, scale out을 하기에도 힘들어진다. 왜냐하면 세션을 사용하면서 분산 시스템을 설계하는 것이 상당히 까다롭기 때문이다.

JWT 토큰을 사용한 인증 방식은 대략적으로 다음과 같다.

1. 유저가 아이디와 비밀번호로 로그인을 한다.
2. 서버에서 해당 제출된 아이디와 비밀번호를 검증한 뒤, 위의 JWT의 생김새에서 확인했던 바와 같이 payload에 id와 같은 구별 번호를 주고 고유의 signature를 동봉하여 클라이언트에게 응답한다.
3. 클라이언트는 서버로부터 받은 토큰을 저장해두고, 이후 서버에 요청을 보낼 때 이 토큰을 headers에 실어 함께 보낸다.

-   ##### Web Storage

        HTML5을 지원하는 브라우저에서는 Web Storage라는 자바스크립트 API를 제공한다. 이를 사용하면 local storage, session storage를 이용할 수 있다.

        Local Storage는 Persistent Cookie와 비슷한 기능을 수행하고, Session Storage는 Session Cookie와 비슷한 기능을 수행한다. 다만, Session Storage는 그 생명 주기가 브라우저가 아닌 탭이 종속되어 있다.

        기본적으로 두 가지의 웹 스토리지 모두 쿠키보다 큰 용량을 지원한다. 브라우저마다 차이가 있기는 하지만 대략 5MB ~ 10MB를 지원한다. 또한 key, value 형태의 JSON 객체이기 때문에 자바스크립트로 조작하기에 매우 간편하다.
