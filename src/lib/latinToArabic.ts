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
