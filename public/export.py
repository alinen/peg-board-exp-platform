#! /bin/python

from database import *
from datetime import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

if __name__ == '__main__':
    basedir = os.path.abspath(os.path.dirname(__file__))
    password = 'secret-token-1'
    try:
      f = open(os.path.join(basedir, 'password.txt'), 'r')
      password = f.readline()
    except:
      pass

    dbfile = 'experiment.sqlite'
    url = 'sqlite:///'+ os.path.join(basedir, dbfile)

    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db = SQLAlchemy(app)
    from models import *

    pids = Participant.query.all()
    for user in pids:
        lines = ExperimentLog.query.filter(ExperimentLog.pid == user.id).order_by(ExperimentLog.secs)
        createdStr = user.created.strftime("%m%d%Y-%H%M%S")
        f = open("logs/log-%d-%s.txt"%(user.id, createdStr), "w")
        for line in lines:
            f.writelines("%.2f,%s\n"%(line.secs,line.logLine));
        f.close()

