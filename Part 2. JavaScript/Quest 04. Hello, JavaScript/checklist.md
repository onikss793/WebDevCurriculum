## Checklist

-   자바스크립트는 버전별로 어떻게 변화하고 발전해 왔을까요?

    -   자바스크립트의 버전들을 가리키는 ES5, ES6, ES2016, ES2017 등은 무엇을 이야기할까요?
        -   자바스크립트는 상표권은 썬마이크로시스템즈(현 오라클)에서 갖고 있으며, 언어 구현은 넷스케이프(현 모질라)에서 했다.
        -   넷스케이프는 언어의 표준화를 위해 ECMA(European Computer Manufacturer's Association)에 언어 규격을 제출했는데, 상표권 문제로 ECMAscript라고 정했다. _ES 시리즈는 ECMAscript의 줄임말이다._
        -   ES3는 1999년부터 꽤 오랜 시간동안 거의 표준처럼 브라우저에서 작동했다. ES4가 개발되기는 했지만 여러가지 논쟁을 낳고 결국 사용되지 못했다. 그리고 2009년 ES5가 출시되었다. 이후 ES6가 출시되었지만 이름은 출시년도인 ES2015이었다. 그 뒤로 `ES20**`시리즈가 이어지고 있다.
        -   ES3의 주요한 특징들: 호이스팅, 함수 단위의 스코프, 모듈화 미지원, 클로져, try/catch, 정규식 표현식 등...
        -   ES5의 주요한 특징들: `strict mode`, `JSON parsing/serialization support`, 배열 메서드(map, forEach...), 객체 메서드(defineProperties, isExtensible, keys, freeze...)
        -   ES6(ES2015)의 주요한 특징들: 기본 매개 변수, 템플릿 리터럴, 멀티 라인 문자열(백틱), 비구조화 할당, 화살표 함, 프로미스, let & const 등...
        -   ES2016의 주요한 특징들: Array.includes(), 제곱 연산자
        -   ES2017의 주요한 특징들: async function
        -   ES2018의 주요한 특징들: rest & spread(...), Promise에 finally 추, for await 구문,

-   웹 브라우저의 자바스크립트 콘솔은 어떻게 사용할까요?

    -   웹 브라우저(Chrome)에서 자바스크립트 콘솔을 띄우는 단축키는 무엇인가요?
        -   Mac 기준으로 `cmd + opt + j`를 사용하면 콘솔을 띄울 수 있다.

-   `let`를 이용하여 변수를 선언하는 것과 `const`를 이용하여 변수를 선언하는 것은 어떻게 다를까요?

    -   `var`를 이용하여 선언하는 방법은 어떻게 다를까요?
        -   자바스크립트는 변수를 사용하기 전에 선언을 해야 한다. ES2015의 등장 이전까지 `var`를 이용해 변수를 선언했다.
        -   `var`를 사용할 경우 기본적으로 전역 변수로서의 선언을 의미한다. 그러나 `functional scope`를 가지기 때문에 만약 함수 매개변수로서 선언할 경우, 해당 함수 내에서만 유효한 범위를 가진다.
        -   `var`를 사용할 경우, `hoisting`이 일어나게 된다. `hoisting`이란 변수 선언이 해당 함수, 혹은 전역의 맨 상단으로 끌어올려진다는 것을 의미한다.
            -   _별첨: Garbage Collection: 자바스크립트 인터프리터가 메모기 관리를 위해 자동으로 수행하는 것. 프로그램이 더 이상 객체를 참조하지 않을 때, 인터프리터는 자동으로 메모리에서 그 객체를 해제한다._
    -   `let, const`는 우선 `functional scope가 아닌 block scope`이다. 따라서 `{}`로 감싸져 있는(예를 들어 `if, for`) 구문을 유효 범위로 가진다. 두번째로 이들은 hoisting이 되지 않는다.
    -   `let`은 값을 할당한 뒤, 재할당이 가능하다. 하지만 `const`는 재할당을 할 수 없다.

-   자바스크립트의 익명 함수는 무엇인가요?
    -   자바스크립트의 Arrow function은 무엇일까요?
        -   자바스크립트에서 함수를 생성할 때 몇 가지 방법을 쓸 수 있다. 먼저 함수 선언문은 `function test() {}`, 함수의 이름이 있고 컴파일 시점에 함수 정보를 등록한다(호이스팅). 그래서 함수를 선언하기 전에 함수를 사용할 수 있다.
        -   함수 선언문에 이어서 함수 표현식이 있다. 여기에는 함수의 이름을 지정할 수도(기명), 아니면 이름을 지정하지 않을 수도 있다(익명).
        -   익명 함수의 경우, 이름이 없기 때문에 재사용할 수도, 함수의 생성 이전에 사용될 수도 없다.
        -   익명 함수를 사용하는 방법 중 하나가 바로 `Arrow function` 이다.
        -   일반적으로 자바스크립트에서 함수의 this는 실행 컨텍스트 상에서 호출자를 가리킨다. 하지만 `Arrow function`의 this는 다르다.
        -   Arrow function 의 경우, this에 바인딩할 객체가 정적으로 결정된다. Arrow function의 this는 언제나 상위 스코프의 this를 기리킨다.

```js
function twinkle() {
    const line = parseInt(prompt("Choose line number for stars"));
    let result = "";

    for (let i = 1; i < line * 2; i += 2) {
        for (let j = 1; j < (line * 2 - i) / 2; j++) {
            result += " ";
        }

        for (let k = 1; k <= i; k++) {
            result += "*";
        }

        for (let l = 1; l < (line * 2 - i) / 2; l++) {
            result += " ";
        }

        result += "\n";
    }

    console.log(result);
}
```
