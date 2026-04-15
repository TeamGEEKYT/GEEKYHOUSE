const i18n = {
  currentLang: 'fr',
  translations: {},

  async load(lang) {
    const res = await fetch(`/geekyhouse/Website/lang_${lang}.json`);
    this.translations[lang] = await res.json();
  },

  t(key) {
    return this.translations[this.currentLang]?.[key]
        ?? key;
  },

  apply() {
    document.querySelectorAll('[data-i18n]')
      .forEach(el => {
        el.innerHTML = this.t(el.dataset.i18n);
      });
    document.documentElement.lang = this.currentLang;
  },

  async setLang(lang) {
    if (!this.translations[lang])
      await this.load(lang);
    this.currentLang = lang;
    this.apply();
    localStorage.setItem('lang', lang);
  }
};