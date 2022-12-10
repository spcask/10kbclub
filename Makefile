render:
	. ./env && npm run lint
	. ./env && node src/checks.js
	. ./env && node src/refresh.js
	. ./env && node src/render.js
	cp src/favicon.png .
	cp src/CNAME .

checks:
	node src/checks.js

mac-setup:
	brew install node
	> env
	npm install

deb-setup:
	curl -sSL https://nodejs.org/dist/v18.12.1/node-v18.12.1-linux-x64.tar.xz -o node.txz
	mkdir -p node/
	tar -xvf node.txz -C node --strip-components=1
	echo "PATH=$$PWD/node/bin:\$$PATH" > env
	sudo apt-get install chromium
	. ./env && npm install

live:
	git config user.name "make"
	git config user.email "make@localhost"
	git branch -D live; :
	git switch -f --orphan live
	git add index.html favicon.png CNAME
	git commit -m "Publish live ($$(date -u +"%Y-%m-%d %H:%M:%S"))"
	git log -n 5
	git push -f origin live
