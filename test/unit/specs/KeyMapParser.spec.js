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
    // const expectedValue = [
    //   {
    //     codes: [[17, 75], [13]],
    //     description: 'Keep file open in editor.',
    //   },
    // ];

    // When
    const shortcuts = keyMapParser.parseFromString(jsonString);

    // Then
    expect(shortcuts).to.deep.equal([[17, 15], [13]]); // TODO mike. Fix test and functionality.
  });
});
