export type StoreItem = {
    name: string,
    id: string,
    price: number,
    image: string
}

const storeItems: StoreItem[] = [
    {
        name: "PRO",
        id:   "51",
        price:	600,
        image: "https://i.imgur.com/m5GUzOZ.png",
    },
    {
        name: "Śmieszek",
        id:   "52",
        price:	600,
        image: "https://i.imgur.com/TAQiksT.png",
    },
    {
        name: "Programista",
        id:   "53",
        price:	600,
        image: "https://i.imgur.com/Nc9SeJy.png",
    },
    {
        name: "Movement",
        id:   "54",
        price:	600,
        image: "https://i.imgur.com/JMzec9O.png",
    },
    {
        name: "Bocik",
        id:   "55",
        price:	600,
        image: "https://i.imgur.com/lNLio2M.png",
    },
    {
        name: "Hazardzista",
        id:   "56",
        price:	600,
        image: "https://i.imgur.com/8KUwPzk.png",
    },
    {
        name: "Agent",
        id:   "57",
        price:	600,
        image: "https://i.imgur.com/vKYbTHr.png",
    },
    {
        name: "Toxic",
        id:   "58",
        price:	600,
        image: "https://i.imgur.com/2xuPS7B.png",
    },
    {
        name: "Octodad",
        id:	"t4",
        price: 5000,
        image: "https://i.imgur.com/myL5oY6.png",
    },
    {
        name: "Viper",
        id:	"ct4",
        price: 2000,
        image: "https://i.imgur.com/RIbUUMR.png",
    },
    {
        name: "Santa",
        id:	"ct5",
        price: 2000,
        image: "https://i.imgur.com/zm3XaSD.png",
    },
    {
        name: "Zero Two",
        id:	"ct6",
        price: 2000,
        image: "https://i.imgur.com/teT31Yt.png",
    },
    {
        name: "Voyager",
        id:	"ct7",
        price: 2000,
        image: "https://i.imgur.com/VaeCvb9.png",
    },
    {
        name: "Snowman",
        id:	"t5",
        price: 2000,
        image: "https://i.imgur.com/3WXQSY3.png",
    },
    {
        name: "Trump",
        id:	"ct8",
        price: 5000,
        image: "https://i.imgur.com/HJOl3JE.png",
    },
    {
        name: "Batman",
        id:	"t6",
        price: 5000,
        image: "https://i.imgur.com/eyNxPZL.png",
    },
    {
        name: "Hitman",
        id:	"ct9",
        price: 2000,
        image: "https://i.imgur.com/3JdxvER.png",
    },
    {
        name: "Ezio",
        id:	"t7",
        price: 2000,
        image: "https://i.imgur.com/ZxPYKjE.png",
    },
    {
        name: "Goku",
        id:	"t8",
        price: 2000,
        image: "https://i.imgur.com/RVB63Wd.png",
    },
    {
        name: "Vegeta",
        id:	"t9",
        price: 2000,
        image: "https://i.imgur.com/CBAuHpb.png",
    },
    {
        name: "Cuddle",
        id:	"ct10",
        price: 5000,
        image: "https://i.imgur.com/sPlUPEQ.png",
    },
    {
        name: "Naostrzony Fragment Wulkanu",
        id:   "kn1",
        price: 500,
        image: "https://i.imgur.com/PqcyWzA.png",
    },
    {
        name: "Banan",
        id:   "kn2",
        price: 500,
        image: "https://i.imgur.com/an4uM2t.png",
    },
    {
        name: "Goteor Frost",
        id:   "k3",
        price: 500,
        image: "https://i.imgur.com/AmG0wvF.png",
    },
    {
        name: "Diamentowa Siekiera",
        id:   "kn4",
        price: 500,
        image: "https://i.imgur.com/1uUCTq8.png",
    },
    {
        name: "Diamentowa Motyka",
        id:   "kn5",
        price: 500,
        image: "https://i.imgur.com/9n7eR05.png",
    },		
    {
        name: "Diamentowy Kilof",
        id:   "kn6",
        price: 500,
        image: "https://i.imgur.com/78ZNqKZ.png",
    },		
    {
        name: "Diamentowy Miecz",
        id:   "kn7",
        price: 500,
        image: "https://i.imgur.com/m0zgwZl.png",
    },		
    {
        name: "Diamentowa Łopata",
        id:   "kn8",
        price: 500,
        image: "https://i.imgur.com/vGOiyRc.png",
    },
    {
        name:  "Auto Bunnyhop",
        id:    "sp1",
        price: 100000,
        image: "https://i1.wp.com/gameplatform.pl/wp-content/uploads/2016/07/bunny-hop.jpg?fit=800%2C713",
    },
    {
        name: "Dr. Disrespect",
        id:	"t10",
        price: 2000,
        image: "https://i.imgur.com/Xobl6L4.png",
    },
    {
        name: "Dingodile",
        id:	"t11",
        price: 2000,
        image: "https://i.imgur.com/i2h7Vk6.png",
    },	
    {
        name: "Prinz eugen",
        id:	"t12",
        price: 2000,
        image: "https://i.imgur.com/zy5OHBp.png",
    },
    {
        name: "Tifa",
        id:	"ct11",
        price: 2000,
        image: "https://i.imgur.com/uFh09xz.png",
    },	
];

export const getItemById = ( id: string ): StoreItem =>
    storeItems.find(( item: StoreItem ) => item.id === id);

export default storeItems