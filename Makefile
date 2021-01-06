render:
	time -p npm run lint
	time -p node src/checks.js
	time -p node src/refresh.js
	time -p node src/render.js
	cp src/favicon.png .
	cp src/CNAME .

setup:
	uname | grep Darwin && brew install node; :
	uname | grep Linux && sudo apt-get install nodejs; :
	npm install

live:
	git config user.name "make"
	git config user.email "make@localhost"
	git branch -D live; :
	git switch -f --orphan live
	git add index.html favicon.png CNAME
	git commit -m "Publish live ($$(date -u +"%Y-%m-%d %H:%M:%S"))"
	git log -n 5
	git push -f origin live
