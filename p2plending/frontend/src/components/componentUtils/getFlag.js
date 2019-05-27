export const getFlagEmoji = lang => {
    const emojiPath = "https://github.githubassets.com/images/icons/emoji/unicode/";
    switch(lang) {
      case 'English':
        return `${emojiPath}1f1ec-1f1e7.png`
      case 'Spanish':
        return `${emojiPath}1f1ea-1f1f8.png`
      case 'Chinese':
        return `${emojiPath}1f1e8-1f1f3.png`
      case 'Korean':
        return `${emojiPath}1f1f0-1f1f7.png`
      case 'Japanese':
        return `${emojiPath}1f1ef-1f1f5.png`
      case 'Russian':
        return `${emojiPath}1f1f7-1f1fa.png?` 
      default:
        return 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/198/waving-white-flag_1f3f3.png';
    }
  }
