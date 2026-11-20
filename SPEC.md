# SPEC — situs pribadi Muhammad Azikri Irfan Fauzi

Tugas: satu halaman HTML+CSS statis. Bukan landing page startup. Ini **register riset**:
catatan publik dari 19 hipotesis trading yang semuanya sudah ditutup, lengkap dengan angka
yang membunuh masing-masing, plus bagian koreksi tempat penulis menangkap bug-nya sendiri.

Baca seluruh spec ini. JANGAN mengarang fakta, angka, kutipan, testimoni, atau logo.
Semua angka di bawah adalah data nyata dari repo `~/fxlab` dan harus ditulis persis.
Jangan menambah angka yang tidak ada di spec ini.

---

## 1. Berkas yang harus dibuat

Buat **dua** berkas di folder ini:

- `index.html`
- `site.css`

`site.css` WAJIB dimulai dengan `@import url("./tokens.css");` lalu `@import url("./base.css");`
di dua baris pertama setelah blok komentar stamp. Jangan menulis ulang isi `tokens.css` atau
`base.css`; jangan mengubah berkas itu. Semua warna dan font HARUS lewat token `var(--color-*)`
dan `var(--font-*)` yang sudah didefinisikan. Nol literal warna di `site.css`
(tidak ada `#hex`, tidak ada `rgb()`, tidak ada `oklch()` di luar `tokens.css`).

Kelas-kelas dari `base.css` sudah ada: `.container`, `.num`, `.visually-hidden`, `.figure`.

---

## 2. Blok komentar stamp (WAJIB, baris pertama site.css)

Tulis persis, jangan diubah:

```css
/* Hallmark · shape: Register · genre: editorial · theme: custom · job: read the record · idea: "Satu register publik berisi sembilan belas hipotesis yang semuanya tertutup, dijaga seketat klaim yang berhasil." · vibe: "audit paper, koreksi merah, angka rata desimal"
 * paper: oklch(96.4% 0.005 255) · accent: oklch(48% 0.170 27) · display: Literata · body: Public Sans · hero: headline kiri, blok tally 19/19 di kanan sebagai lembar bersheet, tanpa foto · nav: satu baris hairline, wordmark kiri, tanggal entri terakhir dan satu tautan di kanan · footer: kolofon provenance, bukan empat kolom tautan · imagery: tanpa foto, tipe dan angka yang membawa halaman · signature: tabel 19 baris yang bisa dibaca, dengan tanda koreksi merah pada baris yang pernah salah
 * axes: light/roman-serif/warm · posture: Committed · contrast: pass · fold: pass · v2.0.0 */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R4 V5 · weakest: R, godaan menaruh grafik di dua tempat; grafik carry hanya muncul sekali, di bagian 4 */
```

---

## 3. Token yang harus dipakai (sudah ada di tokens.css — pakai, jangan bikin baru)

Paper/ink (cool slate, hue 255, chroma rendah tapi tidak nol):

- `--color-paper` `oklch(96.4% 0.005 255)`
- `--color-paper-2` `oklch(92.8% 0.008 255)`
- `--color-paper-3` `oklch(88.5% 0.010 255)`
- `--color-ink` `oklch(19% 0.020 255)`
- `--color-ink-2` `oklch(30% 0.016 255)`
- `--color-muted` `oklch(45% 0.014 255)`
- `--color-rule` `oklch(78% 0.010 255)`
- `--color-rule-2` `oklch(34% 0.018 255)`
- `--color-accent` `oklch(48% 0.170 27)`
- `--color-accent-2` `oklch(41% 0.155 27)`
- `--color-accent-ink` `oklch(98% 0.004 255)`
- `--color-focus` `oklch(48% 0.170 27)`

Font:

- `--font-display: "Literata", ui-serif, Georgia, serif;`
- `--font-body: "Public Sans", ui-sans-serif, system-ui, sans-serif;`
- `--font-outlier: "DM Mono", ui-monospace, monospace;`

Tautan font di `<head>` (satu baris, persis):

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&family=Public+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

Aturan pakai huruf:
- Head semua `--font-display` Literata 600, sentence case, roman. Tidak ada satu kata miring
  di dalam head. Tidak ada satu kata berwarna di dalam head.
- Prosa `--font-body` Public Sans 400, 17px ke atas, line-height 1.6, `max-width: 65ch`.
- Label, caption, kepala tabel, nav: **Public Sans**, satu step lebih kecil, sentence case,
  TIDAK uppercase, TIDAK letter-spacing. Ini harga mati.
- Angka yang dibandingkan: `--font-outlier` DM Mono, `font-variant-numeric: tabular-nums`,
  rata kanan di kolom. Mono HANYA untuk angka dan nama berkas/kode, bukan label.

---

## 4. Aturan permukaan

- Sudut kotak: 0 di semua tempat. Radius maksimal 2px di kontrol.
- Tanpa kartu, tanpa drop shadow, tanpa border-radius besar, tanpa gradient.
  Kedalaman = satu step kertas (`--color-paper-2`) dan dua ketebalan garis:
  hairline 1px `--color-rule` memisah baris, garis 2px `--color-rule-2` di bawah kepala tabel.
- Aksen merah (`--color-accent`) maksimal ~4% dari satu layar. Hanya di: satu tombol utama,
  garis bawah tautan, tanda koreksi di empat baris, dan satu seri grafik.
- Tanpa tekstur, tanpa pola, tanpa ilustrasi SVG, tanpa ikon dekoratif.

---

## 5. Struktur halaman, urut. Copy ini VERBATIM, jangan diparafrase.

### Navigasi (satu baris, hairline bawah, tidak sticky)

- Kiri: wordmark teks `Azikri` (Literata 600, 20px, boleh satu-satunya teks kapital di halaman).
- Kanan, satu baris: `Entri terakhir 17 Nov 2026` (Public Sans 13px, `--color-muted`) lalu
  tautan `Ledger`, `Metode`, `Koreksi`, `Kontak`.
- Jangan ada tombol di kanan nav.

### 1. Hero

Dua kolom di 1280px ke atas: kiri 7 kolom teks, kanan 5 kolom lembar tally.
Semua elemen hero WAJIB kelihatan di 1280x800 tanpa scroll.

Kiri:
- h1: `Sembilan belas hipotesis, sembilan belas tertutup.`
- Satu kalimat: `Catatan riset dari Cibiru: yang diuji, apa yang membunuhnya, dan angkanya.`
- Satu tombol utama (merah penuh, teks `--color-accent-ink`): `Baca ledgernya` → `#ledger`

Kanan (lembar tally, `background: var(--color-paper-2)`, garis 2px `--color-rule-2` di atasnya,
padding 28px, tanpa radius):
- Angka besar `19 / 19` dalam DM Mono 500, ~56px, `--color-ink`, dengan label kecil di bawahnya
  `hipotesis diuji, semuanya tertutup` (Public Sans 13px, `--color-muted`).
- Lalu empat baris angka. Tiap baris: nama di kiri (Public Sans 14px), angka di kanan
  (DM Mono 500, rata kanan). Garis hairline di antara baris.

  | nama | angka |
  |---|---|
  | tidak ada edge | 14 |
  | signifikan negatif | 2 |
  | edge nyata, terkikis | 2 |
  | edge nyata, biaya mematikan | 1 |

- Di bawah lembar, satu baris sumber (Public Sans 12px, `--color-muted`):
  `docs/KEPUTUSAN.md · 17 November 2026`
  Tulis sebagai teks biasa, bukan tautan.

### 2. Ledger — `<section id="ledger">`

Kepala bagian (h2, Literata 600, `--text-section`): `Register`
Satu kalimat di bawahnya: `Setiap baris pernah jadi kandidat. Kolom terakhir adalah yang membunuhnya.`

Tabel penuh, 19 baris data, garis 2px di bawah kepala tabel, hairline antar baris,
kolom angka rata kanan dalam DM Mono. Kolom: `Hipotesis` · `Kelas` · `Angka kunci` · `Putusan`.
Isi PERSIS:

| Hipotesis | Kelas | Angka kunci | Putusan |
|---|---|---|---|
| SMC, sembilan konsep | sinyal | z −3,23 · 5 tahun · 4/4 pair negatif | tidak ada edge |
| Confidence score menyaring trade | sinyal | r ≈ 0, kuintil terbalik | tidak ada edge |
| Session filter, hindari sesi Asia | sinyal | loss turun, edge tidak bertambah | tidak ada edge |
| Time stop memperbaiki hasil | eksekusi | hasil justru memburuk | tidak ada edge |
| Multi-TF confluence 1H + 5m | sinyal | 11 varian gugur | tidak ada edge |
| Elliott Wave, tiga aturan wajib | sinyal | 6,3% lolos vs 7,8% random walk | tidak ada edge |
| Elliott Wave, rasio Fibonacci | sinyal | 0 dari 42 kombinasi konsisten | tidak ada edge |
| Elliott Wave, entry wave-3 | sinyal | E[R] −0,036 · t −0,52 | tidak ada edge |
| SNR multi-touch, minimal tiga sentuhan | sinyal | E[R] +0,021 · t +0,29 · drop XAUUSD → −0,053 | tidak ada edge |
| SNR session week | sinyal | E[R] −0,002 · t −0,04 | tidak ada edge |
| SND order block, dua resolusi | sinyal | D1 −0,059 · 1H −0,2077 ATR | tidak ada edge |
| Regime volatilitas ATR 1H | sinyal | spread 4,9 pp vs null 11,3 pp | tidak ada edge |
| Hour-of-day, fix flow | sinyal | gross +0,75 pip vs biaya 1,5 pip | tidak ada edge |
| Momentum cross-sectional G10 | sinyal | Sharpe −0,98 · 2/13 tahun positif | tidak ada edge |
| D1 trend EMA 15/40, portofolio 23 pair | sinyal | E[R] −0,1422 · t −3,93 · n 1.946 · CI seluruhnya di bawah nol | signifikan negatif |
| SNR session extreme, harian | sinyal | E[R] −0,1181 · t −2,22 · maxDD 87,8R | signifikan negatif |
| Carry funding BTC, long spot short perp | biaya | +9,53%/yr penuh → +3,03%/yr dua tahun terakhir | edge terkikis |
| Carry altcoin, enam aset | biaya | +6,53%/yr → +1,08%/yr, 0,92 pp di bawah kas | edge terkikis |
| Funding dispersion long-short | biaya | z +30,84 nyata · biaya 1.573,92% · net −245,66%/yr | biaya mematikan |

Kolom `Putusan` untuk baris **D1 trend EMA 15/40** dan **SNR session extreme, harian**
mendapat tanda koreksi merah: satu garis bawah 2px `--color-accent` di bawah teks putusannya,
plus `color: var(--color-accent)` pada teks putusan kedua baris itu. Tidak ada baris lain
yang berwarna.

Di bawah tabel satu baris kecil (Public Sans 13px, `--color-muted`):
`Angka bisa diperiksa sendiri di docs/ dan scripts/ ../fxlab: 20 dokumen, 6 pra-registrasi, 71 skrip.`
(Jangan jadikan folder itu tautan publik.)

### 3. Metode — `<section id="metode">`

h2: `Rantai pengukuran`
Satu kalimat: `Satu hipotesis baru dihitung setelah enam langkah ini lolos, bukan sebelumnya.`

Enam langkah, disusun sebagai daftar bernomor dua kolom dengan hairline di antara baris —
BUKAN tiga kartu, BUKAN ikon. Nomor dalam DM Mono 500, judul langkah Public Sans 600,
penjelasan satu baris Public Sans 400 `--color-ink-2`.

1. `Pra-registrasi` — `Ambang, kriteria, dan arah ditulis sebelum hasilnya dilihat.`
2. `Null shuffle` — `Distribusi acak dibangun ulang, lalu hasil asli diletakkan di persentilnya.`
3. `Drop-one` — `Satu pair, satu tahun, satu aset dibuang bergiliran; kalau edge hilang, itu artefak.`
4. `Interval bootstrap` — `Kalau selang kepercayaan melewati nol, klaimnya belum ada.`
5. `Model biaya` — `Spread, komisi, dan slippage masuk sebagai angka, bukan sebagai catatan kaki.`
6. `Mutation test` — `Skrip verifikasi dimutasi; kalau tetap lolos, berarti skripnya yang tidak menggigit.`

Berkas nyata di footer bagian ini, DM Mono 13px `--color-muted`, satu baris:
`docs/PREREG_*.md · scripts/verify_*.sh · scripts/mutate_*.sh`

### 4. Yang sempat nyata — `<section id="carry">`

h2: `Satu yang benar-benar bekerja, lalu habis`
Satu kalimat: `Carry funding BTC menghasilkan uang sungguhan sampai kompetisi memerasnya.`

Grafik: satu seri, garis 2px `--color-accent`, sumbu dan label dalam DM Mono 12px,
lebar penuh kontainer (12 kolom), tinggi ~320px. SVG tulisan tangan atau `<svg>` inline
dengan `role="img"` dan `aria-label` yang menyebut isinya. Sumbu-x tahun 2020–2026,
sumbu-y %/yr. Titik data PERSIS:

| tahun | %/yr |
|---|---|
| 2020 | +17,19 |
| 2021 | +30,61 |
| 2022 | +4,16 |
| 2023 | +7,87 |
| 2024 | +11,92 |
| 2025 | +5,13 |
| 2026 | +3,12 |

Tambahkan **satu** garis horizontal putus-putus `--color-muted` di 2,00 berlabel `kas 2,00`.
Setiap titik diberi label angkanya dalam DM Mono 12px di atas titik. Aksen merah HANYA
pada seri ini di seluruh halaman, plus tanda koreksi di tabel ledger dan satu tombol hero.

Di sebelah kanan atau di bawah grafik, blok empat baris angka (rata kanan, DM Mono):

| keterangan | angka |
|---|---|
| sampel penuh 2020–2026 | +9,53%/yr |
| Sharpe sampel penuh | +6,08 |
| dua tahun terakhir | +3,03%/yr |
| di atas kas | +1,03 pp |

Caption di bawah grafik (Public Sans 13px, `--color-muted`):
`Sumber: docs/CARRY_FUNDING.md. Decay ini kompetisi, bukan nasib buruk.`

### 5. Koreksi — `<section id="koreksi">`

h2: `Empat kali catatan ini salah, dan apa yang menangkapnya`
Satu kalimat: `Bagian ini yang membuat sisa halaman bisa dipercaya.`

Empat entri, masing-masing satu blok dengan garis 2px `--color-rule-2` di atas, tanpa kartu.
Format tiap entri: judul (Public Sans 600, `--text-title`), lalu dua angka berdampingan
(DM Mono, kiri `--color-muted` dengan label `tercatat`, kanan `--color-ink` dengan label
`setelah diperiksa`), lalu satu kalimat penjelas. Entri yang angkanya berubah drastis
mendapat tanda koreksi merah: SATU garis bawah 2px `--color-accent` di bawah angka
`setelah diperiksa`, tidak lebih.

1. `SNR session week, lookahead`
   - tercatat `+0,466 · t +6,12 · 9/9 kriteria lolos`
   - setelah diperiksa `−0,002 · t −0,04`
   - `Sinyal masa depan bocor ke dalam hitungan. Versi yang benar tidak menyisakan apa pun.`
2. `Funding rate crypto, replikasi palsu`
   - tercatat `|t| 3,06`
   - setelah diperiksa `|t| 1,77`
   - `Tiga settlement 8 jam berbagi satu harga penutup harian, jadi n digelembungkan tiga kali.`
3. `Funding dispersion, P&L memakai angka yang sama dengan pemilih`
   - tercatat `z +62`
   - setelah diperiksa `z +30,84`
   - `P&L dihitung dari rate yang juga dipakai memilih aset. Setelah dipisah, sinyalnya tetap nyata tapi biayanya 20 kali gross.`
4. `D1 trend EMA 15/40, sampel kecil`
   - tercatat `E[R] +0,221`
   - setelah diperiksa `E[R] −0,1422 · t −3,93`
   - `n delapan kali lebih besar membalik tandanya. Angka positif pertama itu noise.`

### 6. Instrumen lain — `<section id="instrumen">`

h2: `Di luar ledger`
Satu kalimat: `Alat yang dipakai sehari-hari, dengan angka yang sama telanjangnya.`

Tiga baris panjang dengan hairline, tiap baris: nama alat (Public Sans 600) di kolom kiri,
fakta terukur di kolom kanan (Public Sans 400, angka dalam DM Mono). Jangan pakai kartu.

1. `Android, adb dan scrcpy` — `Satu perangkat dikendalikan penuh dari desktop. Wireless debugging mati setiap reboot, jadi satu ketukan manual per sesi.`
2. `cert-hunter` — `Bot pencari program sertifikat gratis. Sumber subur ternyata webinar dan kanal Telegram, bukan platform kursus.`
3. `Hermes, agen terminal` — `Riset dan build dijalankan agen dengan gate tersembunyi; laporan agen diperiksa ulang, bukan dipercaya.`

### 7. Penutup — `<section id="kontak">`

Satu blok, bukan band berlangganan, bukan form. Tanpa kolom email.

- Kalimat besar (Literata 600, `--text-display-s`): `Kalau ada data yang mau diuji, itu yang paling menarik.`
- Satu kalimat: `Muhammad Azikri Irfan Fauzi, Sistem Informasi UKRI, Cibiru, Bandung.`
- Satu tautan aksi, gaya tombol outline (garis 1px `--color-ink`, teks `--color-ink`):
  `mhmdazikri26 di GitHub` → `https://github.com/mhmdazikri26`, `rel="noopener"`.

### Footer (kolofon, BUKAN empat kolom tautan)

Garis 2px di atas. Satu paragraf pendek (Public Sans 13px, `--color-muted`, max 65ch):
`Halaman ini disusun dari catatan yang tersimpan di folder fxlab: 20 dokumen, 6 pra-registrasi, 71 skrip, 19 hipotesis tertutup. Tidak ada angka di halaman ini yang tidak ada di berkas sumbernya.`

Lalu satu baris: `Cibiru, Bandung · 2026` dan tautan kecil `Kembali ke atas` → `#top`.
Tidak ada "All rights reserved", tidak ada baris ikon sosial, tidak ada kolom tautan.

---

## 6. Larangan keras (kalau dilanggar, hasilnya ditolak)

1. Jangan ada `#fff`, `#000`, `white`, `black`, atau nilai warna literal apa pun di `site.css`.
2. Jangan ada `transition: all`. Jangan animasi `width`, `height`, `top`, `left`.
   Hanya `transform` dan `opacity` dan `color`/`background-color`/`border-color`.
3. Jangan ada gradient. Jangan ada `background-clip: text`.
4. Jangan ada teks uppercase atau `text-transform: uppercase` atau `letter-spacing`
   lebih dari `0.03em` pada teks di bawah 15px. Pengecualian hanya wordmark `Azikri`.
5. Jangan ada eyebrow: teks pendek di atas heading yang cuma menamai heading itu.
   (Label kolom tabel `<th>` boleh; `<th>` bukan eyebrow.)
6. Jangan ada titik tengah `·` sebagai pemisah meta di teks paragraf, jangan ada panah
   `→` yang ditempel ke teks tautan atau tombol, jangan ada titik status dekoratif.
   Titik tengah HANYA boleh di dalam sel tabel `Angka kunci` dan di footer kolofon.
7. Jangan ada emoji sebagai ikon. Jangan ada ikon sama sekali.
8. Jangan ada form, input, atau tanda terima kasih palsu.
9. Jangan ada foto, ilustrasi, `<img>`, atau `data-slot`. Halaman ini tipe dan angka.
10. Jangan ada `100vw`. `overflow-x: clip` sudah ada di base.css, jangan diubah.
11. Jangan ada hero dengan tinggi `vh`; kalau perlu tinggi, pakai `dvh` atau `svh`.
12. Setiap elemen yang bisa diklik WAJIB punya `:focus-visible` yang muncul instan
    (base.css sudah punya default; jangan hapus `outline` tanpa pengganti).
13. Jangan ada `opacity: 0` yang menunggu JavaScript untuk menampilkan konten.
    Semua konten terlihat tanpa JavaScript. Halaman ini boleh tanpa JavaScript sama sekali.
14. Kontainer: pakai `.container` dari base.css, maksimal 1440px. Jangan menambah kolom
    grid saat lebar naik.
15. Jangan ada heading level yang dilompati (h1 → h2 → h3).
16. `lang="id"` di `<html>`, `<title>`, dan `<meta name="description">` wajib ada.
17. Jangan ada kartu di dalam kartu. Jangan ada shadow.
18. Jarak antar bagian minimal 120px di 1440 (boleh turun ke 72px di mobile lewat token
    `--section-gap*`). Variasikan: jangan semua bagian dipisah dengan cara yang sama persis.

## 7. Anggaran kata

Maksimal ~80 kata terlihat per layar 900px di 1440. Hero: head, satu kalimat, satu tombol,
plus lembar tally. Bagian lain: kepala + satu kalimat + komposisinya (tabel/grafik/daftar).
Jangan menulis paragraf lebih dari tiga kalimat di mana pun.

## 8. Responsif

- 320px sampai 1920px tanpa scroll horizontal.
- Di bawah 860px tabel ledger boleh jadi daftar bertumpuk, tapi kolom `Angka kunci` dan
  `Putusan` harus tetap terbaca (jangan disembunyikan). Grafik mengecil, label tetap ada.
- `minmax(0, 1fr)` untuk setiap track grid yang berisi gambar atau tabel.
- Head tidak boleh tumpah: `overflow-wrap: break-word; min-width: 0` sudah ada di base.css.

## 9. Hasil yang harus dilaporkan

Setelah selesai, laporkan blok ini dengan output AKTUAL, bukan klaim:

```
files:     index.html, site.css (+ baris total masing-masing)
sections:  jumlah <section> dan id-nya
ledger:    jumlah <tr> data di tabel ledger (harus 19)
chart:     jumlah titik data di grafik carry (harus 7) + nilai sumbu-y
colors:    jumlah literal warna di site.css (harus 0)
gates:     hal yang kamu ragu lolos, sebutkan
```

Jangan menulis apa pun di luar `index.html` dan `site.css`. Jangan menyentuh `tokens.css`,
`base.css`, `SPEC.md`, atau folder `.hallmark`.
