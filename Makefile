all:
	npm install
	./node_modules/.bin/wrup browser --transform ./jsxify.js -r ./index.js --output ./app.js

run:
	make all
	./node_modules/.bin/polpetta&
	sleep 2 && open http://localhost:1337
	read && killall -u `whoami` -m node .*/polpetta
