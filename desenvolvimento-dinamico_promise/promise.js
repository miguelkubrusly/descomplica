function processarItem(numero) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (numero % 2 === 0) {
        resolve(`Item ${numero} é par.`);
      } else {
        reject(`Item ${numero} é impar.`);
      }
    }, 1000);
  });
}

function processarArray(array) {
  const promises = array
    .map((item) => processarItem(item).then((resultados) => resultados))
    .catch((erro) => erro);
    Promise.all(promises);
    return promises;
}


const arrayAleatorio = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(processarArray(arrayAleatorio));