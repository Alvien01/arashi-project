<template>
  <div class="merch-page">
    <div class="patterns-bg"></div>
    <Navbar />

    <main class="merch-main">
      <header class="merch-header">
        <h1 class="section-title">
          <span class="title-aratsu">OFFICIAL</span>
          <span class="title-no">EXCLUSIVE</span>
          <span class="title-matsuri">MERCH</span>
        </h1>
        <p class="merch-intro">Dapatkan koleksi eksklusif Aratu No Matsuri Vol. 3! Semua produk dibuat terbatas dan hanya tersedia selama periode event.</p>
      </header>

      <!-- Category Filter -->
      <div class="merch-filters">
        <button 
          v-for="cat in categories" 
          :key="cat" 
          :class="['filter-btn', { 'is-active': activeCategory === cat }]"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Merch Grid -->
      <div class="merch-grid">
        <div 
          v-for="item in filteredMerch" 
          :key="item.id" 
          class="merch-card"
        >
          <div class="merch-image-box">
            <img :src="item.image" :alt="item.name + ' - Aratu No Matsuri Vol 3 Exclusive Merch'" class="merch-img">
            <div v-if="item.isNew" class="badge-new">NEW!</div>
            <div class="merch-price">Rp {{ item.price.toLocaleString() }}</div>
          </div>
          <div class="merch-info">
            <span class="merch-cat">{{ item.category }}</span>
            <h3 class="merch-name">{{ item.name }}</h3>
            <p class="merch-desc">{{ item.description }}</p>
            <button class="buy-btn">ORDER VIA WA</button>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Official Merch | ARATU NO MATSURI Tulungagung',
  ogTitle: 'Official Merch | ARATU NO MATSURI Tulungagung',
  description: 'Koleksi merchandise eksklusif Aratu No Matsuri Vol.3. Kaos, Keychain, Poster, dan aksesoris keren lainnya. Beli sekarang sebelum kehabisan!',
  ogDescription: 'Koleksi merchandise eksklusif Aratu No Matsuri Vol.3. Kaos, Keychain, Poster, dan aksesoris keren lainnya. Beli sekarang sebelum kehabisan!',
  ogImage: '/logo-aratu.png',
  twitterCard: 'summary_large_image',
  keywords: 'merchandise Aratu, kaos anime Tulungagung, gantungan kunci Aratu, poster Aratu Vol 3'
})

useSchemaOrg([
  defineItemList({
    name: 'Official Merch Aratu No Matsuri Vol. 3',
    itemListElement: [
      { name: 'Official Vol.3 Black Tee', position: 1 },
      { name: 'Minami Chibi Keychain', position: 2 },
      { name: 'Limited Edition Event Poster', position: 3 }
    ]
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Merch', item: '/merch' }
    ]
  })
])

const activeCategory = ref('ALL')
const categories = ['ALL', 'T-SHIRT', 'KEYCHAIN', 'POSTER', 'OTHERS']

const merchItems = [
  {
    id: 1,
    name: 'OFFICIAL VOL.3 BLACK TEE',
    category: 'T-SHIRT',
    price: 125000,
    image: '/minami.png', // Placeholder
    description: 'Cotton Combed 30s premium with high quality plastisol print.',
    isNew: true
  },
  {
    id: 2,
    name: 'MINAMI CHIBI KEYCHAIN',
    category: 'KEYCHAIN',
    price: 25000,
    image: '/CHIBI COSWALK.png', // Placeholder
    description: 'Double sided acrylic keychain with glitter finish.',
    isNew: false
  },
  {
    id: 3,
    name: 'LIMITED EDITION EVENT POSTER',
    category: 'POSTER',
    price: 35000,
    image: '/logo-aratu.png', // Placeholder
    description: 'A3 size on 260gsm Art Paper with glossy lamination.',
    isNew: true
  },
  {
    id: 4,
    name: 'MATSURI FAN (KIPAS)',
    category: 'OTHERS',
    price: 15000,
    image: '/minami-2.png', // Placeholder
    description: 'Perfect for the heat! Traditional japanese style fan.',
    isNew: false
  },
  {
    id: 5,
    name: 'VOL.3 HOODIE OVERSIZE',
    category: 'T-SHIRT',
    price: 245000,
    image: '/minami-3.png', // Placeholder
    description: 'Super comfy oversized hoodie with embroidered logo.',
    isNew: true
  },
  {
    id: 6,
    name: 'CHARACTER STICKER PACK',
    category: 'OTHERS',
    price: 12000,
    image: '/CHIBI JSONG.png', // Placeholder
    description: 'Pack of 5 waterproof vinyl stickers.',
    isNew: false
  }
]

const filteredMerch = computed(() => {
  if (activeCategory.value === 'ALL') return merchItems
  return merchItems.filter(item => item.category === activeCategory.value)
})
</script>

<style scoped>
.merch-page {
  min-height: 100vh;
  background: white;
}

.merch-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 80px;
}

.merch-header {
  text-align: center;
  margin-bottom: 50px;
}

.merch-header h1 {
  display: flex;
  justify-content: center;
  gap: 15px;
  font-size: 4rem;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.merch-intro {
  font-size: 1.2rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Filter Styling */
.merch-filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.filter-btn {
  font-family: 'Bangers';
  font-size: 1.4rem;
  padding: 10px 25px;
  background: white;
  border: 3px solid var(--black-outline);
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 4px 4px 0 var(--black-outline);
  transition: all 0.2s;
  letter-spacing: 1px;
}

.filter-btn:hover {
  transform: translateY(-2px);
  background: var(--blue-aratsu);
  color: white;
}

.filter-btn.is-active {
  background: var(--red-no);
  color: white;
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--black-outline);
}

/* Grid & Cards */
.merch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
}

.merch-card {
  background: white;
  border: 4px solid var(--black-outline);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 10px 10px 0 var(--black-outline);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.merch-card:hover {
  transform: translateY(-10px) rotate(1deg);
}

.merch-image-box {
  background: #f8f8f8;
  height: 300px;
  position: relative;
  border-bottom: 4px solid var(--black-outline);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.merch-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.badge-new {
  position: absolute;
  top: 15px;
  left: 15px;
  background: var(--red-no);
  color: white;
  font-family: 'Bangers';
  padding: 5px 15px;
  border: 3px solid var(--black-outline);
  border-radius: 8px;
  transform: rotate(-10deg);
  font-size: 1.2rem;
  z-index: 10;
}

.merch-price {
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--yellow-matsuri);
  color: var(--black-outline);
  font-family: 'Bangers';
  padding: 10px 20px;
  border-top: 4px solid var(--black-outline);
  border-left: 4px solid var(--black-outline);
  border-top-left-radius: 20px;
  font-size: 1.5rem;
  letter-spacing: 1px;
}

.merch-info {
  padding: 25px;
  text-align: left;
}

.merch-cat {
  font-weight: bold;
  color: var(--blue-aratsu);
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.merch-name {
  font-family: 'Bangers';
  font-size: 1.8rem;
  margin: 10px 0;
  line-height: 1.2;
}

.merch-desc {
  font-size: 1rem;
  color: #666;
  margin-bottom: 25px;
  min-height: 3rem;
}

.buy-btn {
  width: 100%;
  padding: 15px;
  font-family: 'Bangers';
  font-size: 1.5rem;
  background: var(--black-outline);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 1.5px;
}

.buy-btn:hover {
  background: #25D366; /* WhatsApp Green */
  color: white;
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .merch-header h1 {
    font-size: 2.8rem;
    gap: 10px;
  }
  .merch-grid {
    grid-template-columns: 1fr;
  }
}
</style>
