import KeyMapParser from '@/libs/key-map-parser';

describe('key-map-parser.js', () => {
  it('should output correct key char code arrays', () => {
    // Given
    const jsonString = `{
        "definitions": [
            {"[ctrl]": 17},
            {"[enter]": 13}
        ],
        "shortcuts": [{
            "keys": ["[ctrl] k", "[enter]"],
            "description": "Just some key short cut"
        }]
    }`;
    const keyMapParser = new KeyMapParser();
    const expectedCharCodes = [[17, 107], [13]];

    // When
    const actual = keyMapParser.parseFromString(jsonString);
    const actualCharCodes = actual[0].keys;

    // Then
    expect(actualCharCodes).to.deep.equal(expectedCharCodes);
  });

  it('can parse multiple shortcuts defined in the key map', () => {
    // Given
    const jsonString = `{
        "definitions": [
            {"[ctrl]": 17},
            {"[alt]": 18},
            {"[enter]": 13}
        ],
        "shortcuts": [{
            "keys": ["[ctrl] k", "[enter]"],
            "description": "Just some key short cut"
        },{
            "keys": ["[alt] l", "p l"],
            "description": "Amazing lift off short cut"
        }]
    }`;
    const keyMapParser = new KeyMapParser();
    const expectedCharCodes = [[18, 108], [112, 108]];

    // When
    const actual = keyMapParser.parseFromString(jsonString);
    const actualCharCodes = actual[1].keys;

    // Then
    expect(actualCharCodes).to.deep.equal(expectedCharCodes);
  });

  it('adds description to parsed key map', () => {
    // Given
    const jsonString = `{
        "definitions": [
            {"[ctrl]": 17},
            {"[alt]": 18},
            {"[enter]": 13}
        ],
        "shortcuts": [{
            "keys": ["[ctrl] k", "[enter]"],
            "description": "Just some key short cut"
        },{
            "keys": ["[alt] l", "p l"],
            "description": "Amazing lift off short cut"
        }]
    }`;
    const keyMapParser = new KeyMapParser();
    const expectedDescription = 'Amazing lift off short cut';

    // When
    const actual = keyMapParser.parseFromString(jsonString);
    const actualCharCodes = actual[1].description;

    // Then
    expect(actualCharCodes).to.deep.equal(expectedDescription);
  });
});
