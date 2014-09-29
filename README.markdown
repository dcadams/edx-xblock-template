```
# Run this the first time
find . -type f ! -name '*.jpg' ! -iwholename './.git*' -exec \
    sed -i -e 's/templatexblock/yourproject/g; s/TemplateXblock/YourProject/g;' {} \;
git mv template/templatexblock.py template/yourproject.py
git mv templatexblock yourproject
git commit -m "Fork YourProject XBlock"
npm install
npm install -g grunt-cli
# Then this in the future
grunt watch
```

