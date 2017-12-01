export default class KeyMapParser {
  parse(keyMap) {
    const convertedKeyMap = [];
    keyMap.shortcuts.forEach((shortcut) => {
      const shortcuts = [];
      shortcut.keys.forEach((keyStroke) => {
        const keyCodeArray = [];

        const keyStrings = keyStroke.split(' ');
        keyStrings.forEach((keyString) => {
          const code = this.convertStringToCode(keyMap.definitions, keyString);
          keyCodeArray.push(code);
        });

        shortcuts.push(keyCodeArray);
      });

      const shortCutObj = {
        keys: shortcuts,
        keysAsText: this.getTextualPresentionOfKeyCombination(shortcut.keys),
        description: shortcut.description,
      };
      convertedKeyMap.push(shortCutObj);
    });

    return convertedKeyMap;
  }

  parseFromString(keyMapString) {
    const keyMap = JSON.parse(keyMapString);
    const convertedKeyMap = this.parse(keyMap);

    return convertedKeyMap;
  }

  // TODO helper method which should be moved from this class
  convertStringToCode(dictionary, keyString) { // eslint-disable-line
    if (keyString.length === 1) {
      return keyString.charCodeAt(0);
    }

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

  getTextualPresentionOfKeyCombination(keysArray) { // eslint-disable-line class-methods-use-this
    let text = '';
    keysArray.forEach((keyText, index) => {
      text += keyText;
      if (index < keysArray.length - 1) {
        text += ', ';
      }
    });
    return text;
  }
}
