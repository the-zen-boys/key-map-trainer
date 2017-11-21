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

  convertStringToCode(dictionary, keyString) {
    for (const kvp in dictionary) {
      const key = Object.keys(keyString)[0];
      if (kvp === keyString) return kvp[key];
    }
    throw Error(`Could not find a definition for key string "${keyString}".`);
  }
}
