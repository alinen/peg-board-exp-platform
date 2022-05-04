#! /bin/python

from models import *
from flask_sqlalchemy import SQLAlchemy

def InitDatabase(db):
    db.create_all()

def ClearDatabase(db):
    db.drop_all()

def ClearExperimentLog(db):
    if ExperimentLog.__table__.exists(db.engine):
       ExperimentLog.__table__.drop(db.engine)
    ExperimentLog.__table__.create(db.engine)

def ListParticipantLog(db, pid):
    if not ExperimentLog.__table__.exists(db.engine):
        print "Experiment log is empty"
        return
    logLines = ExperimentLog.query.filter(ExperimentLog.pid == pid).order_by(ExperimentLog.secs)
    for line in logLines:
        print(line)

def ListExperimentLog(db):
    if not ExperimentLog.__table__.exists(db.engine):
        print "Experiment log is empty"
        return
    logLines = ExperimentLog.query.all()
    for line in logLines:
        print(line)

def ListParticipants(db):
    if not Participant.__table__.exists(db.engine):
        print "Participants log is empty"
        return
    logLines = Participant.query.all()
    for line in logLines:
        print(line)


if __name__ == '__main__':
    from backend import db

    print("Enter commands: logs, ids, clear, <pid>, quit") 
    done = False
    while (not done):
        cmd = raw_input("Enter a command: ")
        if cmd == "logs":
           ListExperimentLog(db) 
        elif cmd == "ids":
           ListParticipants(db)
        elif cmd == "clear":
           ClearDatabase(db)
        elif cmd == "quit":
            done = True
        else:
            try:
                pid = int(cmd)
            except:
                pass
            ListParticipantLog(db, pid)

