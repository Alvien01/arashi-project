<template>
  <div>
    <div class="patterns-bg"></div>
    <div class="hero-section">
      <div class="rotating-circle"></div>
      <Navbar />
      <div class="content-wrapper" style="display: flex; align-items: center; gap: 50px; flex-wrap: wrap; justify-content: center;">
        <div class="hero-left-content" style="flex: 1; min-width: 300px; text-align: left;">
          <h1 class="logo-main">
            <span class="title-aratsu">ARATU</span>
            <span class="title-no">NO</span>
            <span class="title-matsuri">MATSURI</span>
            <span class="title-vol">VOL.3</span>
          </h1>
          
          <p style="font-size: 1.5rem; margin-top: 30px; font-weight: 600; color: #333; max-width: 500px; line-height: 1.4;">
            The biggest pop culture celebration in Tulungagung is back! Immerse yourself in a world of anime, games, and music.
          </p>

          <div class="hero-buttons" style="display: flex; gap: 20px; margin-top: 30px; flex-wrap: wrap;">
            <NuxtLink to="/ticket" class="cta-button">GET TICKETS</NuxtLink>
            <button class="cta-button" style="background-color: var(--yellow-matsuri); color: var(--black-outline);">VIEW GUESTS</button>
          </div>
        </div>

        <div style="flex: 1; min-width: 300px; display: flex; justify-content: center; position: relative;">
          <img src="/logo-aratu.png" alt="Aratu No Matsuri Official Logo Background" class="logo-hero-bg">
          <img src="/minami.png" alt="Minami Mascot Aratu No Matsuri" class="mascot-hero">
        </div>
      </div>
      <div class="hero-date-wrapper">
        <span class="hero-date-badge">
          10 MEI 2026 • GOR LEMBUPETENG • TULUNGAGUNG
        </span>
      </div>
      <img src="/minami-2.png" alt="Minami Chibi Mascot Aratu No Matsuri" class="minami-top-left">
      <img src="/minami-3.png" alt="Minami Mascot Performing Aratu No Matsuri" class="minami-bottom-right">
      <img src="/minami-4.png" alt="Minami Mascot Cute Pose Aratu No Matsuri" class="minami-bottom-left">
    </div>

    <section class="section" id="guests">
      <h2 style="display: flex; justify-content: center; gap: 15px; margin-bottom: 50px; font-size: 3rem; margin-top: 0; font-weight: normal;">
        <span class="title-aratsu">SPECIAL</span>
        <span class="title-no">GUESTS</span>
      </h2>
      <div class="card-grid">
        <div class="guest-card" v-for="(guest, index) in guestsList" :key="index">
          <div :class="guest.images.length > 1 ? 'guest-image-split' : 'guest-image-single'">
            <img :src="guest.images[0]" :alt="guest.name.split(' & ')[0]">
            <img v-if="guest.images.length > 1" :src="guest.images[1]" :alt="guest.name.split(' & ')[1]">
          </div>
          <h3 class="guest-name">{{ guest.name }}</h3>
          <p style="text-transform: uppercase; font-size: 0.8rem; font-weight: bold; color: #777;">{{ guest.role }}</p>
        </div>
      </div>
      <div style="text-align: center; margin-top: 50px;">
        <div style="display: flex; justify-content: center; gap: 15px; font-size: 3rem; margin: 0;">
          <span class="title-matsuri">AND</span>
          <span class="title-matsuri">MANY</span>
          <span class="title-matsuri">MORE...</span>
        </div>
      </div>
    </section>
    <section class="section" style="background: var(--blue-aratsu); border-top: 5px solid var(--black-outline); border-bottom: 5px solid var(--black-outline); max-width: 100%; color: white;">
      <div class="whatson-container">
        <div class="whatson-content">
          <h2 class="section-title whatson-title">WHAT'S ON?</h2>
          <div class="whatson-grid">
            <div class="whatson-card">
              <h3 class="whatson-card-title">COSPLAY COMPETITION & COSWALK</h3>
              <p>Show your craft performance on the big stage!</p>
              <img src="/CHIBI COSWALK.png" alt="Chibi Coswalk Aratu No Matsuri" class="chibi-icon chibi-br">
            </div>
            <div class="whatson-card">
              <h3 class="whatson-card-title">IDOL & BAND PERFORMER</h3>
              <p>Meet our special idol & band performer.</p>
              <img src="/CHIBI MEDPAR.png" alt="Chibi Idol Aratu No Matsuri" class="chibi-icon chibi-br idol-chibi">
            </div>
            <div class="whatson-card">
              <h3 class="whatson-card-title">J-SONG COMPETITION</h3>
              <p>Show your talent on J-Song Competition!</p>
              <img src="/CHIBI JSONG.png" alt="Chibi Jsong Aratu No Matsuri" class="chibi-icon chibi-br jsong-chibi">
            </div>
            <div class="whatson-card">
              <h3 class="whatson-card-title">COMUNITY & MERCH BOOTH</h3>
              <p>Meet our special community & many merch booth.</p>
              <img src="/CHIBI KOMUN.png" alt="Chibi Booth Aratu No Matsuri" class="chibi-icon chibi-br community-chibi">
            </div>
          </div>
        </div>
        <div class="whatson-join">
           <div class="join-fun-card">
              <h3 class="join-fun-title">JOIN THE FUN!</h3>
              <p class="join-fun-desc">Tickets starting from Rp 25.000</p>
              <img src="/minami-2.png" alt="Minami Fun" class="minami-fun">
           </div>
        </div>
      </div>
    </section>

    <!-- Gallery Moment Section -->
    <section class="section gallery-section" id="gallery">
      <h2 style="display: flex; justify-content: center; gap: 15px; margin-bottom: 50px; font-size: 3.5rem; margin-top: 0; font-weight: normal;">
        <span class="title-aratsu">GALLERY</span>
        <span class="title-no">MOMENTS</span>
      </h2>
      <div class="gallery-grid">
        <div class="gallery-item item-1">
          <img src="/gallery1.jpg" alt="Aratu No Matsuri Stage Performance">
        </div>
        <div class="gallery-item item-2">
          <img src="/gallery2.jpg" alt="Aratu No Matsuri Cosplay Competition">
        </div>
        <div class="gallery-item item-3">
          <img src="/gallery3.jpg" alt="Aratu No Matsuri Community Booth">
        </div>
        <div class="gallery-item item-4">
          <img src="/gallery4.jpg" alt="Aratu No Matsuri Mascot Exhibition">
        </div>
        <div class="gallery-item item-5">
          <img src="/gallery5.jpg" alt="Aratu No Matsuri Event Crowd Tulungagung">
        </div>
        <div class="gallery-item item-6">
          <img src="/gallery6.jpg" alt="Minami Mascot Graphic Aratu No Matsuri">
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'ARATU NO MATSURI | Festival Pop Culture Terbesar di Tulungagung',
  ogTitle: 'ARATU NO MATSURI | Festival Pop Culture Terbesar di Tulungagung',
  description: 'Aratu No Matsuri Vol.3 - Event Jejepangan, Cosplay, Idol, dan J-Band terbesar di Tulungagung. 10 Mei 2026 di GOR Lembupeteng. Beli tiket sekarang!',
  ogDescription: 'Aratu No Matsuri Vol.3 - Event Jejepangan, Cosplay, Idol, dan J-Band terbesar di Tulungagung. 10 Mei 2026 di GOR Lembupeteng. Beli tiket sekarang!',
  ogImage: '/logo-aratu.png',
  twitterCard: 'summary_large_image',
  keywords: 'Aratu No Matsuri, event jejepangan Tulungagung, cosplay Tulungagung, festival anime, festival budaya populer, Matsuri Tulungagung, Aratu Vol 3, event Tulungagung 2026'
})

useSchemaOrg([
  defineOrganization({
    name: 'Aratu No Matsuri',
    logo: '/logo-aratu.png',
    sameAs: [
      'https://instagram.com/aratunomatsuri'
    ],
    address: {
      addressLocality: 'Tulungagung',
      addressRegion: 'Jawa Timur',
      addressCountry: 'ID'
    }
  }),
  defineWebSite({
    name: 'Aratu No Matsuri',
    description: 'The Biggest Pop Culture Event in Tulungagung'
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' }
    ]
  })
])

const guestsList = [
  { name: 'HIROTO & LITA', role: 'Judge Coswalk Competition', images: ['/image.png'] },
  { name: 'ARDHIAN & SASHMIZU', role: 'Judge Cosplay Competition', images: ['/image (1).png'] },
  { name: 'VERONYAN & PIIKAPI', role: 'Judge J-song', images: ['/image (2).png'] }
]
</script>

<style scoped>
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
  60% {transform: translateY(-5px);}
}

.whatson-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}
.whatson-content {
  flex: 1;
}
.whatson-title {
  color: white !important;
  text-align: left !important;
  /* -webkit-text-stroke: 1px var(--black-outline); */ /* Outline dihapus sesuai permintaan */
  text-shadow: 2px 2px 0 var(--black-outline);
}
.whatson-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.whatson-card {
  background: white;
  color: black;
  padding: 20px;
  border: 3px solid var(--black-outline);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 4px 4px 0 var(--black-outline);
  transition: transform 0.2s;
}
.whatson-card:hover {
  transform: translateY(-5px);
}
.whatson-card-title {
  font-family: 'Bangers';
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 10px;
  letter-spacing: 2px; /* Jarak antar text diperlebar */
}
.whatson-join {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
}
.join-fun-card {
  background: var(--yellow-matsuri);
  border: 4px solid var(--black-outline);
  padding: 50px;
  border-radius: 20px;
  transform: rotate(2deg);
  color: black;
  position: relative;
  box-shadow: 8px 8px 0 var(--black-outline);
  max-width: 400px;
  width: 100%;
}
.join-fun-title {
  font-family: 'Bangers';
  font-size: 3rem;
  margin: 0 0 10px 0;
}
.join-fun-desc {
  font-weight: bold;
}

/* Chibi Icon Position Adjustment */
.chibi-bl { bottom: -25px; left: -25px; }
.chibi-tr { top: -25px; right: -25px; }
.chibi-tl { top: -25px; left: -25px; }
.chibi-br { bottom: -25px; right: -25px; }

/* Custom overlaps to make them 'more visible' as requested */
.idol-chibi { bottom: -10px !important; right: -10px !important; transform: scale(1.1); }
.community-chibi { bottom: -10px !important; right: -10px !important; transform: scale(1.1); }
.jsong-chibi { bottom: -45px !important; right: -20px !important; } /* Lebih ke bawah dan ke kanan */

@media (max-width: 768px) {
  .whatson-container {
    flex-direction: column;
    gap: 30px;
    padding-bottom: 30px;
  }
  .whatson-title {
    text-align: center !important;
    font-size: 2.5rem;
    -webkit-text-stroke: 1px var(--black-outline); /* Munculkan kembali di mobile agar kontras */
  }
  .whatson-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .whatson-card {
    padding: 25px;
  }
  .whatson-card-title {
    font-size: 1.8rem;
    letter-spacing: 1px;
  }
  .chibi-icon {
    width: 80px; 
  }
  .chibi-bl { bottom: -15px; left: -15px; }
  .chibi-tr { top: -15px; right: -15px; }
  .chibi-tl { top: -15px; left: -15px; }
  .chibi-br { bottom: -15px; right: -15px; }
  
  .whatson-join {
    width: 100%;
    margin-top: 20px;
  }
  .join-fun-card {
    transform: rotate(0deg);
    padding: 40px 20px;
    width: 90%;
    box-sizing: border-box;
  }
  .join-fun-title {
    font-size: 2.5rem;
  }
}

.gallery-section {
  padding: 100px 20px;
  background: radial-gradient(circle at 10% 20%, rgba(241, 196, 15, 0.05) 0%, transparent 20%),
              radial-gradient(circle at 90% 80%, rgba(46, 134, 193, 0.05) 0%, transparent 20%);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-item {
  background: white;
  border: 4px solid var(--black-outline);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 12px 12px 0 var(--black-outline);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  position: relative;
}

.gallery-item img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border: 4px solid var(--black-outline);
  border-radius: 8px;
  display: block;
}

.gallery-caption {
  font-family: 'Bangers';
  font-size: 2rem;
  text-align: center;
  margin-top: 20px;
  color: var(--black-outline);
  text-shadow: 2px 2px 0 var(--yellow-matsuri);
  letter-spacing: 1px;
}

.gallery-item:hover {
  transform: translateY(-15px) rotate(3deg) scale(1.05);
  box-shadow: 18px 18px 0 var(--black-outline);
  z-index: 10;
}

.item-1 { transform: rotate(-3deg); }
.item-2 { transform: rotate(2deg); }
.item-3 { transform: rotate(-1.5deg); }
.item-4 { transform: rotate(3deg); }
.item-5 { transform: rotate(-2deg); }
.item-6 { transform: rotate(1.5deg); }

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .gallery-item {
    transform: rotate(0) !important;
    width: 100%;
    box-sizing: border-box;
  }
}

/* Hero Date Badge Styles */
.hero-date-wrapper {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
  position: relative;
  z-index: 10;
}

.hero-date-badge {
  display: inline-block;
  background-color: var(--yellow-matsuri);
  color: var(--black-outline);
  padding: 14px 45px;
  border-radius: 100px;
  font-family: 'Bangers';
  font-size: 1.6rem;
  letter-spacing: 2px;
  border: 4px solid var(--black-outline);
  box-shadow: 8px 8px 0 var(--black-outline);
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.hero-date-badge:hover {
  transform: scale(1.05) rotate(-1deg);
  background-color: var(--blue-aratsu);
  color: white;
  box-shadow: 10px 10px 0 var(--black-outline);
}

@media (max-width: 768px) {
  .hero-date-badge {
    font-size: 1.1rem;
    padding: 10px 25px;
    letter-spacing: 1px;
    margin: 0 10px;
    box-shadow: 5px 5px 0 var(--black-outline);
  }
}

/* Hero Mascot Background Logo */
.logo-hero-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140%;
  max-width: 650px;
  height: auto;
  opacity: 0.1;
  z-index: 1;
  pointer-events: none;
  filter: grayscale(1) brightness(0);
  animation: slowRotate 40s linear infinite;
}

.mascot-hero {
  position: relative;
  z-index: 2;
}

@media (max-width: 768px) {
  .logo-hero-bg {
    display: none;
  }
}

.minami-top-left {
  position: absolute;
  top: 120px;
  left: -40px;
  max-width: 180px;
  z-index: 5;
  pointer-events: none;
  filter: drop-shadow(4px 4px 0 var(--black-outline));
  transform: rotate(10deg);
  animation: float 5s ease-in-out infinite;
}

.minami-bottom-right {
  opacity: 0.35 !important;
  transition: opacity 0.3s ease;
}

.minami-bottom-right:hover {
  opacity: 0.8 !important; 
}

@media (max-width: 768px) {
  .minami-top-left {
    display: none;
  }
}
</style>
