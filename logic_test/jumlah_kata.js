function countWords(sentence) {
  //! Memecah kalimat menjadi array kata berdasarkan spasi
  const words = sentence.split(" ");

  //! Cek kata menggunakan regex
  //! 1. kata tidak mengandung karakter spesial
  //! 2. hanya berisi huruf dan tanda baca di akhir kata
  //! 3. mengizinkan tanda hubung (-)
  const validWords = words.filter((word) => /^[a-zA-Z-]+[,.!?]?$/.test(word));

  //! Mengembalikan jumlah kata yang valid
  return validWords.length;
}

//! Soal A
console.log(countWords("Saat meng*ecat tembok, Agung dib_antu oleh Raihan."));

//! Soal B
console.log(countWords("Berapa u(mur minimal[ untuk !mengurus ktp?"));

//! Soal C
console.log(
  countWords("Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda.")
);
