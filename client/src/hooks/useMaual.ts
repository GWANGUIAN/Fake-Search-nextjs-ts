import { useState } from 'react';

const useManual = () => {
  const localDate =
    localStorage.getItem('manualPopUpDate') || String(new Date());
  const lastDate = Date.parse(localDate);
  const NowDate = Date.parse(String(new Date()));
  const [isPopUpOpen, setIsPopUpOpen] = useState(lastDate <= NowDate);

  const setDate: () => void = () => {
    localStorage.setItem(
      'manualPopUpDate',
      String(new Date(new Date().setDate(new Date().getDate() + 7))),
    );
    setIsPopUpOpen(false);
  };

  return [isPopUpOpen, setDate];
};

export default useManual;
