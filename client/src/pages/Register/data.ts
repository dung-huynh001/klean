export interface SuburbType {
    id: number,
    name: string,
    postCode: number,
}

export interface AddressType {
    id: number,
    state: string,
    suburb: SuburbType[]
}

export const address: AddressType[] = [
    {
        id: 1,
        state: "Can Tho",
        suburb: [
            {
                id: 1,
                name: "Ninh Kieu",
                postCode: 6543
            },
            {
                id: 2,
                name: "Cai Rang",
                postCode: 6542
            },
            {
                id: 3,
                name: "Binh Thuy",
                postCode: 6541
            },
            {
                id: 4,
                name: "Phong Dien",
                postCode: 6540
            },
        ]
    },
    {
        id: 2,
        state: "Soc Trang",
        suburb: [
            {
                id: 1,
                name: "Chau Thanh",
                postCode: 8343
            },
            {
                id: 2,
                name: "TP Soc Trang",
                postCode: 8342
            },
            {
                id: 3,
                name: "My Xuyen",
                postCode: 8341
            },
        ]
    },
    {
        id: 3,
        state: "Hau Giang",
        suburb: [
            {
                id: 1,
                name: "TX Nga Bay",
                postCode: 9543
            },
            {
                id: 2,
                name: "Chau Thanh",
                postCode: 9542
            },
            {
                id: 3,
                name: "Phung Hiep",
                postCode: 9541
            },
            {
                id: 4,
                name: "Cai Tac",
                postCode: 9540
            },
        ]
    },
    {
        id: 4,
        state: "Bac Lieu",
        suburb: [
            {
                id: 1,
                name: "Hong Dan",
                postCode: 9443
            },
            {
                id: 2,
                name: "Phuoc Long",
                postCode: 9442
            },
            {
                id: 3,
                name: "Hoa Binh",
                postCode: 9441
            },
            {
                id: 4,
                name: "TP Bac Lieu",
                postCode: 9440
            },
        ]
    },
]