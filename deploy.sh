#!/bin/bash

sudo yum install git
sudo npm install -g pm2
git clone git@github.com:arpithasheshadri/SupplyFrameCodingChallenge.git /tmp/



cd /tmp/SupplyFrameCodingChallenge/backend
npm install


pm2 stop all
pm2 start index.js



