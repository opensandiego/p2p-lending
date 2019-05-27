export const hasParamInUrlChanged = (prevMatch, currentMatch, paramName) => {
    if (prevMatch.params === undefined && currentMatch.params !== undefined) {
      return true;
    } else if (prevMatch.params !== undefined && currentMatch.params === undefined) {
      return true;
    }

    if (prevMatch.params[paramName].toLowerCase() !== currentMatch.params[paramName].toLowerCase()) {
      return true;
    }

    return false;
};
