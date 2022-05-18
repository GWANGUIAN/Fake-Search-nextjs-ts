export default function checkAutoComplete(autoWord: string) {
  const word = autoWord;
  // eslint-disable-next-line no-useless-escape
  const checkForm = new RegExp(/^[\w !#$%&()*+,./:;<=>?@^`{|}~가-힣\-]{1,16}$/);

  return word !== '' && checkForm.test(word);
}
