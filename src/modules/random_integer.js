// не поправлено
// проверить нужел ли
function randomInteger(min = 0, max = 0) {
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  
  rand = Math.round(rand);
  
  return rand;
}

export default randomInteger;