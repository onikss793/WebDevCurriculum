## Checklist
* 더 좋은 코드를 만들려면 어떻게 해야 할까요?

좋은 코드에 대한 재미있는 농담이 있다.

`The Only Valid Measurement of Code Quality: WTFs / Minute`

우스게 소리이지만 한편 일리 있다고도 생각한다. 좋은 코드란 읽기 쉽고, 재사용 가능하며, 리팩토링 가능하도록 작성하는 것이라고 생각한다. 

[클린코드 참조](https://github.com/qkraudghgh/clean-code-javascript-ko/blob/master/README.md?utm_source=gaerae.com&utm_campaign=%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%8A%A4%EB%9F%BD%EB%8B%A4&utm_medium=social)
**변수**  
가능하면 의도가 명확하고, 검색 가능하도록 변수명 짓기

**함수**  
가능하면 너무 많은 3개 이상의 인자는 피하기

1개의 함수는 1개의 기능만 하기

함수명은 직관적으로 짓기

중복된 코드 피하기

Object.assign을 사용하기

매개변수로 플래그 사용하지 않기

사이드 이펙트 피하기

명령형 프로그래밍이 아닌, 함수형 프로그래밍 지향하기

조건문 캡슐화 하기

죽은 코드 지우기

**클래스**  
메소드 체이닝 활용하기

상속보다는 조합을 사용하기

SOLID 원칙 지키기
