#! /bin/python

from models import *
from flask_sqlalchemy import SQLAlchemy
import datetime

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
        print("Experiment log is empty")
        return
    logLines = ExperimentLog.query.filter(ExperimentLog.pid == pid).order_by(ExperimentLog.secs)
    for line in logLines:
        print(line)

def ListExperimentLog(db):
    if not ExperimentLog.__table__.exists(db.engine):
        print("Experiment log is empty")
        return
    logLines = ExperimentLog.query.all()
    for line in logLines:
        print(line)

def ListParticipants(db):
    if not Participant.__table__.exists(db.engine):
        print("Participants log is empty")
        return
    logLines = Participant.query.all()
    for line in logLines:
        print(line)

def export(db):
    if not ExperimentLog.__table__.exists(db.engine):
       print("Experiment log is empty")
       return

    participants = Participant.query.all()
    date = datetime.datetime.now().strftime("%m%d%Y-%H%M%S")
    filename = "clicks-%s.csv"%str(date)
    fp = open(filename, "w")
    for p in participants:
       logLines = ExperimentLog.query.filter(ExperimentLog.pid == p.id).order_by(ExperimentLog.secs)
       for x in logLines:
           fp.writelines("%s,%s,%s,%f,%s\n"%(x.pid, p.name, str(p.created), x.secs, x.logLine))
    fp.close()
    print("Wrote file:", filename)

def help():
    print("Enter commands: logs, ids, clear, <pid>, help, export, quit") 

if __name__ == '__main__':
    from backend import db

    help()
    done = False
    while (not done):
        cmd = input("Enter a command: ")
        if cmd == "logs":
           ListExperimentLog(db) 
        elif cmd == "ids":
           ListParticipants(db)
        elif cmd == "clear":
           ClearDatabase(db)
        elif cmd == "export":
            export(db)
        elif cmd == "help":
            help()
        elif cmd == "quit":
            done = True
        else:
            try:
                pid = int(cmd)
                ListParticipantLog(db, pid)
            except:
                print(pid, "not found")
                pass

