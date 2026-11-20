# situs-azikri

Halaman statis dua lembar: register riset 19 hipotesis yang semuanya tertutup, dan catatan cara angkanya didapat.

- `index.html` — hero, register 19 baris, grafik carry, kontak
- `catatan.html` — rantai 6 langkah, 4 koreksi, 3 instrumen
- `tokens.css` / `base.css` — token warna, huruf, dan reset; satu-satunya tempat nilai mentah
- `site.css` — seluruh gaya, nol literal warna

## Jalankan lokal

```bash
python -m http.server 8811     # lalu buka http://127.0.0.1:8811/
```

## Verifikasi

Empat gerbang, dua di antaranya tidak diserahkan ke penulis halaman:

```bash
node verify-render.mjs         # 9 lebar x 2 halaman: overflow, font, console, tangkapan layar
node measure-layout.mjs        # geometri: tinggi kepala, posisi CTA, jarak antar bagian
```

`verify-render.mjs` exit 1 kalau ada kotak yang melewati viewport **atau** console error.
Catatan penting: `scrollWidth` saja buta, karena induk ber-`overflow-x: clip` menahannya
di lebar layar sementara isinya terpotong. Gerbangnya memeriksa kotak terlebar, bukan gejalanya.

Gate tersembunyi (`C:\azhidden\accept.mjs`, 62 cek) dan mutation probe
(`C:\azhidden\mutate.mjs`, 16 mutasi) sengaja disimpan di luar repo: penulis halaman
tidak boleh melihat ukuran yang dipakai menilainya.
