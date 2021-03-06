class Data {
    constructor() {
        this.createMenu();
        this.history = [];
    }

    createMenu() {
        this.menu = [
            { name: "에스프레소", price: 3000 },
            { name: "아메리카노", price: 3000 },
            { name: "더치커피", price: 3500 },
            { name: "카페라떼", price: 3500 },
            { name: "카푸치노", price: 3500 },
            { name: "카페 비엔나", price: 3800 },
            { name: "카페 깔루아", price: 5000 },
            { name: "모카치노", price: 3800 },
            { name: "모카라떼", price: 3800 },
            { name: "소이라떼", price: 3800 },
            { name: "바닐라 라떼", price: 3800 },
            { name: "카라멜 라떼", price: 3800 },
            { name: "카라멜 마끼야또", price: 3800 },
            { name: "핸드드립커피", price: 6000 },
            { name: "아포가토", price: 4500 },
            { name: "리얼 초코", price: 4500 }
        ];
    }

    sendDiscountData() {
        const discount = [
            {
                products: ["아메리카노", "카페라떼"],
                target: {
                    아포가토: 1000
                }
            },
            {
                products: ["핸드드립커피"],
                target: {
                    에스프레소: 3000
                }
            }
        ];

        this.discountInfo = discount;

        return this.discountInfo;
    }

    save(data) {
        this.history.push({ timestamp: Date(), ...data });
        console.log(this.history);
    }
}
