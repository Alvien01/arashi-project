<template>
  <section class="about-section section" id="about">
    <div class="about-container">
      <div class="about-image">
        <div class="image-frame">
          <img src="/logo-aratu.png" alt="Aratsu Mascot" class="logo-aratu" />
          <div class="chibi-decor chibi-top">
            <img src="/CHIBI COSWALK.png" alt="Decor" />
          </div>
          <div class="chibi-decor chibi-bottom">
            <img src="/CHIBI KOMUN.png" alt="Decor" />
          </div>
        </div>
      </div>
      <div class="about-content">
        <h2 class="section-title text-left">
          <span class="title-blue">TENTANG</span> <br />
          <span class="title-red">ARATU NO</span> <span class="title-yellow">MATSURI</span>
        </h2>
        
        <div class="about-card">
          <p class="about-text">
            Aratu No Matsuri adalah festival perayaan <strong>Jejepangan (Pop Culture)</strong> terbesar di Tulungagung! Kami hadir untuk menyatukan para pecinta jejepangan dan berbagai aspek budaya pop dalam satu wadah yang spektakuler.
          </p>
          <p class="about-text">
            Aratu No Matsuri Vol. 3 ini akan menjadi event yang lebih masif dari sebelumnya, menghadirkan berbagai kompetisi sengit, bintang tamu eksklusif, idol performance yang memukau, dan juga berbagai merchandise kreator lokal yang unik!
          </p>
          
          <div class="stats-container">
            <div class="stat-box">
              <h3 class="stat-number">3+</h3>
              <p class="stat-label">Tahun Berjalan</p>
            </div>
            <div class="stat-box">
              <h3 class="stat-number">10K+</h3>
              <p class="stat-label">Pengunjung</p>
            </div>
            <div class="stat-box">
              <h3 class="stat-number">50+</h3>
              <p class="stat-label">Komunitas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic here if needed
</script>

<style scoped>
.about-section {
  position: relative;
  background-color: var(--white-bg);
  padding: 100px 20px;
  overflow: hidden;
  border-top: 5px dashed rgba(0,0,0,0.1);
}

.about-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.about-image {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  position: relative;
}

.image-frame {
  position: relative;
  background: var(--yellow-matsuri);
  border: 5px solid var(--black-outline);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 15px 15px 0 var(--black-outline);
  transform: rotate(-2deg);
  transition: transform 0.3s ease;
}

.image-frame:hover {
  transform: rotate(0deg) scale(1.02);
}

.logo-aratu {
  width: 100%;
  max-width: 400px;
  height: auto;
  border: 3px solid var(--black-outline);
  border-radius: 10px;
  background: white;
  display: block;
}

.chibi-decor {
  position: absolute;
  width: 120px;
  filter: drop-shadow(4px 4px 0 var(--black-outline));
  animation: float 3s ease-in-out infinite;
}

.chibi-top {
  top: -40px;
  right: -40px;
}

.chibi-bottom {
  bottom: -40px;
  left: -40px;
  animation-delay: 1.5s;
}

.about-content {
  flex: 1.2;
  min-width: 300px;
}

.text-left {
  text-align: left;
  margin-bottom: 30px;
  line-height: 1.1;
  font-size: 4rem;
}

.title-blue { color: var(--blue-aratsu); }
.title-red { color: var(--red-no); }
.title-yellow { color: var(--yellow-matsuri); }

.about-card {
  background: white;
  border: 4px solid var(--black-outline);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 8px 8px 0 var(--black-outline);
  position: relative;
}

.about-card::after {
  content: '';
  position: absolute;
  top: -15px;
  left: 30px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid var(--black-outline);
}

.about-text {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #333;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 15px;
  flex-wrap: wrap;
}

.stat-box {
  background: var(--blue-aratsu);
  color: white;
  border: 3px solid var(--black-outline);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  flex: 1;
  min-width: 100px;
  box-shadow: 4px 4px 0 var(--black-outline);
  transition: transform 0.2s ease;
}

.stat-box:hover {
  transform: translateY(-5px);
  background: var(--red-no);
}

.stat-number {
  font-family: 'Bangers', cursive;
  font-size: 2.5rem;
  margin: 0;
  -webkit-text-stroke: 1px var(--black-outline);
  text-shadow: 2px 2px 0 var(--black-outline);
  letter-spacing: 2px;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  margin: 5px 0 0 0;
}

@media (max-width: 768px) {
  .about-container {
    flex-direction: column;
    text-align: center;
  }
  
  .text-left {
    text-align: center;
    font-size: 3rem;
  }
  
  .about-card::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .chibi-top, .chibi-bottom {
    width: 80px;
  }
}
</style>
