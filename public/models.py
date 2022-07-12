from backend import db
from datetime import datetime

class Participant(db.Model):
   __tablename__ = 'Participants'
   id = db.Column(db.Integer, primary_key=True)
   created = db.Column(db.DateTime)
   name = db.Column(db.String)

   def __repr__(self):
       createdStr = self.created.strftime("%m/%d/%Y %H:%M:%S")
       return "Participant %d (%s, %s)"%(self.id, self.name, createdStr)

   def props(self):
       json = {}
       json['id'] = self.id
       json['name'] = self.name
       json['created'] = self.created
       return json

   def load(self, json):
       pass

class ExperimentLog(db.Model):
   __tablename__ = 'ExperimentLog'
   id = db.Column(db.Integer, primary_key=True)
   pid = db.Column(db.Integer) # participant id (0 -> test participant)
   secs = db.Column(db.Float) # simulation time (in seconds)
   logLine = db.Column(db.Text) # Is this long enough?

   def __repr__(self):
       return "%d %d (%.2f) %s"%(self.id, self.pid, self.secs, self.logLine)

   def props(self):
       json = {}
       json['id'] = self.id
       json['pid'] = self.pid
       json['time'] = self.secs
       json['logLine'] = self.logLine
       return json

   def load(self, json):
       if 'pid' in json:
          self.pid = json['pid']

       if 'time' in json:
          self.secs = json['time']

       if 'logLine' in json:
          self.logLine = json['logLine']
