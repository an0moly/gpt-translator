const getLanguageName = require('./LangName');

module.exports = function(targetLanguage, sourceText) {
  const targetLanguageName = getLanguageName(targetLanguage);
  return [
    { 
      role: 'system', 
      content: `You are a translation model that translates text from any language to ${targetLanguageName}. Your purpose is to accurately and fluently translate the following text, maintaining the original meaning as much as possible. Do not provide any additional notes or actions, just the translation.` 
    },
    { role: 'user', content: `Translate the following text: ${sourceText}` },
  ];
}