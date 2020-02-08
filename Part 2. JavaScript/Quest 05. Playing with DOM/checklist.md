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
  * `var`과 `let`으로 변수를 정의하는 방법들은 어떻게 다르게 동작하나요?
    - `var`
      * `var`는 functional scope를 기조로 동작한다. 따라서 변수는 기본적으로 전역에 선언되며 특정 function 안에서 선언되었다면 그 변수의 유효 범위는 해당 function 안으로 국한된다. 
      * `var`는 Hoisting 된다. 즉, 어떠한 변수를 `var`를 이용해서 선언한 경우, 그 선언문이 코드의 최상단으로 올려진다(hoist)는 것을 의미한다. 
    - `let`
      * `var`와 다르게 block scope를 기조로 동작한다. 따라서 변수를 선언할 때 해당 변수의 유효 범위는 `{}` 안이 될 것이다. 
      * `var`와 같이 변수의 재할당이 가능하다. 하지만 **재선언**은 불가능하다. 
      * `let`도 block-scope 단위로 Hoisting이 되긴 한다. 하지만 선언하기 이전에 할당을 할 경우, TDZ(Temporal Dead Zone)에 의해 Reference Error가 난다. __TDZ는 변수의 선언 전에 변수에 접근하는 것을 급지한다.__
