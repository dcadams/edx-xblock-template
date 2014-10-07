```
# Run this the first time
find . -type f ! -name '*.jpg' ! -iwholename './.git*' -exec \
    sed -i -e 's/qualtrix_xblock/qualtrix_xblock/g; s/QualtrixXblock/QualtrixXblock/g;' {} \;
git mv qualtrix_xblock/qualtrix_xblock.py template/qualtrix_xblock.py
git mv qualtrix_xblock qualtrix_xblock
git commit -m "Fork qualtrix_xblock XBlock"
npm install
npm install -g grunt-cli
# Then this in the future
grunt watch
```

