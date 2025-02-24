export function convertToArabicNumbers(number: number | string): string {
  const latinToArabic: Record<string, string> = {
    "0": "٠",
    "1": "١",
    "2": "٢",
    "3": "٣",
    "4": "٤",
    "5": "٥",
    "6": "٦",
    "7": "٧",
    "8": "٨",
    "9": "٩",
  };

  return number.toString().replace(/\d/g, (digit) => latinToArabic[digit]);
}

export function convertArabicToLatin(number: number | string): string {
  const arabicNumbers: Record<string, string> = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };

  return number.toString().replace(/[٠-٩]/g, (digit) => arabicNumbers[digit]);
}
