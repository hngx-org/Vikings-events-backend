#!/bin/sh

git pull origin main

rm package-lock.json

npm i

pm2 restart "npm start"
