export default class KeyMapParser {
  parseFromString(keyMapString) {
    const keyMap = JSON.parse(keyMapString);
    const shortcuts = [];
    keyMap.shortcuts.forEach((shortcut) => {
      shortcut.keys.forEach((keyStroke) => {
        const keyStrings = keyStroke.split(' ');
        const keyCodeArray = [];
        keyStrings.forEach((keyString) => {
          const code = this.convertStringToCode(keyMap.definitions, keyString);
          keyCodeArray.push(code);
        });
        shortcuts.push(keyCodeArray);
      });
    });

    return shortcuts;
  }

  // TODO helper method which should be moved from this class
  convertStringToCode(dictionary, keyString) { // eslint-disable-line
    let item = null;
    dictionary.forEach((kvp) => {
      if (typeof kvp[keyString] !== 'undefined') {
        item = kvp[keyString];
      }
    });

    if (item) {
      return item;
    }

    throw Error(
      `Could not find a definition for key string "${keyString}".`,
    );
  }
}
