import os, sys
from datetime import datetime
from flask import Flask, send_from_directory, make_response, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPTokenAuth
from sqlalchemy.orm import DeclarativeBase

app = Flask(__name__)

dbfilename = 'experiment.sqlite'
if len(sys.argv) == 2:
    dbfilename = sys.argv[1]

def InitDatabase(app, dbfilename):
    basedir = os.path.abspath(os.path.dirname(__file__))
    password = 'secret-token-1'
    try:
      f = open(os.path.join(basedir, 'password.txt'), 'r')
      password = f.readline().strip()
    except:
      pass
    
    url = 'sqlite:///'+ os.path.join(basedir, dbfilename)
    try:
      f = open(os.path.join(basedir, 'database_uri.txt'), 'r') # allow override
      url = f.readline()
    except:
      pass

    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    return password

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)

class Participant(db.Model):
   __tablename__ = 'Participants'
   id = db.Column(db.Integer, primary_key=True)
   created = db.Column(db.DateTime)
   name = db.Column(db.String)

   def __repr__(self):
       createdStr = self.created.strftime("%m/%d/%Y %H:%M:%S.%f")
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
   logLine = db.Column(db.Text) # Is this long enough? sqlite has no max length?

   def __repr__(self):
       return "%d) PID: %d (%.2f) %s"%(self.id, self.pid, self.secs, self.logLine)

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


app = Flask(__name__)
password = InitDatabase(app, dbfilename)

db.init_app(app)
with app.app_context():
  db.create_all()

auth = HTTPTokenAuth(scheme='Bearer')
@auth.verify_token
def verify_token(token):
  if token == password:
    return "experimenter"

@app.route('/')
def index():
  return render_template("start.html") 

@app.route('/new', methods=['GET', 'POST'])
def new():
  expid = request.form.get('expid')
  expkey = request.form.get('expkey')
  #print("new", expid, expkey, request.data, request.form)
  if expkey == password:
    user = Participant()
    user.created = datetime.now()
    user.name = expid
    db.session.add(user)
    db.session.commit()

    return render_template("PegExperiment.html", experiment_pid=user.id, experiment_key=expkey) 
  else:
    return render_template("wrongkey.html") 

@app.route('/tutorialpeg', methods=['GET'])
def tutorialpeg():
  return render_template("tutorial-peg.html") 

@app.route('/tutorialgame', methods=['GET'])
def tutorialgame():
  return render_template("tutorial-swimmer.html") 

@app.route('/thankyou', methods=['GET'])
def thankyou():
  return render_template("thankyou.html") 

@app.route('/explogin')
def explogin():
  return render_template("explogin.html")

@app.route('/results', methods=['GET', 'POST'])
def results():
  expkey = request.form.get('expkey')
  if expkey != password:
    return render_template("wrongkey.html") 

  lines = []
  with app.app_context():
    participants = db.session.query(Participant).all()
    numparticipants = len(participants)

    for p in participants:
      query = db.session.query(ExperimentLog).filter(ExperimentLog.pid == p.id).order_by(ExperimentLog.secs)
      logLines = query.all()
      numevents = len(logLines)
      duration = 0
      if len(logLines) > 1:
        duration = logLines[-1].secs - logLines[0].secs
      lines.append([p.name, str(p.created), p.id, duration, numevents])

  return render_template("results.html", numparticipants = numparticipants, lines = lines)

@app.route('/log', methods=['PUT','POST'])
@auth.login_required
def log():
  #print(request.json)
  if not request.json or not 'logLine' in request.json:
    abort(404)

  exp = ExperimentLog()
  exp.load(request.json)
  db.session.add(exp)
  db.session.commit()

  return jsonify(exp.props()), 201

# Override this handler to send a JSON message rather than an HTML message
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return make_response(jsonify({'error': 'Internal error'}), 500)

if __name__ == '__main__':
  app.run()
