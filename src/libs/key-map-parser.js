export default class KeyMapParser {
  parseFromString(keyMapString) {
    const me = this;
    const keyMap = JSON.parse(keyMapString);
    const shortcuts = [];
    keyMap.shortcuts.foreach((shortcut) => {
      shortcut.forEach((keyStroke) => {
        const keyStrings = keyStroke.split(' ');
        const keyCodeArray = [];
        keyStrings.forEach((keyString) => {
          const code = me.convertStringToCode(keyString);
          keyCodeArray.push(code);
        });
        shortcuts.push(keyCodeArray);
      });
    });
    return shortcuts;
  }

  // TODO helper method which should be moved from this class
  static convertStringToCode(dictionary, keyString) {
    const item = dictionary.find(kvp => Boolean(kvp === keyString));

    if (item) {
      const key = Object.keys(keyString)[0];
      return item[key];
    }

    throw Error(
      `Could not find a definition for key string "${keyString}".`,
    );
  }
}
