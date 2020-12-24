render:
	time -p npm run lint
	time -p node refresh.js
	time -p node render.js

setup:
	uname | grep Darwin && brew install node; :
	uname | grep Linux && sudo apt-get install nodejs; :
	npm install

publish: render
	git config user.name "10kbclub"
	git config user.email "10kbclub@localhost"
	git add index.html
	git commit -m "Render website ($$(date -u +"%Y-%m-%d %H:%M:%S"))"
	git log -n 5
	git push origin master
