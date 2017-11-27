import KeyMapParser from '@/libs/key-map-parser';

describe('key-map-parser.js', () => {
  it('should output correct key char code arrays', () => {
    // Given
    const jsonString = `{
        "definitions": [
            {"[ctrl]": 17}, 
            {"k": 15},
            {"[enter]": 13}
        ],
        "shortcuts": [{
            "keys": ["[ctrl] k", "[enter]"],
            "description": "Just some key short cut"
        }]
    }`;
    const keyMapParser = new KeyMapParser();
    const expectedCharCodes = [[17, 15], [13]];

    // When
    const actualCharCodes = keyMapParser.parseFromString(jsonString);

    // Then
    expect(actualCharCodes).to.deep.equal(expectedCharCodes);
  });
});
