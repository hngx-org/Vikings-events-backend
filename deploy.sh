#!/bin/sh

git pull origin main

npm i

pm2 start "npm start"
