var numerals: {
    [index: string]: string
} = {
  "-": "负",
  ".": "点",
  "0": "零",
  "1": "一",
  "2": "二",
  "3": "三",
  "4": "四",
  "5": "五",
  "6": "六",
  "7": "七",
  "8": "八",
  "9": "九",
  "10": "十",
  "100": "百",
  "1000": "千",
  "10000": "万",
};

function getDeletedOccurrences(character: string, value: string) {
  let isOccurence = false;
  let deletedOccurrences = "";

  for (const token of value.split("")) {
    if (!isOccurence || token !== character) {
      deletedOccurrences += token;
    }

    isOccurence = token === character;
  }

  return deletedOccurrences;
}

export default (number: number) => {
  let numberParts: string[] = String(number).split(".");
  let decimalPart: string = numberParts[1];

  if (decimalPart) {
    decimalPart = decimalPart
      .split("")
      .map((decimalDigit) => numerals[decimalDigit])
      .join("");
  }

  let sign = numberParts[0].startsWith("-") ? numerals["-"] : "";

  if (sign) {
    numberParts[0] = numberParts[0].substring(1);
  }

  let naturalPart = numerals[numberParts[0]] || "";

  if (
    naturalPart &&
    Math.abs(number) >= 100 &&
    (Math.abs(number) < 10 || Math.abs(number) > 19)
  ) {
    naturalPart = numerals["1"] + naturalPart;
  }

  if (!naturalPart) {
    // here comes the sun: number is not in numerals as is

    const powersOfTen = [...new Array(numberParts[0].length).keys()]
      .map((key) => 10 ** key)
      .reverse();

    naturalPart = getDeletedOccurrences(
      " ",
      numberParts[0]
        .split("")
        .map(
          (digit, index) =>
            (digit === "0" ? " " : numerals[digit]) +
            (powersOfTen[index] === 1 || digit === "0"
              ? ""
              : numerals[String(powersOfTen[index])])
        )
        .join("")
        .trim()
    ).replace(/ /g, numerals["0"]);

    if (Math.abs(number) >= 10 && Math.abs(number) <= 19) {
      naturalPart = naturalPart.substring(1);
    }
  }

  const chineseNumeral =
    sign + naturalPart + (decimalPart ? numerals["."] + decimalPart : "");

  return chineseNumeral;
}
