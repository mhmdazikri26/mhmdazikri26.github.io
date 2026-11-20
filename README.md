# situs-azikri

Register riset statis: sembilan belas hipotesis trading yang semuanya tertutup, plus catatan cara angkanya didapat.

**Live:** https://mhmdazikri26.github.io/

- `index.html` — hero, register 19 baris, grafik carry, kontak
- `catatan.html` — rantai 6 langkah, 4 koreksi, 3 instrumen
- `404.html` — halaman error; tautannya root-absolute karena disajikan untuk path apa pun
- `favicon.svg` — mark "A" dengan garis aksen di kaki, palet dari `tokens.css`
- `preview.png` — kartu preview 1200x630, di-render dari hero asli oleh `make-preview.mjs`
- `tokens.css` / `base.css` — token warna, huruf, dan reset; satu-satunya tempat nilai mentah
- `site.css` — seluruh gaya, nol literal warna

## Jalankan lokal

```bash
python -m http.server 8811     # lalu buka http://127.0.0.1:8811/
```

## Verifikasi

```bash
node verify-render.mjs         # 9 lebar x 3 halaman: overflow, font, console, tangkapan layar
node measure-layout.mjs        # geometri: tinggi kepala, posisi CTA, jarak antar bagian
node make-preview.mjs          # render ulang preview.png, assert 1200x630 persis
```

`verify-render.mjs` exit 1 kalau ada kotak yang melewati viewport **atau** console error.
Catatan penting: `scrollWidth` saja buta, karena induk ber-`overflow-x: clip` menahannya
di lebar layar sementara isinya terpotong. Gerbangnya memeriksa kotak terlebar, bukan gejalanya.

`make-preview.mjs` membaca ulang header IHDR berkas hasilnya. Ini perlu karena
`deviceScaleFactor: 2` pernah menghasilkan PNG 2400x1260 sementara meta `og:image`
menyatakan 1200x630, dan tidak ada gerbang lain yang menangkap ketidakcocokan itu.

`404.html` memakai tautan root-absolute (`/index.html`), bukan relatif. Halaman ini
disajikan GitHub Pages untuk path apa pun, jadi `index.html` biasa akan resolve
terhadap path yang salah.

Gate tersembunyi (`C:\azhidden\accept.mjs`, 62 cek) dan mutation probe
(`C:\azhidden\mutate.mjs`, 16 mutasi) sengaja disimpan di luar repo: penulis halaman
tidak boleh melihat ukuran yang dipakai menilainya.

## Deploy

Repo `mhmdazikri26/mhmdazikri26.github.io` adalah user site, jadi disajikan di root
domain tanpa subpath. Push ke `main` memicu build Pages otomatis. `.nojekyll` ada
supaya tidak difilter Jekyll.
