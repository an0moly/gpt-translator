function getLanguageName(code) {
    const languageMap = {
      'af': 'Afrikaans',
      'nl': 'Dutch',
      'en': 'English',
      'is': 'Icelandic',
      'ig': 'Igbo',
      'id': 'Indonesian',
      'ga': 'Irish',
      'it': 'Italian',
    };
  
    return languageMap[code] || code;
  }
  
  module.exports = getLanguageName;
