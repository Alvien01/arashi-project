<template>
  <div class="about-page">
    <div class="patterns-bg"></div>
    <Navbar />
    
    <main class="about-main-wrapper">
      <AboutSection />
      
      <!-- Extra contents for a dedicated about page -->
      <section class="section vision-mission">
        <div class="vision-container">
          <div class="vision-card">
            <h2 class="title-aratsu">OUR VISION</h2>
            <p>Menjadi barometer utama festival budaya pop di Jawa Timur yang menginspirasi kreativitas dan komunitas.</p>
          </div>
          <div class="mission-card">
            <h2 class="title-no">OUR MISSION</h2>
            <ul>
              <li>Memberikan panggung bagi talenta lokal.</li>
              <li>Membangun ekosistem kreatif bagi para wibu dan cosplayer.</li>
              <li>Menghadirkan hiburan berkualitas tinggi dengan standar profesional.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
// Use the common components
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background-color: var(--white-bg);
  position: relative;
}

.about-main-wrapper {
  padding-top: 100px; /* Offset for fixed navbar if any, otherwise padding */
}

.vision-mission {
  padding: 50px 20px 100px;
}

.vision-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.vision-card, .mission-card {
  background: white;
  border: 4px solid var(--black-outline);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 10px 10px 0 var(--black-outline);
}

.vision-card h2, .mission-card h2 {
  font-size: 3rem;
  margin-top: 0;
  margin-bottom: 20px;
}

.vision-card p, .mission-card ul {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
}

.mission-card ul {
  padding-left: 20px;
}

.mission-card li {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .vision-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
