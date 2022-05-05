import os
from datetime import datetime
from flask import Flask, send_from_directory, make_response, jsonify, request, render_template
from flask_httpauth import HTTPTokenAuth
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))
password = 'secret-token-1'
try:
  f = open(os.path.join(basedir, 'password.txt'), 'r')
  password = f.readline()
except:
  pass

url = 'sqlite:///'+ os.path.join(basedir, 'experiment.sqlite')
try:
  f = open(os.path.join(basedir, 'database_uri.txt'), 'r') # allow override
  url = f.readline()
except:
  pass
  
app = Flask(__name__)
auth = HTTPTokenAuth(scheme='Bearer')

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
from models import *

@auth.verify_token
def verify_token(token):
  if token == password:
    return "experimenter"

@app.route('/hello')
@auth.login_required
def hello():
  return "Hello, {}!".format(auth.current_user())

@app.route('/')
def index():
  return render_template("start.html") 

@app.route('/new', methods=['GET', 'POST'])
def new():
  if not Participant.__table__.exists(db.engine):
    Participant.__table__.create(db.engine)

  expid = request.form.get('expid')
  #print("new", expid, request.data, request.form)

  user = Participant()
  user.created = datetime.now()
  user.name = expid
  db.session.add(user)
  db.session.commit()

  return render_template("PegExperiment.html", experiment_pid=user.id) 

@app.route('/log', methods=['PUT','POST'])
def log():
  print(request.json)
  if not request.json or not 'logLine' in request.json:
    abort(404)

  if not ExperimentLog.__table__.exists(db.engine):
    ExperimentLog.__table__.create(db.engine)

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
