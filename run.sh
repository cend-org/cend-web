#!/bin/bash
cd /usr/workspace/cendWebNx && sudo git fetch origin && sudo git reset --hard origin/main
cd /usr/workspace/cendWebNx && sudo npm i

cd /usr/workspace/cendWebNx && sudo npm run build
sudo node .output/server/index.mjs