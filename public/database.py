#! /bin/python

from backend import app, db, Participant, ExperimentLog
import datetime

def ClearDatabase(db):
    with app_context():
       db.session.query(Participant).delete()
       db.session.commit()

       db.session.query(ExperimentLog).delete()
       db.session.commit()

def ListParticipantLog(db, pid):
    with app.app_context():
      query = db.session.query(ExperimentLog).filter(ExperimentLog.pid == pid).order_by(ExperimentLog.secs)
      logLines = query.all()
      return logLines
    return []

def PrintParticipantLog(db, pid):
    logLines = ListParticipantLog(db, pid)
    if len(logLines) == 0:
      print("Experiment log is empty")

    for line in logLines:
      print(line)

def ListExperimentLog(db):
    with app.app_context():
      logLines = db.session.query(ExperimentLog).all()
      return logLines
    return []

def PrintExperimentLog(db):
    logLines = ListExperimentLog(db)
    if len(logLines) == 0:
      print("Experiment log is empty")
    for line in logLines:
      print(line)

def ListParticipants(db):
    with app.app_context():
      logLines = db.session.query(Participant).all()
      return logLines
    return []

def PrintParticipants(db):
    logLines = ListParticipants(db)
    if len(logLines) == 0:
      print("Participant log is empty")
    for line in logLines:
      print(line)

def Export(db):

    with app.app_context():
       participants = db.session.query(Participant).all()
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
    help()
    done = False
    while (not done):
        cmd = input("Enter a command: ")
        if cmd == "logs":
           PrintExperimentLog(db) 
        elif cmd == "ids":
           PrintParticipants(db)
        elif cmd == "clear":
           ClearDatabase(db)
        elif cmd == "export":
           Export(db)
        elif cmd == "help":
           Help()
        elif cmd == "quit":
           done = True
        else:
           try:
              pid = int(cmd)
              PrintParticipantLog(db, pid)
           except:
              print(pid, "not found")
              pass

