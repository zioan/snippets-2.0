import { useEffect, useCallback } from "react";

const useHotkeys = (keyMap) => {
  const handleKeyPress = useCallback(
    (event) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modifierKey = isMac ? event.metaKey : event.ctrlKey;

      // Process each hotkey combination in the keyMap
      Object.entries(keyMap).forEach(([combo, callback]) => {
        const keys = combo
          .toLowerCase()
          .split("+")
          .map((k) => k.trim());

        // Check if this is a modifier key combination
        if (keys.length === 2) {
          const [modifier, key] = keys;
          if ((modifier === "ctrl" || modifier === "cmd") && modifierKey && event.key.toLowerCase() === key) {
            event.preventDefault();
            callback(event);
          }
        } else if (keys.length === 1 && event.key.toLowerCase() === keys[0]) {
          // Single key hotkey
          event.preventDefault();
          callback(event);
        }
      });
    },
    [keyMap]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);
};

export default useHotkeys;
