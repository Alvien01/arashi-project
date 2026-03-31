<template>
  <div class="ticket-page">
    <div class="patterns-bg"></div>
    <Navbar />

    <main class="ticket-main">
      <div class="ticket-container">
        <!-- Ticket Header Area -->
        <header class="ticket-header">
          <h1 class="page-title">
            <span class="title-aratsu">GET</span>
            <span class="title-no">YOUR</span>
            <span class="title-matsuri">TICKETS</span>
          </h1>
          <p class="page-subtitle">Amankan slotmu sekarang dan jadilah bagian dari festival Pop-Culture terbesar di Tulungagung!</p>
        </header>

        <div class="ticket-content">
          <!-- Ticket Form Left Side -->
          <div class="form-side">
            <div class="ticket-card-form">
              <h2 class="form-title">BOOKING FORM</h2>
              <form @submit.prevent="handleSubmit" class="booking-form">
                <div class="form-group">
                  <label for="name">NAMA LENGKAP</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="booking.name" 
                    placeholder="Masukkan nama sesuai identitas" 
                    required
                  >
                </div>

                <div class="form-group">
                  <label for="phone">NOMOR HP / WHATSAPP</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="booking.phone" 
                    placeholder="Contoh: 081234567890" 
                    required
                  >
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label>JUMLAH TIKET</label>
                    <div class="qty-control">
                      <button type="button" @click="decrementQty" class="qty-btn">-</button>
                      <input type="number" v-model="booking.quantity" readonly>
                      <button type="button" @click="incrementQty" class="qty-btn">+</button>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label>TIPE TIKET</label>
                    <select v-model="booking.type" class="ticket-select">
                      <option value="REGULAR">REGULAR PASS - Rp 25k</option>
                      <option value="VIP">VIP PASS - Rp 75k</option>
                    </select>
                  </div>
                </div>

                <div class="total-section">
                  <span class="total-label">ESTIMASI TOTAL:</span>
                  <span class="total-price">Rp {{ totalPrice.toLocaleString() }}</span>
                </div>

                <div class="payment-section">
                  <h3 class="payment-title">TRANSFER KE:</h3>
                  <div class="qris-box">
                    <img src="/CHIBI KOMUN.png" alt="QRIS Payment Method Aratu No Matsuri Vol 3" class="qris-img">
                    <p class="qris-note">SCAN UNTUK BAYAR</p>
                  </div>
                </div>

                <div class="form-group">
                  <label>KIRIM BUKTI TRANSFER</label>
                  <div :class="['upload-box', { 'has-file': booking.proof }]">
                    <input 
                      type="file" 
                      id="proof" 
                      @change="handleFileUpload" 
                      accept="image/*" 
                      required
                    >
                    <div v-if="!proofPreview" class="upload-placeholder">
                      <span class="upload-icon">📷</span>
                      <p>KLIK UNTUK UNGGAH GAMBAR</p>
                    </div>
                    <img v-else :src="proofPreview" alt="Proof Preview" class="proof-preview">
                  </div>
                </div>

                <button type="submit" class="cta-button submit-btn" :disabled="isSubmitting">
                   {{ isSubmitting ? 'MEMPROSES...' : 'BELI TIKET SEKARANG' }}
                </button>
                <p class="form-note">*Admin akan melakukan verifikasi pembayaran dalam 1x24 jam.</p>
              </form>
            </div>
          </div>

          <!-- Information Sidebar Right Side -->
          <aside class="info-side">
            <div class="info-card">
              <h3 class="info-title">EVENT INFO</h3>
              <div class="info-list">
                <div class="info-item">
                  <span class="info-icon">📍</span>
                  <div class="info-text">
                    <strong>LOCATION</strong>
                    <p>GOR LEMBUPETENG, TULUNGAGUNG</p>
                  </div>
                </div>
                <div class="info-item">
                  <span class="info-icon">📅</span>
                  <div class="info-text">
                    <strong>DATE</strong>
                    <p>10 MEI 2026</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="info-card warning">
              <h3 class="info-title">TICKET BENEFITS</h3>
              <ul class="benefit-list">
                <li>Akses ke seluruh panggung utama.</li>
                <li>Partisipasi dalam Cosplay Walk.</li>
                <li>Meet & Greet (Hanya Tiket VIP).</li>
                <li>Exclusive Poster & Lanyard (Hanya Tiket VIP).</li>
              </ul>
              <img src="/minami-2.png" alt="Mascot" class="mini-mascot">
            </div>
          </aside>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

useSeoMeta({
  title: 'Beli Tiket | ARATU NO MATSURI Tulungagung',
  ogTitle: 'Beli Tiket | ARATU NO MATSURI Tulungagung',
  description: 'Dapatkan tiket Aratu No Matsuri Vol.3 sekarang! Regular Pass dan VIP Pass tersedia. Slot terbatas, jangan sampai kehabisan!',
  ogDescription: 'Dapatkan tiket Aratu No Matsuri Vol.3 sekarang! Regular Pass dan VIP Pass tersedia. Slot terbatas, jangan sampai kehabisan!',
  ogImage: '/logo-aratu.png',
  twitterCard: 'summary_large_image',
  keywords: 'tiket Aratu No Matsuri, beli tiket event Tulungagung, harga tiket Aratu, VIP pass Aratu'
})

useSchemaOrg([
  defineWebPage({
    name: 'Beli Tiket Aratu No Matsuri',
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Tickets', item: '/ticket' }
    ]
  })
])

const isSubmitting = ref(false)

const booking = reactive({
  name: '',
  phone: '',
  quantity: 1,
  type: 'REGULAR',
  proof: null
})

const proofPreview = ref(null)

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    booking.proof = file
    const reader = new FileReader()
    reader.onload = (e) => {
      proofPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const totalPrice = computed(() => {
  const prices = {
    'REGULAR': 25000,
    'VIP': 75000
  }
  return prices[booking.type] * booking.quantity
})

const incrementQty = () => {
  if (booking.quantity < 5) booking.quantity++
}

const decrementQty = () => {
  if (booking.quantity > 1) booking.quantity--
}

const handleSubmit = () => {
  isSubmitting.value = true
  setTimeout(() => {
    alert(`Terima kasih ${booking.name}! Pesanan ${booking.quantity}x ${booking.type} tiket telah diterima. Silakan cek WhatsApp untuk langkah selanjutnya.`)
    isSubmitting.value = false
  }, 1500)
}
</script>

<style scoped>
.ticket-page {
  min-height: 100vh;
  background-color: white;
}

.ticket-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 80px;
}

.ticket-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-title {
  display: flex;
  justify-content: center;
  gap: 15px;
  font-size: 4rem;
  margin-bottom: 20px;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.ticket-content {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

/* Form Styles */
.form-side {
  flex: 1.5;
  min-width: 350px;
}

.ticket-card-form {
  background: white;
  border: 5px solid var(--black-outline);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 12px 12px 0 var(--black-outline);
}

.form-title {
  font-family: 'Bangers';
  font-size: 2.2rem;
  margin-bottom: 30px;
  border-bottom: 4px dashed #eee;
  padding-bottom: 10px;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group label {
  font-family: 'Bangers';
  font-size: 1.3rem;
  color: var(--black-outline);
  letter-spacing: 1px;
}

.booking-form input, .ticket-select {
  padding: 15px 20px;
  border: 3px solid var(--black-outline);
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  outline: none;
  background: #fdfdfd;
}

.qty-control {
  display: flex;
  align-items: center;
  border: 3px solid var(--black-outline);
  border-radius: 12px;
  overflow: hidden;
  width: fit-content;
}

.qty-btn {
  background: var(--black-outline);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  font-weight: bold;
}

.qty-control input {
  border: none;
  width: 60px;
  text-align: center;
  font-family: 'Bangers';
  font-size: 1.5rem;
}

.form-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.total-section {
  background: #f1f5f9;
  padding: 20px;
  border-radius: 15px;
  border: 3px dashed var(--black-outline);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-weight: 800;
  color: #64748b;
}

.total-price {
  font-family: 'Bangers';
  font-size: 2.5rem;
  color: var(--red-no);
  -webkit-text-stroke: 1px var(--black-outline);
}

.submit-btn {
  width: 100%;
  margin-top: 10px;
}

/* Payment & Upload Styles */
.payment-section {
  text-align: center;
  margin-top: 10px;
}

.payment-title {
  font-family: 'Bangers';
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--blue-aratsu);
}

.qris-box {
  background: white;
  border: 3px solid var(--black-outline);
  border-radius: 15px;
  padding: 15px;
  display: inline-block;
  box-shadow: 4px 4px 0 var(--black-outline);
}

.qris-img {
  width: 200px;
  height: auto;
  display: block;
}

.qris-note {
  font-family: 'Bangers';
  font-size: 0.9rem;
  margin-top: 10px;
  letter-spacing: 1px;
}

.upload-box {
  position: relative;
  background: #f8fafc;
  border: 3px dashed var(--black-outline);
  border-radius: 12px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-box:hover {
  background: #f1f5f9;
}

.upload-box input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.upload-placeholder {
  text-align: center;
  color: #94a3b8;
}

.upload-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 5px;
}

.upload-placeholder p {
  font-weight: 800;
  font-size: 0.8rem;
}

.proof-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 1;
}

.upload-box.has-file {
  border-style: solid;
  border-color: var(--blue-aratsu);
}

.form-note {
  font-size: 0.8rem;
  color: #999;
  text-align: center;
  font-weight: bold;
}

/* Info Sidebar Styles */
.info-side {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-card {
  background: white;
  border: 4px solid var(--black-outline);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 8px 8px 0 var(--black-outline);
  position: relative;
}

.info-card.warning {
  background: var(--yellow-matsuri);
}

.info-title {
  font-family: 'Bangers';
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-item {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.info-icon {
  font-size: 1.5rem;
  background: #f1f5f9;
  padding: 10px;
  border-radius: 12px;
}

.info-text strong {
  display: block;
  font-family: 'Bangers';
  font-size: 1rem;
  letter-spacing: 1px;
}

.info-text p {
  color: #666;
  font-size: 0.9rem;
  margin: 5px 0 0 0;
  font-weight: bold;
}

.benefit-list {
  padding-left: 20px;
}

.benefit-list li {
  font-weight: 800;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.mini-mascot {
  position: absolute;
  bottom: -30px;
  right: -20px;
  width: 120px;
  filter: drop-shadow(4px 4px 0 var(--black-outline));
  animation: float 3s ease-in-out infinite;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  .form-row {
    flex-direction: column;
  }
  .qty-control {
    width: 100%;
  }
  .qty-control input {
    flex: 1;
  }
}
</style>
