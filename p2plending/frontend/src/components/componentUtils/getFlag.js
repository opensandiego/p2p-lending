export const getFlagEmoji = lang => {
    const emojiPath = "https://www.countryflags.io";
    const emojiStyle = "shiny/32";
    var langCode = "";
    switch(lang) {
      case "en":
        langCode = "us";
        break;
      case "ko":
        langCode = "kp";
        break;  
      case "ja":
        langCode = "jp";
        break;  
      case "zh-hanta":
        langCode = "cn";
        break;
      default:
        langCode = lang;
    }
    console.log(`!${lang}!`);
    console.log(`!${langCode}!`);
    const flagURl = `${emojiPath}/${langCode}/${emojiStyle}.png`;
    console.log(flagURl);
    return flagURl
  }
