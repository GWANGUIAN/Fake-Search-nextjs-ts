/* eslint-disable no-useless-escape */
export default function filterAutoComplete(autoWord: string) {
  return autoWord.replace(/[^\w !#$%&()*+,./:;<=>?@^`{|}~가-힣\-]+/g, '');
}
