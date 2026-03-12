import urllib.request
import re

url = "https://www.youtube.com/watch?v=gu4pafNCXng"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')
match = re.search(r'"shortDescription":"(.*?)"', html)
if match:
    desc = match.group(1).replace('\\n', '\n')
    with open('yt_description.txt', 'w', encoding='utf-8') as f:
        f.write(desc)
