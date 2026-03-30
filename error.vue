<template>
  <div class="error-page">
    <div class="patterns-bg"></div>
    
    <div class="error-container">
      <div class="error-visual">
        <h1 class="error-code">404</h1>
        <div class="mascot-wrapper">
          <img src="/minami.png" alt="Confused Mascot" class="mascot-404">
          <div class="bubble">GOMEN! <br> PAGE NOT FOUND</div>
        </div>
      </div>

      <div class="error-content">
        <h2 class="error-title">
          <span class="title-aratsu">ALAMAT</span>
          <span class="title-no">TIDAK</span>
          <span class="title-matsuri">DITEMUKAN</span>
        </h2>
        <p class="error-desc">
          Sepertinya Anda tersesat di labirin festival. <br> 
          Halaman yang Anda cari mungkin sudah dipindahkan atau sedang dalam perbaikan.
        </p>
        
        <div class="error-actions">
          <NuxtLink to="/" class="btn-home">
            <span class="btn-text">KEMBALI KE BERANDA</span>
          </NuxtLink>
        </div>
      </div>

      <div class="extra-decor">
        <img src="/CHIBI COSWALK.png" class="chibi-decor cd-1">
        <img src="/CHIBI JSONG.png" class="chibi-decor cd-2">
      </div>
    </div>
  </div>
</template>

<script setup>
// Nuxt 3 custom error page
const props = defineProps({
  error: Object
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, #ffffff 0%, #f0f0f0 100%);
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.error-container {
  max-width: 800px;
  position: relative;
  z-index: 10;
}

/* Error Code Styling */
.error-code {
  font-family: 'Bangers';
  font-size: 12rem;
  color: var(--blue-aratsu);
  margin: 0;
  line-height: 0.8;
  -webkit-text-stroke: 4px var(--black-outline);
  text-shadow: 12px 12px 0 var(--black-outline);
  opacity: 0.15;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  pointer-events: none;
}

/* Mascot & Bubble */
.mascot-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
}

.mascot-404 {
  max-width: 320px;
  height: auto;
  filter: drop-shadow(8px 8px 0 rgba(0,0,0,0.1));
  animation: wobble 4s ease-in-out infinite;
}

.bubble {
  position: absolute;
  top: -20px;
  right: -60px;
  background: white;
  border: 4px solid var(--black-outline);
  padding: 15px 25px;
  border-radius: 20px;
  font-family: 'Bangers';
  font-size: 1.5rem;
  box-shadow: 6px 6px 0 var(--black-outline);
  transform: rotate(10deg);
  line-height: 1.2;
}

.bubble::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 20px solid var(--black-outline);
}

/* Text Content */
.error-title {
  display: flex;
  justify-content: center;
  gap: 15px;
  font-size: 3.5rem;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.error-desc {
  font-size: 1.2rem;
  color: #666;
  font-weight: bold;
  line-height: 1.6;
  margin-bottom: 40px;
}

/* Button */
.btn-home {
  display: inline-block;
  text-decoration: none;
  background: var(--yellow-matsuri);
  color: var(--black-outline);
  border: 4px solid var(--black-outline);
  padding: 20px 40px;
  border-radius: 15px;
  font-family: 'Bangers';
  font-size: 1.8rem;
  letter-spacing: 2px;
  box-shadow: 8px 8px 0 var(--black-outline);
  transition: all 0.2s;
}

.btn-home:hover {
  transform: translateY(-5px);
  background: var(--red-no);
  color: white;
  box-shadow: 12px 12px 0 var(--black-outline);
}

.btn-home:active {
  transform: translate(5px, 5px);
  box-shadow: 2px 2px 0 var(--black-outline);
}

/* Decorations */
.extra-decor .chibi-decor {
  position: absolute;
  width: 100px;
  filter: grayscale(1) opacity(0.5);
  pointer-events: none;
}

.cd-1 { top: 10%; left: 10%; transform: rotate(-20deg); }
.cd-2 { bottom: 10%; right: 10%; transform: rotate(20deg); }

@keyframes wobble {
  0%, 100% { transform: rotate(-3deg) translateY(0); }
  50% { transform: rotate(3deg) translateY(-10px); }
}

@media (max-width: 768px) {
  .error-code { font-size: 8rem; }
  .error-title { font-size: 2.2rem; gap: 8px; }
  .bubble { right: 0; top: -40px; font-size: 1rem; padding: 10px 15px; }
  .mascot-404 { max-width: 220px; }
  .btn-home { padding: 15px 25px; font-size: 1.4rem; width: 100%; box-sizing: border-box; }
}
</style>
