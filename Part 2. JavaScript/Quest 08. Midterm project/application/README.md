## POS 어플리케이션

### 클래스 목록

1. [POS](#POS)
2. [MenuBoard](#MenuBoard)
3. [Product](#Product)
4. [Cart](#Cart)
5. [Calculator](#Calculator)
6. [Bill](#Bill)
7. [Payment](#Payment)
8. [Alert](#Alert)
9. [Data](#Data)
10. [Template](#Template)

### 클래스 역할

#### POS

어플리케이션에 필요한 객체를 생성한다.  
아래의 "정보 교환" 메소드를 갖는다.

    1. MenuBoard에서 선택한 Product를 Cart로
    2. Cart에 담긴 정보를 Bill로
    3. Calculator에서 계산한 값을 Bill로

결제 기능은 없기 때문에 계산해야할 금액과 지불한 금액이 같다면 `결제`를 한 것으로 생각한다.  
`결제 완료 (현금 수납함의 개폐, 카드 승인 등)`를 알 수 없기 때문에 2초 간 결제 완료 모달을 띄운 뒤 없앤다.

#### MenuBoard

POS에서 메뉴판의 역할을 갖는다.  
Product를 메뉴판에 생성한다.  
각각의 메뉴에 Click 이벤트를 부여한다.

#### Product

상품 객체이다.  
상품명과 가격을 상태로 갖는다.

#### Cart

POS 객체로부터 전달받은 Menu를 토대로 Cart에 하나의 Row로 추가한다.  
각각의 상품명을 Key로, Product 객체를 Value로 갖는 `product{}` 상태를 갖는다.  
추가된 Row의 Element를 담고 있는 `rowElements[]` 상태를 갖는다.

#### Calculator

계산기 객체이다.  
각각의 계산기 패드에 Click 이벤트를 부여한다.  
[입력] 패드를 누르면 결제를 진행하는 것으로 간주한다.

#### Bill

결제 정보 옵션을 `options`라는 상태로 갖는다.  
결제 정보들`(amount, total, discount[고려X], toPay, paid, change)`을 상태로 갖는다.  
Cart에 새로운 Product 객체가 들어올 때마다 결제 정보를 갱신한다.  
갱신 과정에서 지불해야 할 금액과 지불한 금액이 갖다면 POS의 `결제 완료` 메소드를 실행한다.

#### Payment

현금, 카드, 취소 3개의 상태를 나타낸다.  
카드를 선택할 경우, 기타 기능 없이 일시불로 전액 결제하는 것으로 간주한다.  
따라서 기본 상태는 항상 현금을 유지하며, 계산기에 값을 입력하는 것으로 현금 결제를 진행한다.

#### Alert

결제 완료를 알리는 모달창의 역할을 한다.  
2초 뒤에 사라진다.

#### Data

메뉴판에 들어갈 Product의 정보를 갖고 있다.  
POS 기기에서 결제 완료 후, 해당 결제 내역을 저장시키는 객체이다.

#### Template

HTML 파일에 있는 여러 개의 `<template>`을 가리킨다.  
해당 객체의 메소드를 사용해 반복되는 template 생성 함수를 대체한다.
