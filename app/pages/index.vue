<template>
  <div>
    <div class="patterns-bg"></div>
    <div class="hero-section">
      <div class="rotating-circle"></div>
      <nav class="nav-container">
        <div class="nav-logo">
          <img src="/logo-aratu.png" alt="Aratsu Logo">
        </div>
        <div class="nav-links">
          <a href="#home" class="nav-link">HOME</a>
          <a href="#guests" class="nav-link">EVENT</a>
          <a href="#schedule" class="nav-link">SCHEDULE</a>
          <a href="#about" class="nav-link">ABOUT</a>
          <a href="#merch" class="nav-link">MERCH</a>
        </div>
        <div class="nav-actions">
           <a href="#tickets" class="nav-cta">GET TICKETS</a>
        </div>
      </nav>
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
      <h2 class="section-title">SPECIAL GUESTS</h2>
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
        <h3 style="font-family: 'Bangers', cursive; font-size: 3rem; color: var(--yellow-matsuri); -webkit-text-stroke: 1.5px var(--black-outline); text-shadow: 4px 4px 0 var(--black-outline); letter-spacing: 2px; margin: 0;">AND MANY MORE...</h3>
      </div>
    </section>
    <section class="section" style="background: var(--blue-aratsu); border-top: 5px solid var(--black-outline); border-bottom: 5px solid var(--black-outline); max-width: 100%; color: white;">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 40px; flex-wrap: wrap;">
        <div style="flex: 1;">
          <h2 class="section-title" style="color: white; text-align: left; -webkit-text-stroke: 1px var(--black-outline);">WHAT'S ON?</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="background: white; color: black; padding: 20px; border: 3px solid var(--black-outline); border-radius: 10px; position: relative; overflow: hidden;">
              <h4 style="font-family: 'Bangers'; font-size: 1.5rem;">COSPLAY COMPETITION & COSWALK</h4>
              <p>Show your craft performance on the big stage!</p>
              <img src="/CHIBI COSWALK.png" alt="Chibi Coswalk" class="chibi-icon chibi-bl">
            </div>
            <div style="background: white; color: black; padding: 20px; border: 3px solid var(--black-outline); border-radius: 10px; position: relative; overflow: hidden;">
              <h4 style="font-family: 'Bangers'; font-size: 1.5rem;">IDOL & BAND PERFORMER</h4>
              <p>Meet our special idol & band performer.</p>
              <img src="/CHIBI MEDPAR.png" alt="Chibi Idol" class="chibi-icon chibi-tr">
            </div>
            <div style="background: white; color: black; padding: 20px; border: 3px solid var(--black-outline); border-radius: 10px; position: relative; overflow: hidden;">
              <h4 style="font-family: 'Bangers'; font-size: 1.5rem;">J-SONG COMPETITION</h4>
              <p>Show your talent on J-Song Competition!</p>
              <img src="/CHIBI JSONG.png" alt="Chibi Jsong" class="chibi-icon chibi-tl">
            </div>
            <div style="background: white; color: black; padding: 20px; border: 3px solid var(--black-outline); border-radius: 10px; position: relative; overflow: hidden;">
              <h4 style="font-family: 'Bangers'; font-size: 1.5rem;">COMUNITY & MERCH BOOTH</h4>
              <p>Meet our special community & many merch booth.</p>
              <img src="/CHIBI KOMUN.png" alt="Chibi Booth" class="chibi-icon chibi-br">
            </div>
          </div>
        </div>
        <div style="flex: 1; text-align: center;">
           <div style="background: var(--yellow-matsuri); border: 4px solid var(--black-outline); padding: 50px; border-radius: 20px; transform: rotate(2deg); color: black; position: relative;">
              <h3 style="font-family: 'Bangers'; font-size: 3rem;">JOIN THE FUN!</h3>
              <p style="font-weight: bold;">Tickets starting from Rp 25.000</p>
              <img src="/minami-2.png" alt="Minami Fun" class="minami-fun">
           </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div style="font-family: 'Bangers'; font-size: 2.5rem; margin-bottom: 20px;">
        <span style="color: var(--blue-aratsu);">ARATSU</span>
        <span style="color: var(--red-no);">NO</span>
        <span style="color: var(--yellow-matsuri);">MATSURI</span>
      </div>
      <p>© 2026 Aratsu Project Team. All Rights Reserved.</p>
    </footer>
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
</style>
