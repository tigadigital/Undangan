WEBSITE UNDANGAN PERNIKAHAN RAKHA & ENY V3

Isi paket:
1. index.html
2. style.css
3. script.js
4. guest-link-generator.html
5. google-apps-script-rsvp.gs
6. assets/images berisi foto, logo, QR, poster video, dan gambar preview WhatsApp
7. assets/video berisi video hero
8. assets/audio untuk musik opsional

FITUR V3 PERNIKAHAN:
- Luxury branding dengan monogram R&E
- Opening screen personal berdasarkan nama tamu dari URL
- Hero video elegan bertema wedding invitation
- Countdown menuju hari pernikahan
- Profil mempelai dan keluarga
- Doa dan restu pernikahan
- Timeline perjalanan pasangan
- Detail akad nikah, resepsi, lokasi, dress code, salin alamat, buka Google Maps, dan simpan ke Google Calendar
- Galeri foto modern dengan lightbox
- RSVP dan buku tamu digital
- Export RSVP ke CSV
- Google Sheet-ready melalui Apps Script
- Guest link generator untuk membuat link personal
- QR Code placeholder
- SEO dan preview WhatsApp menggunakan og-rakha-eny.jpg
- Mobile bottom navigation
- Tombol musik opsional

CARA EDIT DATA UTAMA:
Buka script.js, lalu ubah bagian CONFIG:
- eventDate untuk waktu akad nikah
- eventEndDate untuk perkiraan akhir acara
- locationName
- address
- mapUrl
- mapEmbedUrl
- googleSheetWebAppUrl

CARA EDIT TEKS DAN NAMA ORANG TUA:
Buka index.html, lalu cari teks dalam tanda kurung siku seperti:
[Nama Ayah Rakha]
[Nama Ibu Rakha]
[Nama Ayah Eny]
[Nama Ibu Eny]
[Nama Gedung atau Rumah]
[Alamat Lengkap Acara]

CARA EDIT JADWAL AKAD DAN RESEPSI:
Buka index.html, lalu cari bagian Detail Acara.
Ubah teks Akad Nikah dan Resepsi sesuai tanggal dan jam acara final.

CARA MEMAKAI LINK PERSONAL:
Buka guest-link-generator.html.
Masukkan domain website dan nama tamu.
Contoh hasil:
https://domainkamu.com/index.html?to=Bapak%20Andi%20dan%20Keluarga

CARA MENGAKTIFKAN RSVP GOOGLE SHEET:
1. Buat Google Sheet baru.
2. Buka Extensions > Apps Script.
3. Tempel isi file google-apps-script-rsvp.gs.
4. Deploy sebagai Web App.
5. Access pilih Anyone.
6. Salin URL Web App.
7. Tempel URL tersebut ke googleSheetWebAppUrl di script.js.

CARA MENAMBAHKAN MUSIK:
Masukkan file musik berformat MP3 ke:
assets/audio/music.mp3

Catatan:
Gunakan musik yang memiliki izin atau bebas lisensi.

CARA MENGGANTI QR CODE:
QR saat ini mengarah ke domain contoh.
Setelah website online, buat QR baru untuk domain final, lalu ganti file:
assets/images/qr-undangan.png

CARA HOSTING CEPAT:
- Bisa upload folder ini ke Netlify, Vercel, GitHub Pages, atau hosting biasa.
- Pastikan struktur folder tidak berubah.


UPDATE SEO DOMAIN:
Domain utama sudah diatur ke:
https://tigadigital.github.io/Undangan/

SEO TITLE:
Undangan Pernikahan Rakha & Eny | Wedding Invitation Digital

META DESCRIPTION:
Undangan pernikahan digital Rakha & Eny. Temukan kisah cinta, detail akad dan resepsi, galeri momen, lokasi acara, serta RSVP online dalam satu undangan elegan.

OPEN GRAPH / WHATSAPP DESCRIPTION:
Dengan penuh rasa syukur, Rakha & Eny mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari pernikahan kami.

GAMBAR PREVIEW SEO:
assets/images/og-rakha-eny.jpg
Ukuran: 1200 x 630 px
Dipakai untuk preview WhatsApp, Facebook, X/Twitter, dan link sharing.

FILE SEO TAMBAHAN:
- robots.txt
- sitemap.xml
- site.webmanifest
- SEO-DESKRIPSI.txt

CATATAN GITHUB PAGES:
Upload isi folder ke repository GitHub Pages dengan path /Undangan/.
Pastikan file index.html berada langsung di root folder Undangan.
Setelah online, buka:
https://tigadigital.github.io/Undangan/
