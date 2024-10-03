function countPairs(socks) {
  const sockMap = {};
  let pairs = 0;

  //! Menghitung jumlah kaos kaki
  socks.forEach((sock) => {
    if (sockMap[sock]) {
      sockMap[sock]++;
    } else {
      sockMap[sock] = 1;
    }
  });

  //! Menghitung jumlah pasangan
  Object.keys(sockMap).forEach((sock) => {
    pairs += Math.floor(sockMap[sock] / 2);
  });

  return pairs;
}

//! Soal A
console.log(countPairs([10, 20, 20, 10, 10, 30, 50, 10, 20]));

//! Soal B
console.log(countPairs([6, 5, 2, 3, 5, 2, 2, 1, 1, 5, 1, 3, 3, 3, 5]));

//! Soal C
console.log(countPairs([1, 1, 3, 1, 2, 1, 3, 3, 3, 3]));
