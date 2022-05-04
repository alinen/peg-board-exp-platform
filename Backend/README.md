# Monument Valley Backend

Backend server for recording experiment data.

# Contents

- **backend.py** Flask server implementation (local development: run `python backend.py`)
- **passenger_wsgi.py** launches server with wsgi passenger (needed for deployment)
- **data-dev.sqlite** database. Stores a simple table of <pid>, <sim time (secs)>, <text>
- **database.py** implements helper functions for working with the database. Run `python database.py` to dump the contents of database
- **testbackend.sh** CURL test commands for testing remote server 

# How to install

This codebase has been tested for Python 2.7.

## Dependencies

Dependencies can be installed with pip. With Python 2.7, pip is invoked with -m. 

```
python -m pip install <package_name>
```

- flask-httpauth

# How to run

* Run `python backend.py`

** Run `./testbackend.sh` to test the basic features of the backend
** Navigate to 127.0.0.1:5000/webgl/TestNet/index.html on your browser (test demo)
** Navigate to 127.0.0.1:5000/webgl/Experiment1/index.html on your browser (experiment demo)

You will need to build the unity demos for webgl and then copy them to the webgl directory.

## Password setup

This implementation uses "Bearer" authentication. The password should be stored in 
`password.txt` and should match the password stored in `/Assets/Resources/password.txt` in the Unity project.

# Deployment

## SSH to dreamhost

`ssh usermv@ps555931.dreamhostps.com`

## Install Python 2.7.x into your home directory

NOTE: This step may be already complete!

```
> mkdir tmp
> cd tmp
> wget https://www.python.org/ftp/python/2.7.15/Python-2.7.15.tar.xz
> tar xvf Python-2.7.15.tar.xz
> cd Python-2.7.15
> ./configure --prefix=$HOME/opt/python-2.7.15
> make
> make install
```

Then edit your .bashrc to contain

```
export PATH=$HOME/opt/python-2.7.15/bin:$PATH
```

To test your work:

```
> . ~/.bashrc
> which python
> python --version
```

If you want to install pip into your environment

```
> /opt/python-2.7.15/bin
curl https://bootstrap.pypa.io/get-pip.py > ~/tmp/get-pip.py 
python ~/tmp/get-pip.py --user
```

## Install a virtual environment that uses your new Python

```
> cd $HOME/example.com
> virtualenv -p /home/username/opt/python-2.7.X/bin/python env
> source env/bin/activate
```

To upgrade pip (and get latest version info)

```
> pip install pip --upgrade
```

Install our website dependencies

```
> pip install flask
> pip install flask-sqlalchemy
> pip install flask-httpauth
```

When you're finished 

```
> deactivate
```

To restart the server

```
> touch tmp/restart.txt
```

## Troubleshooting

If the virtualenv cannot load, you need to stop passenger

```
> 'ps aux | grep wsgi'
> kill -9 <passenger_id>
```

If passenger keeps reloading, rename passenger_wsgi.py

IMPORTANT:  If the python/OS version changes, you may need to reinstall your virtualenv (maybe take it as good opportunity to update your website too)

## Working with sqlite from the command line

To launch a shell for working with the database

```
sqlite3 experiments.sqlite
```

* https://www.sqlite.org/quickstart.html
* https://sqlite.org/cli.html

## Set permissions

```
> find . -type d -exec chmod 755 {} \;
> find . -type f -exec chmod 644 {} \;
> find . -name "*.py" -exec chmod 700 {} \;
> rm *.pyc // kruft
> chmod 755 awebsite.py
```

## Deploy backend code

SFTP the files in this directory to to dreamhost. The directory structure should be

```
mv.alinenormoyle.com/
  .htaccess
  passenger_wsgi.py
  tmp/
    restart.txt
  env/
    ... python virtual environment
  public/
    backend.py
    model.py
    data-dev.sqlite
    password.txt
    etc.
    webgl/
       Experiment1/
          ... unity files
       TestNet/
          ... unity files
```

Some helpful SFTP commands

```
> cd /public
> lcd MonumentValley/Backend
> put -r *
```

## Setup passenger

Make sure the domain is allowed to use passenger (from the control panel)

Create a file called passenger_wsgi.py in the folder above the document root (e.g.  /home/username/example.com/passenger_wsgi.py). This file must export a WSGI server with the name application. Here's a minimal example:

```
def application(environ, start_response):
    start_response('200 OK', [('Content-type', 'text/plain')])
    return ["Hello, world!"]
```

And another example

```
from flask import Flask
application = Flask(__name__)
@application.route('/')
def index():
    return "Hello Flask"
```

And the actual script that we use

```
import sys, os
INTERP = os.path.join(os.environ['HOME'], 'mv.alinenormoyle.com', 'env', 'bin', 'python')
if sys.executable != INTERP:
        os.execl(INTERP, INTERP, *sys.argv)
sys.path.append(os.getcwd())
from public.backend import app as application
```

To restart passenger

```
> touch tmp/restart.txt
```

# References

- https://flask-sqlalchemy.palletsprojects.com/en/2.x/quickstart/#a-minimal-application 
- https://flask-httpauth.readthedocs.io/en/latest/
