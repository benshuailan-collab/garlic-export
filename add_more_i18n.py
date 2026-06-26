#!/usr/bin/env python3
"""
给HTML元素添加更多data-i18n属性
"""

import re

def add_more_i18n_attributes(html):
    """添加更多data-i18n属性"""
    
    # Hero区域
    html = html.replace(
        '>来自中国产地的<br>',
        ' data-i18n="hero.title1">来自中国产地的<br>'
    )
    html = html.replace(
        '>优质大蒜<',
        ' data-i18n="hero.title2">优质大蒜<'
    )
    html = html.replace(
        '>走向世界餐桌',
        ' data-i18n="hero.title3">走向世界餐桌'
    )
    
    # 统计数据
    html = html.replace(
        '>15年<',
        ' data-i18n="stats.years">15年<'
    )
    html = html.replace(
        '>30+国家<',
        ' data-i18n="stats.countries">30+国家<'
    )
    html = html.replace(
        '>5万吨<',
        ' data-i18n="stats.capacity">5万吨<'
    )
    html = html.replace(
        '>98%<',
        ' data-i18n="stats.satisfaction">98%<'
    )
    
    # 关于我们
    html = html.replace(
        '>关于我们</span>',
        ' data-i18n="about.tag">关于我们</span>'
    )
    html = html.replace(
        '>扎根中国大蒜之乡</h2>',
        ' data-i18n="about.title">扎根中国大蒜之乡</h2>'
    )
    
    return html

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    html = add_more_i18n_attributes(html)
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    print("✅ 已添加更多data-i18n属性")

if __name__ == '__main__':
    main()
