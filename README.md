# Sadarin

**Sadarin** adalah aplikasi mobile edukatif berbasis AI yang bertujuan untuk meningkatkan kesadaran masyarakat terhadap bahaya judi online dan pentingnya menjaga kesehatan mental. Aplikasi ini dilengkapi dengan chatbot interaktif, mood tracker harian, tips harian, video edukatif, artikel, serta fitur peringatan berbasis kisah nyata dari korban judi online.

## 📱 Fitur Utama

### 🤖 Chatbot Edukatif Berbasis AI

- Chatbot interaktif berbasis Azure Language Understanding (CLU).
- Memberikan edukasi seputar bahaya judi online dan tips menjaga kesehatan mental.
- Menyediakan saran pertanyaan (suggested intents) dan tombol reset chat.
- Backend dibangun dengan Node.js (Express) dan dideploy ke Azure App Service.

### 📊 Pelacak Suasana Hati (Mood Tracker)

- Pengguna dapat memilih dan melaporkan suasana hati harian (senang, baik, biasa, sedih, marah).
- Tersedia notifikasi pengingat harian untuk mengisi mood.
- Data disimpan dan divisualisasikan dalam bentuk grafik.

### 📈 Visualisasi Mood Harian dan Rata-Rata

- Statistik emosi ditampilkan secara interaktif melalui grafik.
- Membantu pengguna memahami tren kesehatan mental mereka.

### 🔒 Autentikasi Firebase

- Sistem login dan registrasi aman menggunakan Firebase Authentication.
- Mendukung login via email dan password.

### 🎞️ Video Edukasi (Format Reels)

- Menyediakan video pendek seperti reels seputar kesehatan mental dan bahaya judi online.
- Konten dapat di-scroll secara vertikal.

### 📰 Artikel Edukatif & Bookmark

- Menyajikan artikel dari API eksternal tentang topik mental health dan judi online.
- Artikel dapat disimpan (bookmark) ke local storage untuk akses offline.

### 🌱 Tips Harian

- Menampilkan tips dan kutipan positif setiap hari untuk menjaga semangat pengguna.
- Tips disimpan secara lokal untuk menjamin ketersediaan offline.

### ⚠️ Waspada Judi Online

- Menampilkan kisah nyata dari individu yang pernah menjadi korban judi online.
- Meningkatkan kesadaran akan dampak negatif yang nyata dan emosional.

### 👤 Profil & Pengaturan

- Pengguna dapat melihat dan mengedit profil.
- Menampilkan skala rata-rata suasana hati.
- Fitur pengaturan termasuk sunting profil, ubah kata sandi, artikel tersimpan, dan logout.
- Menu “Tentang” menjelaskan aplikasi secara singkat dan mencantumkan tautan GitHub.

## 🚀 Teknologi yang Digunakan

| Komponen       | Teknologi                          |
| -------------- | ---------------------------------- |
| Frontend       | React Native (Expo)                |
| Backend        | Node.js (Express)                  |
| AI             | Azure Language Understanding (CLU) |
| Auth           | Firebase Authentication            |
| API            | Artikel dan konten eksternal       |
| Deploy Backend | Azure App Service                  |
| Data Lokal     | Local Storage (Bookmark, Tips)     |
| Visualisasi    | Chart (untuk mood tracker)         |

## 🧭 Alur Penggunaan Aplikasi

1. **Onboarding** – Slide pengenalan aplikasi.
2. **Login / Sign Up** – Autentikasi via email & password.
   - Demo credential:
     - Email: `sadarin123@example.com`
     - Password: `123456`
3. **Banner Slider** – Menampilkan larangan judi online.
4. **Notifikasi Mood** – Toast muncul jika mood hari ini belum diisi.
5. **Mood Tracker** – Pilih emotikon suasana hati hari ini → data masuk ke grafik.
6. **Chatbot Edukasi** – Ketik pertanyaan, pilih dari suggestion, dapatkan jawaban informatif dan empatik.
7. **Tips Harian** – Lihat kutipan motivasi tiap hari.
8. **Tonton Video** – Scroll video edukatif ala reels.
9. **Baca Artikel** – Artikel terkini dan dapat disimpan.
10. **Waspada Judi Online** – Cerita nyata korban judi.
11. **Profil & Pengaturan** – Edit profil, lihat skala mood, ubah password, artikel tersimpan, logout.

## 🔗 Link Prototipe / APK

- [Unduh APK via Google Drive](https://drive.google.com/file/d/1U-iRZQ7MTch7dd2Fr4yjGcyoCPKP5EO-/view?usp=drivesdk)

## ⚙️ Konfigurasi Firebase

Untuk alasan keamanan, file `firebaseConfig.js` yang berisi informasi sensitif **tidak disertakan** dalam repository dan telah dimasukkan ke dalam `.gitignore`.

Sebagai gantinya, tersedia file `firebaseConfigExample.js` sebagai panduan. Silakan salin dan ubah menjadi `firebaseConfig.js`, lalu isi dengan konfigurasi Firebase milikmu sendiri.

### Langkah-langkah:

1. Salin `firebaseConfigExample.js` → ubah nama jadi `firebaseConfig.js`
2. Ganti semua placeholder berikut dengan data asli dari Firebase Console:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

─ README.md
```
