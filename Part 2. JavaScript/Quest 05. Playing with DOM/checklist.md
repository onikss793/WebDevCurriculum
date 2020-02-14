## Checklist

* 자바스크립트를 통해 DOM 객체에 CSS Class를 주거나 없애려면 어떻게 해야 하나요?
  - DOM은 Document Object Model의 줄임말이다. Docment Object란 무엇일까. Document도 Window 객체의 속성으로 문서를 말한다. 여기서 문서란 예를 들면, HTML 문서와 같은 것이다. DOM은 문서의 구조화된 표현을 제공하며 프로그래밍 언어로 DOM 구조에 접근해서 문서의 여러가지를 변경할 수 있도록 해준다. DOM은 트리 구조로 되어있기 때문에 각 노드에 접근할 수 있다. 
  - DOM을 이용하면 자바스크립트를 이용해 해당 HTML 문서에 접근해서 CSS를 주거나 없애는 것이 가능하다. 
  - DOM 객체의 특정 노드에 id, class, tag 등을 이용해 접근할 수 있다. 해당 노드의 style 역시 객체이기 때문에 바꾸고 싶은 style의 property의 값을 변경한다. 만약 새로운 class를 추가하거나 제거하고 싶다면 해당 노드의 class 혹은 classList property에 추가하거나 제거하면 된다. 

  * IE9나 그 이전의 옛날 브라우저들에서는 어떻게 해야 하나요?
    - 마이크로소프트가 IE3와 JScript를 출시하면서 처음으로 "DOM 레벨 0"이라는 것이 등장한다(Browser Object Model이라고 한다). 이것 역시 트리 구조의 객체로 API를 통해 활용할 수 있다. 하지만 HTML 문서를 수정하는 데에 있어서는 제한적인 기능만을 제공했다. 
    - 내비게이터 4.0과 IE4가 출시되면서 DHTML(동적 HTML) 기능 지원이 추가되었다. 기존의 "DOM 레벨 0"에서 제한적이었던 Document 객체의 확장이 이루어졌다. 하지만 DHTML DOM은 브라우저 개발사들이 각각 개발했기 때문에 호환성의 문제가 있었다. 
    - ECMAScript의 표준화 이후, DOM의 표준화 작업도 이루어졌고, "DOM 레벨 1"이라는 이름의 표준화된 DOM 사양이 등장했다. 

* 자바스크립트의 변수가 유효한 범위는 어떻게 결정되나요?

## Scope?

스코프란 말 그대로 기준 위치에서 접근할 수 있는 변수들의 범위를 말한다.

## 전역 스코프

만약 변수가 어떠한 함수 안에도 있지 않고, `{}` 안에도 있지 않을 경우 전역 스코프에 정의된다. 
전역 스코프라는 말 그대로 모든 곳에서 사용 가능한 변수가 된다. 

```js
const greet = "Hello, Luke"

function sayHello() {
  console.log(greet);
};

console.log(greet); // "Hello, Luke"
sayHello(); // "Hello, Luke"

모든 곳에서 사용이 가능함으로 함수 내에서도 당연히 사용 가능하다. 
```

## 지역 스코프

1. 함수 스코프
만약 변수가 함수 내부에서 선언되어진다면 그 변수는 해당 함수 내에서만 사용할 수 있다. 

```js
function sayHello() {
  const greet = "Hello, Luke";
  console.log(greet);
};

console.log(greet) // "Reference Error!"
sayHello() // "Hello, Luke";

greet이라는 변수는 sayHello라는 함수 안에서 선언되었기 때문에 해당 함수의 밖에서는 참조할 수 없다. 
```

2. 블록 스코프
블록 스코프는 {} 내부에서 "`const` 혹은 `let`을 사용해 변수를 선언할 경우(`var`은 제외) 그 변수는 중괄호의 블록 내부에서만 사용이 가능하다. 

```js
{
  const greet = "Hello, Luke"
  console.log(greet) // "Hello, Luke"
}

console.log(greet); // "Reference Error!"

{} 내부에서 선언되어진 greet를 {}의 밖에서는 참조할 수 없다. 
```

## Scope Chain

```js
const value = "value1";

function printValue() {
  return value;
}

function printFunc(func) {
  const value = "value2";
  console.log(func());
}

printFunc(printValue);
```
위의 함수를 처음 봤을 때 조금 헷갈렸다. `printFunc(printValue)`를 호출할 때, `printFunc` 내부에서 `value`를 정의했기 때문에 결과값으로 `"value2"`가 나올 것이라 생각했다. 

하지만 각 함수 객체가 처음 생성될 때의 실행 컨텍스트가 무엇인지를 생각해야 정확한 결과값을 알 수 있다. `printValue` 라는 함수 객체가 처음 생성될 때, 전역 객체의 `value`를 참조한다. 따라서 해당 함수가 실행될 때(실행 컨텍스트 상에서), 스코프 체이닝이 발생한다. 

## Closure

클로저는 독립적인 변수를 가리키는 함수이다. 또는, 클로저 안에 정의된 함수는 만들어진 환경을 기억한다._(ft. MDN)_

### 은닉화

`Prototype`을 사용하면 객체를 다양한 방법으로 다룰 수 있다. 하지만 이때 Private Variable에 대한 접근 권한이라는 문제가 발생할 여지가 있다. 

```js
function hello(name) {
  const _name = name;
  return function() {
    console.log("hello" + _name);
  }
}
```
위와 같은 방식이라면 외부에서 `_name`에 접근할 수 있는 방법은 없기 때문에 Closure의 특성을 이용해서 은닉화도 쉽게 구현할 수 있다. 

### 반복문

```js
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
```
위의 코드를 실행시킨다면 무슨 결과가 나오게 될까?

정답은 `0 ~ 9` 까지의 정수가 아닌 10개의 `10`이다. 
setTimeout의 콜백 함수는 비동기로 수행된다. 따라서 for-loop이 모두 끝나고난 뒤 10이 되어버린 `i`를 10번 출력하게 되는 것이다. 

이 경우에도 클로저를 활용하면 `0 ~ 9`까지의 정수를 출력시킬 수 있다. 

```js
for (let i = 0; i < 10; i++) {
  (function(j) {
  	setTimeout(function() {
      console.log(j);
    }, 100);
  })(i);
}
```
위와 같은 방식으로 즉시 실행 함수(IIFE)를 이용해서 setTimeout의 콜백 함수를 가두고, 인자로 `j`를 넘겨주게 되면 for-loop이 한번 실행될 때마다 IIFE를 실행하게 되면서 안의 콜백 함수에 인자로 `i`를 넘겨줄 수 있게 된다. 

  * `var`과 `let`으로 변수를 정의하는 방법들은 어떻게 다르게 동작하나요?
    - `var`
      * `var`는 functional scope를 기조로 동작한다. 따라서 변수는 기본적으로 전역에 선언되며 특정 function 안에서 선언되었다면 그 변수의 유효 범위는 해당 function 안으로 국한된다. 
      * `var`는 Hoisting 된다. 즉, 어떠한 변수를 `var`를 이용해서 선언한 경우, 그 선언문이 코드의 최상단으로 올려진다(hoist)는 것을 의미한다. 
    - `let`
      * `var`와 다르게 block scope를 기조로 동작한다. 따라서 변수를 선언할 때 해당 변수의 유효 범위는 `{}` 안이 될 것이다. 
      * `var`와 같이 변수의 재할당이 가능하다. 하지만 **재선언**은 불가능하다. 
      * `let`도 block-scope 단위로 Hoisting이 되긴 한다. 하지만 선언하기 이전에 할당을 할 경우, TDZ(Temporal Dead Zone)에 의해 Reference Error가 난다. __TDZ는 변수의 선언 전에 변수에 접근하는 것을 급지한다.__
