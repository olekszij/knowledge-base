import os
import glob
from deep_translator import GoogleTranslator
import time

def translate_markdown(file_path, out_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    translator = GoogleTranslator(source='en', target='ru')
    
    # We will translate chunks
    # Since it's markdown, we shouldn't translate code blocks ideally, but for a quick translation, we will just translate the whole text.
    # To be safer, we can try translating and if it fails, just copy.
    try:
        # if content is too large, split it, but 4000 chars is the limit for google translate.
        # deep-translator handles up to 5000 chars.
        if len(content) > 4000:
            translated_text = translator.translate(content[:4000]) + translator.translate(content[4000:])
        else:
            translated_text = translator.translate(content)

        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(translated_text)
        print(f"Translated {file_path}")
    except Exception as e:
        print(f"Failed to translate {file_path}: {e}")
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    articles = glob.glob('src/content/articles/en/*.md')
    snippets = glob.glob('src/content/snippets/en/*.md')
    
    for article in articles:
        name = os.path.basename(article)
        out = os.path.join('src/content/articles/ru', name)
        translate_markdown(article, out)
        time.sleep(1)

    for snippet in snippets:
        name = os.path.basename(snippet)
        out = os.path.join('src/content/snippets/ru', name)
        translate_markdown(snippet, out)
        time.sleep(1)

if __name__ == '__main__':
    main()
