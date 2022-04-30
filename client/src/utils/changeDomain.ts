export default function changeDomain(domain: string) {
  const word = domain.slice(0, 1);
  const checkEng = new RegExp(/^[A-Za-z]$/);
  const f = [
    'G',
    'G',
    'N',
    'D',
    'D',
    'R',
    'M',
    'B',
    'B',
    'S',
    'S',
    'ㅇ',
    'J',
    'J',
    'C',
    'K',
    'T',
    'F',
    'H',
  ];
  const s = [
    'A',
    'A',
    'Y',
    'Y',
    'E',
    'E',
    'Y',
    'Y',
    'O',
    'W',
    'W',
    'W',
    'Y',
    'W',
    'W',
    'W',
    'W',
    'Y',
    'E',
    'U',
    'I',
  ];
  const ga = 44_032;
  let uni = word.charCodeAt(0);
  uni = uni - ga;
  const fn = Number.parseInt(String(uni / 588), 10);
  const sn = Number.parseInt(String((uni - fn * 588) / 28), 10);

  if (checkEng.test(word)) {
    return word.toUpperCase();
  } else if (f[fn] !== 'ㅇ') {
    return f[fn];
  }

  return s[sn];
}
