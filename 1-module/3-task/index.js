function ucFirst(str) {
  if (typeof str) {
    str = str.toLowerCase();
  } else {
    return null;
  }
  
  if (typeof str === 'string') {
    str = str.trim();
    str = str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  return str;
}
