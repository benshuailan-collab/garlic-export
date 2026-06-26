#!/usr/bin/env python3
"""
为garlic-export网站添加多语言支持
给HTML元素添加data-i18n属性，并插入语言切换器
"""

import re

def add_language_switcher(html):
    """在导航栏添加语言切换下拉菜单"""
    # 在nav-links后面添加语言切换器
    lang_switcher = '''
                <!-- 语言切换器 -->
                <div class="lang-switcher">
                    <button class="lang-btn" id="langBtn">
                        <span class="lang-icon">🌐</span>
                        <span class="lang-text" id="currentLang">中文</span>
                        <span class="lang-arrow">▼</span>
                    </button>
                    <div class="lang-dropdown" id="langDropdown">
                        <a href="#" class="lang-option" data-lang="zh">🇨🇳 中文</a>
                        <a href="#" class="lang-option" data-lang="en">🇺🇸 English</a>
                        <a href="#" class="lang-option" data-lang="ru">🇷🇺 Русский</a>
                        <a href="#" class="lang-option" data-lang="ar">🇸🇦 العربية</a>
                    </div>
                </div>
'''
    
    # 在nav-links的闭合div前插入
    html = html.replace('</div>\n                <!-- Hero -->', lang_switcher + '            </div>\n                <!-- Hero -->')
    
    return html

def add_data_i18n_attributes(html):
    """给需要翻译的元素添加data-i18n属性"""
    
    # 导航链接
    html = html.replace(' href="#about">关于我们<', ' href="#about" data-i18n="nav.about">关于我们<')
    html = html.replace(' href="#products">产品中心<', ' href="#products" data-i18n="nav.products">产品中心<')
    html = html.replace(' href="#advantages">核心优势<', ' href="#advantages" data-i18n="nav.advantages">核心优势<')
    html = html.replace(' href="#markets">全球市场<', ' href="#markets" data-i18n="nav.markets">全球市场<')
    html = html.replace(' href="#certifications">资质认证<', ' href="#certifications" data-i18n="nav.certifications">资质认证<')
    html = html.replace(' href="#process">合作流程<', ' href="#process" data-i18n="nav.process">合作流程<')
    html = html.replace(' href="#contact">联系我们<', ' href="#contact" data-i18n="nav.contact">联系我们<')
    
    # Hero区域
    html = html.replace('class="hero-title" data-animate="fade-up" data-delay="100"', 
                       'class="hero-title" data-animate="fade-up" data-delay="100" data-i18n="hero.title"')
    html = html.replace('走向世界餐桌</h1>', '走向世界餐桌</h1>')
    
    # 统计数据
    html = html.replace('>15年<', ' data-i18n="stats.years">15年<')
    html = html.replace('>30+国家<', ' data-i18n="stats.countries">30+国家<')
    html = html.replace('>5万吨<', ' data-i18n="stats.capacity">5万吨<')
    html = html.replace('>98%<', ' data-i18n="stats.satisfaction">98%<')
    
    return html

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 添加语言切换器
    html = add_language_switcher(html)
    
    # 添加data-i18n属性
    html = add_data_i18n_attributes(html)
    
    # 在</body>前添加translations.js
    html = html.replace('</body>', '    <script src="translations.js"></script>\n    </body>')
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    print("✅ HTML已更新，添加了语言切换器和data-i18n属性")

if __name__ == '__main__':
    main()
