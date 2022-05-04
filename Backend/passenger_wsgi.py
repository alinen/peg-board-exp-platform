import sys, os
INTERP = os.path.join(os.environ['HOME'], 'mv.alinenormoyle.com', 'env', 'bin', 'python')
if sys.executable != INTERP:
	os.execl(INTERP, INTERP, *sys.argv)
sys.path.append(os.getcwd())

#from flask import Flask
#application = Flask(__name__)
#
#@application.route('/')
#def index():
#	return "Hello Flask"

from public.backend import app as application

