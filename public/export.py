#! /bin/python

from backend import app, db, Participant, ExperimentLog
from database import *
from datetime import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os,sys

if __name__ == '__main__':
    if len(sys.argv) != 2:
      print("usage: %s <db-name>.sqlite"%sys.argv[0])
      sys.exit(0)

    else:
       print("Extracting %s"%sys.argv[1])
 
    pids = ListParticipants(db)
    for user in pids:
        lines = ListParticipantLog(db, user.id)
        createdStr = user.created.strftime("%m%d%Y-%H%M%S")
        f = open("logs/log-%d-%s.txt"%(user.id, createdStr), "w")
        for line in lines:
            f.writelines("%.2f,%s\n"%(line.secs,line.logLine));
        f.close()

