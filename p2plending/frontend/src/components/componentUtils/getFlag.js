

export const getFlagEmoji = (lang, style = 'shiny/16')  => {
    const lang2flag = { "af":"af", "ar":"ar", "ast":"ast", "az":"az", "bg":"bg", "be":"be", "bn":"bn", "br":"br", "bs":"bs", "ca":"ca", "cs":"cs", "cy":"cy", "da":"da", "de":"de", "dsb":"dsb", "el":"el", "en":"us", "en-au":"us", "en-gb":"us", "eo":"eo", "es":"es", "es-ar":"es", "es-co":"es", "es-mx":"es", "es-ni":"es","es-ve":"es", "et":"et", "eu":"eu", "fa":"fa", "fi":"fi", "fr":"fr", "fy":"fy", "ga":"ga", "gd":"gd","gl":"gl", "he":"he", "hi":"hi", "hr":"hr", "hsb":"hsb", "hu":"hu", "ia":"ia", "id":"id", "io":"io", "is":"is", "it":"it", "ja":"jp", "ka":"ka", "kab":"kab", "kk":"kk", "km":"km", "kn":"kn", "ko":"kp", "lb":"lb", "lt":"lt", "lv":"lv", "mk":"mk", "ml":"ml", "mn":"mn", "mr":"mr", "my":"my", "nb":"nb", "ne":"ne", "nl":"nl", "nn":"nn", "os":"os", "pa":"pa", "pl":"pl", "pt":"pt", "pt-br":"pt", "ro":"ro", "ru":"ru", "sk":"sk", "sl":"sl", "sq":"sq", "sr":"sr", "sr-latn":"sr", "sv":"sv", "sw":"sw", "ta":"ta", "te":"te", "th":"th", "tr":"tr", "tt":"tt", "udm":"udm", "uk":"uk", "ur":"ur", "vi":"vi", "zh-hans":"cn", "zh-hant":"cn" };
    const emojiPath = "https://www.countryflags.io";
    const emojiStyle = style;
    var langCode = lang2flag[lang];

    const flagURl = `${emojiPath}/${langCode}/${emojiStyle}.png`;
    return flagURl
  }