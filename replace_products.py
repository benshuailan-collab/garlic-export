import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Product 1 SVG with image
content = re.sub(
    r'<div class="product-visual">\s*<div class="product-shape">\s*<svg[^>]*>.*?</svg>\s*</div>\s*<span class="product-badge hot">热销</span>\s*</div>',
    '<div class="product-visual">\n                            <img src="images/Professional_commercial_food_p_2026-06-25T23-51-38.png" alt="纯白蒜" class="product-img">\n                            <span class="product-badge hot">热销</span>\n                        </div>',
    content,
    flags=re.DOTALL
)

# Replace Product 2 SVG with image
content = re.sub(
    r'<div class="product-visual">\s*<div class="product-shape purple">\s*<svg[^>]*>.*?</svg>\s*</div>\s*</div>',
    '<div class="product-visual">\n                            <img src="images/Professional_commercial_food_p_2026-06-25T23-52-11.png" alt="杂交蒜" class="product-img">\n                        </div>',
    content,
    flags=re.DOTALL
)

# Replace Product 3 SVG with image
content = re.sub(
    r'<div class="product-visual">\s*<div class="product-shape light">\s*<svg[^>]*>.*?</svg>\s*</div>\s*</div>',
    '<div class="product-visual">\n                            <img src="images/Professional_commercial_food_p_2026-06-25T23-52-43.png" alt="脱水蒜制品" class="product-img">\n                        </div>',
    content,
    flags=re.DOTALL
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
