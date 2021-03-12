import { cold } from 'jasmine-marbles';
import { of, from, EMPTY } from 'rxjs';

describe('COLD', () => {
  it('can search an alphabet', () => {
    const provided = search('e');
    const expected = cold('(e|)');
    expect(provided).toBeObservable(expected);
  });

  it('can return empty when no value found', () => {
    const provided = search('E');
    const expected = cold('|');
    expect(provided).toBeObservable(expected);
  });

  it('can search vowels', () => {
    const provided = searchVowels();
    const expected = cold('(aeiou|)');
    expect(provided).toBeObservable(expected);
  });
});

const alphabet = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

function search(val) {
  return alphabet.indexOf(val) > -1 ? of(`${val}`) : EMPTY;
}

function searchVowels() {
  const vowels = alphabet.filter(s =>
    ['a', 'e', 'i', 'o', 'u'].indexOf(s) > -1
  );
  return from(vowels);
}
