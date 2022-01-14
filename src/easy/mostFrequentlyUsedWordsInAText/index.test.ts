import mostFrequentlyUsedWordsInAText from ".";

test("Top three words are as expected", () => {
  expect(mostFrequentlyUsedWordsInAText("a a a  b  c c  d d d d  e e e e e")).toEqual(["e", "d", "a"]);

  expect(mostFrequentlyUsedWordsInAText("a a c b b")).toEqual(["a", "b", "c"]);

  expect(
    mostFrequentlyUsedWordsInAText(
      "e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e"
    )
  ).toEqual(["e", "ddd", "aa"]);

  expect(mostFrequentlyUsedWordsInAText("  //wont won't won't ")).toEqual([
    "won't",
    "wont",
  ]);

  expect(mostFrequentlyUsedWordsInAText("  , e   .. ")).toEqual(["e"]);

  expect(mostFrequentlyUsedWordsInAText("  ...  ")).toEqual([]);

  expect(mostFrequentlyUsedWordsInAText("  '  ")).toEqual([]);

  expect(
    mostFrequentlyUsedWordsInAText(`In a village of La Mancha, the name of which I have no desire to call to
  mind, there lived not long since one of those gentlemen that keep a lance
  in the lance-rack, an old buckler, a lean hack, and a greyhound for
  coursing. An olla of rather more beef than mutton, a salad on most
  nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
  on Sundays, made away with three-quarters of his income.`)
  ).toEqual(["a", "of", "on"]);
});
