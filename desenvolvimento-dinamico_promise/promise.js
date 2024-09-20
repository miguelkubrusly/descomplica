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
    .map((item) => processarItem(item))
    
    Promise.all(promises).then((resultados) => {
      console.log(resultados);
    }).catch((erro) => {
      console.log(erro);
    });
}


const arrayAleatorio = [4, 6, 8, 10, 14, 16];
processarArray(arrayAleatorio);