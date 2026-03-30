<template>
  <div>
    <div class="patterns-bg"></div>
    <div class="hero-section">
      <div class="rotating-circle"></div>
      <Navbar />
      <div class="content-wrapper" style="display: flex; align-items: center; gap: 50px; flex-wrap: wrap; justify-content: center;">
        <div class="hero-left-content" style="flex: 1; min-width: 300px; text-align: left;">
          <div class="logo-main">
            <span class="title-aratsu">ARATU</span>
            <span class="title-no">NO</span>
            <span class="title-matsuri">MATSURI</span>
            <span class="title-vol">VOL.3</span>
          </div>
          
          <p style="font-size: 1.5rem; margin-top: 30px; font-weight: 600; color: #333; max-width: 500px; line-height: 1.4;">
            The biggest pop culture celebration in Tulungagung is back! Immerse yourself in a world of anime, games, and music.
          </p>

          <div class="hero-buttons" style="display: flex; gap: 20px; margin-top: 30px; flex-wrap: wrap;">
            <button class="cta-button" id="tickets">GET TICKETS</button>
            <button class="cta-button" style="background-color: var(--yellow-matsuri); color: var(--black-outline);">VIEW GUESTS</button>
          </div>
        </div>

        <div style="flex: 1; min-width: 300px; display: flex; justify-content: center;">
          <img src="/minami.png" alt="Aratsu Mascot" class="mascot-hero">
        </div>
      </div>
      <div style="text-align: center; margin-top: 50px; margin-bottom: 30px; color: #555; letter-spacing: 4px; font-family: 'Bangers'; font-size: 1.4rem; position: relative; z-index: 10;">
        JUNE 10, 2026 • GOR LEMBUPETENG • TULUNGAGUNG
      </div>
      <img src="/minami-3.png" alt="Minami 3 Mascot" class="minami-bottom-right">
      <img src="/minami-4.png" alt="Minami 4 Mascot" class="minami-bottom-left">
    </div>

    <section class="section" id="guests">
      <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 50px; font-size: 3rem;">
        <span class="title-aratsu">SPECIAL</span>
        <span class="title-no">GUESTS</span>
      </div>
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
              <h4 class="whatson-card-title">COSPLAY COMPETITION & COSWALK</h4>
              <p>Show your craft performance on the big stage!</p>
              <img src="/CHIBI COSWALK.png" alt="Chibi Coswalk" class="chibi-icon chibi-br">
            </div>
            <div class="whatson-card">
              <h4 class="whatson-card-title">IDOL & BAND PERFORMER</h4>
              <p>Meet our special idol & band performer.</p>
              <img src="/CHIBI MEDPAR.png" alt="Chibi Idol" class="chibi-icon chibi-br idol-chibi">
            </div>
            <div class="whatson-card">
              <h4 class="whatson-card-title">J-SONG COMPETITION</h4>
              <p>Show your talent on J-Song Competition!</p>
              <img src="/CHIBI JSONG.png" alt="Chibi Jsong" class="chibi-icon chibi-br jsong-chibi">
            </div>
            <div class="whatson-card">
              <h4 class="whatson-card-title">COMUNITY & MERCH BOOTH</h4>
              <p>Meet our special community & many merch booth.</p>
              <img src="/CHIBI KOMUN.png" alt="Chibi Booth" class="chibi-icon chibi-br community-chibi">
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

    <Footer />
  </div>
</template>

<script setup>
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
    width: 80px; /* Perkecil sedikit di mobile agar tidak terlalu keluar */
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
</style>
