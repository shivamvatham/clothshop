<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const products = [
  {
    id: 1,
    name: "Elegant Cotton Kurti",
    price: 1299,
    image: "https://cdn.pixabay.com/photo/2022/01/28/16/34/persian-woman-6975068_1280.jpg",
    category: "kurtis",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Designer Silk Saree", 
    price: 2499,
    image: "https://cdn.pixabay.com/photo/2023/11/10/02/30/woman-8378634_960_720.jpg",
    category: "sarees",
    sizes: ["Free Size"]
  },
  {
    id: 3,
    name: "Floral Maxi Dress",
    price: 1899,
    image: "https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg",
    category: "dresses", 
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 4,
    name: "Embroidered Kurti",
    price: 1599,
    image: "https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284496_1280.jpg",
    category: "kurtis",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 5,
    name: "Traditional Lehenga",
    price: 3999,
    image: "https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_1280.jpg",
    category: "lehengas",
    sizes: ["S", "M", "L"]
  },
  {
    id: 6,
    name: "Casual Cotton Dress",
    price: 999,
    image: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg",
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 7,
    name: "Printed Anarkali Kurti",
    price: 1799,
    image: "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2592247_1280.jpg",
    category: "kurtis",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 8,
    name: "Banarasi Silk Saree",
    price: 4999,
    image: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beautiful-1845103_1280.jpg",
    category: "sarees",
    sizes: ["Free Size"]
  },
  {
    id: 9,
    name: "A-Line Midi Dress",
    price: 1499,
    image: "https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564658_1280.jpg",
    category: "dresses",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 10,
    name: "Block Print Kurti",
    price: 1199,
    image: "https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284497_1280.jpg",
    category: "kurtis",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 11,
    name: "Georgette Saree",
    price: 1999,
    image: "https://cdn.pixabay.com/photo/2017/02/13/11/25/indian-2063824_1280.jpg",
    category: "sarees",
    sizes: ["Free Size"]
  },
  {
    id: 12,
    name: "Wrap Dress",
    price: 1699,
    image: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869762_1280.jpg",
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 13,
    name: "Chanderi Kurti",
    price: 2199,
    image: "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2592248_1280.jpg",
    category: "kurtis",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 14,
    name: "Chiffon Saree",
    price: 1799,
    image: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beautiful-1845104_1280.jpg",
    category: "sarees",
    sizes: ["Free Size"]
  },
  {
    id: 15,
    name: "Bohemian Dress",
    price: 1399,
    image: "https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564659_1280.jpg",
    category: "dresses",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 16,
    name: "Straight Cut Kurti",
    price: 899,
    image: "https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284498_1280.jpg",
    category: "kurtis",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 17,
    name: "Cotton Saree",
    price: 1299,
    image: "https://cdn.pixabay.com/photo/2017/02/13/11/25/indian-2063825_1280.jpg",
    category: "sarees",
    sizes: ["Free Size"]
  },
  {
    id: 18,
    name: "Shift Dress",
    price: 1199,
    image: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869763_1280.jpg",
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"]
  }
]

const cart = ref([])

provide('products', products)
provide('cart', cart)
</script>