#! /usr/bin/env bash

curl -H "Authorization:Bearer `cat password.txt`" http://127.0.0.1:5000
curl -H "Authorization:Bearer `cat password.txt`" http://127.0.0.1:5000/new 
curl -i -H "Content-type: application/json" -H "Authorization:Bearer `cat password.txt`" -X POST -d '{"pid":0,"time":0.0,"logLine":"TEST"}' http://127.0.0.1:5000/log
curl -i -H "Content-type: application/json" -H "Authorization:Bearer `cat password.txt`" -X POST -d '{"pid":0,"time":0.1,"logLine":"TEST1"}' http://127.0.0.1:5000/log
curl -i -H "Content-type: application/json" -H "Authorization:Bearer `cat password.txt`" -X POST -d '{"pid":0,"time":0.2,"logLine":"TEST2"}' http://127.0.0.1:5000/log
