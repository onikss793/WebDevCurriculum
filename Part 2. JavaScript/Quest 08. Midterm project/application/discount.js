class Discount {
    constructor() {
        this.info = [];
    }

    setDiscountPolicy(data) {
        this.info = [...data];
    }

    checkDiscount = productData => {
        // check if cart has any discount product
    };
}

// 아메리카노 1잔 + 라떼 1잔 => 아포가토 1천원 할인
// 드립 커피 1잔           => 에스프레소 공짜(3천원 할인)
