<template>
  <div>
    <div class="patterns-bg"></div>
    
    <Navbar />

    <!-- Header Section -->
    <div class="event-header">
      <h1 class="page-title">OUR PREVIOUS <span class="title-yellow">EVENTS</span></h1>
      <p class="page-subtitle">Melihat kembali momen tak terlupakan dari perjalanan Aratu No Matsuri!</p>
    </div>

    <!-- Event History Timeline/Cards -->
    <section class="section event-history-section">
      <!-- Aratu Vol 2 -->
      <div class="history-card">
        <div class="history-image">
          <img src="/minami.png" alt="Aratu Vol 2" />
        </div>
        <div class="history-content">
          <h2 class="history-title">ARATU NO MATSURI <span class="title-blue">VOL. 2</span></h2>
          <p class="history-date">Agustus 2025 • GOR Lembupeteng</p>
          <p class="history-desc">
            Event kedua kami yang sukses membawa lebih dari 5.000 pengunjung! Vol. 2 menghadirkan lomba Coswalk terbesar di tahun itu, penampilan Idol Lokal yang memukau, dan lebih banyak booth komunitas dari berbagai kota.
          </p>
          <ul class="history-highlights">
            <li>🌟 Kompetisi Cosplay Profesional dengan Juri Nasional</li>
            <li>🎤 Idol & J-Band Performance (10+ Pengisi Acara)</li>
            <li>🛍️ 30+ Kreator Lokal & Merchandise Booth Area</li>
          </ul>
        </div>
      </div>

      <!-- Aratu Vol 1 -->
      <div class="history-card reverse-card">
        <div class="history-image">
          <img src="/CHIBI COSWALK.png" alt="Aratu Vol 1" />
        </div>
        <div class="history-content">
          <h2 class="history-title">ARATU NO MATSURI <span class="title-red">VOL. 1</span></h2>
          <p class="history-date">Juli 2024 • Gedung Serbaguna</p>
          <p class="history-desc">
            Langkah pertama kami menuju festival pop culture (Jejepangan) terbesar di kota ini. Dibanjiri antusiasme luar biasa dari para wibu, weaboo, dan pegiat seni pop culture!
          </p>
          <ul class="history-highlights">
            <li>🌟 J-Song & Karaoke Competition Perdana</li>
            <li>🎤 Penampilan Band Jejepangan</li>
            <li>🛍️ Itasha Exhibition Mini</li>
          </ul>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>
<script setup>
useSeoMeta({
  title: 'Previous Events History | Aratu No Matsuri',
  ogTitle: 'Previous Events History | Aratu No Matsuri',
  description: 'Melihat kembali momen tak terlupakan dari perjalanan Aratu No Matsuri Vol.1 dan Vol.2.',
  ogDescription: 'Melihat kembali momen tak terlupakan dari perjalanan Aratu No Matsuri Vol.1 dan Vol.2.',
  ogImage: '/logo-aratu.png',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
.patterns-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle, #eee 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.5;
  z-index: -1;
}

.event-header {
  min-height: 45vh;
  padding-top: 150px;
  text-align: center;
  background: radial-gradient(circle, #ffffff 0%, #f0f0f0 100%);
  border-bottom: 5px solid var(--black-outline);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page-title {
  font-family: 'Bangers', cursive;
  font-size: 4rem;
  color: var(--blue-aratsu);
  -webkit-text-stroke: 1.5px var(--black-outline);
  text-shadow: 4px 4px 0 var(--black-outline);
  margin: 0;
  letter-spacing: 2px;
}

.title-yellow { color: var(--yellow-matsuri); }
.title-blue { color: var(--blue-aratsu); }
.title-red { color: var(--red-no); }

.page-subtitle {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-top: 15px;
  padding: 0 20px;
}

.event-history-section {
  padding-top: 60px;
}

.history-card {
  display: flex;
  background: white;
  border: 4px solid var(--black-outline);
  border-radius: 20px;
  margin-bottom: 50px;
  box-shadow: 10px 10px 0 var(--black-outline);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.history-card:hover {
  transform: translateY(-8px);
}

.reverse-card {
  flex-direction: row-reverse;
}

.history-image {
  flex: 1;
  background: var(--yellow-matsuri);
  border-right: 4px solid var(--black-outline);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.reverse-card .history-image {
  border-right: none;
  border-left: 4px solid var(--black-outline);
  background: #FFF5EE; /* Light color for contrast with image */
}

.history-image img {
  max-width: 250px;
  height: auto;
  filter: drop-shadow(4px 4px 0 var(--black-outline));
  transition: transform 0.3s ease;
}

.history-card:hover .history-image img {
  transform: scale(1.05);
}

.history-content {
  flex: 2;
  padding: 40px;
}

.history-title {
  font-family: 'Bangers', cursive;
  font-size: 2.8rem;
  margin: 0 0 10px 0;
  letter-spacing: 1px;
}

.history-date {
  font-weight: bold;
  font-size: 0.95rem;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 25px;
  border-bottom: 3px dashed var(--black-outline);
  padding-bottom: 10px;
  display: inline-block;
}

.history-desc {
  font-size: 1.15rem;
  line-height: 1.6;
  margin-bottom: 25px;
}

.history-highlights {
  list-style-type: none;
  padding: 0;
}

.history-highlights li {
  font-weight: bold;
  margin-bottom: 12px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 768px) {
  .history-card, .reverse-card {
    flex-direction: column;
  }
  .history-image {
    border-right: none !important;
    border-left: none !important;
    border-bottom: 4px solid var(--black-outline);
  }
}
</style>
