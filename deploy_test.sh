#! /bin/bash

node deploy_test.js
pm2 stop bluesharp-app;
pm2 start pm2.json --env development;