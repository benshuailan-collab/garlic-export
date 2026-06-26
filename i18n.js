/**
 * 多语言切换功能 - 简化版
 * 支持中文(zh)、英文(en)、俄语(ru)、阿拉伯语(ar)
 */

// 当前语言
let currentLang = 'zh';

// 语言配置
const langConfig = {
  zh: { name: '中文', flag: '🇨🇳', dir: 'ltr' },
  en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
  ru: { name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' }
};

// 初始化语言
function initLanguage() {
  // 从localStorage读取保存的语言
  const savedLang = localStorage.getItem('garlic-export-lang');
  if (savedLang && translations[savedLang]) {
    currentLang = savedLang;
  } else {
    // 检测浏览器语言
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh')) currentLang = 'zh';
    else if (browserLang.startsWith('ru')) currentLang = 'ru';
    else if (browserLang.startsWith('ar')) currentLang = 'ar';
    else currentLang = 'en';
  }
  
  // 应用语言
  applyLanguage(currentLang);
  
  // 绑定语言切换事件
  bindLanguageEvents();
}

// 应用语言
function applyLanguage(lang) {
  currentLang = lang;
  const config = langConfig[lang];
  
  // 保存选择
  localStorage.setItem('garlic-export-lang', lang);
  
  // 更新HTML属性
  document.documentElement.lang = lang;
  document.documentElement.dir = config.dir;
  
  // 更新body的RTL类
  if (config.dir === 'rtl') {
    document.body.classList.add('rtl');
  } else {
    document.body.classList.remove('rtl');
  }
  
  // 更新语言按钮显示
  const currentLangEl = document.getElementById('currentLang');
  if (currentLangEl) {
    currentLangEl.textContent = config.name;
  }
  
  // 更新所有带data-i18n属性的元素
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = getTranslation(key, lang);
    
    if (text) {
      // 简单处理：直接设置textContent
      // 对于复杂元素，可能需要更精细的处理
      if (el.children.length === 0) {
        // 如果是纯文本节点
        el.textContent = text;
      } else {
        // 如果有子元素，只更新第一个文本节点
        for (let node of el.childNodes) {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            node.textContent = text;
            break;
          }
        }
      }
    }
  });
  
  // 更新输入框的placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = getTranslation(key, lang);
    if (text) {
      el.placeholder = text;
    }
  });
}

// 获取翻译文本
function getTranslation(key, lang) {
  const keys = key.split('.');
  let result = translations[lang];
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      // 如果找不到翻译，返回中文
      result = translations['zh'];
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          return null;
        }
      }
      break;
    }
  }
  
  return typeof result === 'string' ? result : null;
}

// 绑定语言切换事件
function bindLanguageEvents() {
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  
  if (langBtn && langDropdown) {
    // 语言按钮点击
    langBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      langDropdown.classList.toggle('active');
    });
    
    // 点击页面其他地方关闭下拉
    document.addEventListener('click', () => {
      langDropdown.classList.remove('active');
    });
    
    // 语言选项点击
    langDropdown.querySelectorAll('.lang-option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = option.getAttribute('data-lang');
        applyLanguage(lang);
        langDropdown.classList.remove('active');
      });
    });
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initLanguage);

// 导出供全局使用
window.applyLanguage = applyLanguage;
window.currentLang = currentLang;
