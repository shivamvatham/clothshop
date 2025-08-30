<template>
  <div class="min-h-screen bg-white">
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup>
const products = [
  {
    id: 1,
    name: "Elegant Cotton Kurti",
    price: 1299,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    category: "kurtis",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Designer Silk Saree", 
    price: 2499,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=600&fit=crop",
    category: "sarees",
    sizes: ["Free Size"]
  },
  {
    id: 3,
    name: "Floral Maxi Dress",
    price: 1899,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
    category: "dresses", 
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 4,
    name: "Embroidered Kurti",
    price: 1599,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=600&fit=crop",
    category: "kurtis",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 5,
    name: "Traditional Lehenga",
    price: 3999,
    image: "https://images.unsplash.com/photo-1583391733981-24c4ec5d7eaf?w=400&h=600&fit=crop",
    category: "lehengas",
    sizes: ["S", "M", "L"]
  },
  {
    id: 6,
    name: "Casual Cotton Dress",
    price: 999,
    image: "https://images.unsplash.com/photo-1566479179817-c0ae29273e17?w=400&h=600&fit=crop",
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 7,
    name: "Printed Anarkali Kurti",
    price: 1799,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&sat=-20&hue=30",
    category: "kurtis",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 8,
    name: "Banarasi Silk Saree",
    price: 4999,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=600&fit=crop&sat=20&hue=60",
    category: "sarees",
    sizes: ["Free Size"]
  },
  {
    id: 9,
    name: "A-Line Midi Dress",
    price: 1499,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&sat=10&hue=-30",
    category: "dresses",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 10,
    name: "Block Print Kurti",
    price: 1199,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=600&fit=crop&sat=15&hue=90",
    category: "kurtis",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 11,
    name: "Georgette Saree",
    price: 1999,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=600&fit=crop&sat=-10&hue=120",
    category: "sarees",
    sizes: ["Free Size"]
  },
  {
    id: 12,
    name: "Wrap Dress",
    price: 1699,
    image: "https://images.unsplash.com/photo-1566479179817-c0ae29273e17?w=400&h=600&fit=crop&sat=20&hue=180",
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 13,
    name: "Chanderi Kurti",
    price: 2199,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&sat=25&hue=240",
    category: "kurtis",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 14,
    name: "Chiffon Saree",
    price: 1799,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=600&fit=crop&sat=30&hue=300",
    category: "sarees",
    sizes: ["Free Size"]
  },
  {
    id: 15,
    name: "Bohemian Dress",
    price: 1399,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&sat=-15&hue=45",
    category: "dresses",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 16,
    name: "Straight Cut Kurti",
    price: 899,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=600&fit=crop&sat=10&hue=270",
    category: "kurtis",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 17,
    name: "Cotton Saree",
    price: 1299,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=600&fit=crop&sat=5&hue=150",
    category: "sarees",
    sizes: ["Free Size"]
  },
  {
    id: 18,
    name: "Shift Dress",
    price: 1199,
    image: "https://images.unsplash.com/photo-1566479179817-c0ae29273e17?w=400&h=600&fit=crop&sat=-5&hue=210",
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"]
  }
]

const cart = ref([])

provide('products', products)
provide('cart', cart)
</script>