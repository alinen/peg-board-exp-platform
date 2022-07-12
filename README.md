# peg-board-exp-platform

Task and game for an experiment investigating task perseverance in children.

* [Click here to play the application (no recording).](https://alinen.github.io/peg-board-exp-platform/)
* [Click here to play the swimmer game (no recording).](https://alinen.github.io/peg-board-exp-platform/swimmer.html)
* [Click here to play the peg task (no recording).](https://alinen.github.io/peg-board-exp-platform/pegBoard.html)
* [Click here to play the runner game (no recording).](https://alinen.github.io/peg-board-exp-platform/runner.html)

https://user-images.githubusercontent.com/259657/178350899-fcd7376d-1a57-41a1-92b4-c776520a6b9d.mp4

## How to build and run

This application is implemented using [Python3](https://www.python.org) and [Flask](https://flask.palletsprojects.com/en/2.1.x/).

```
$ python3 --version
Python 3.7.2
$ python3 -m pip install --upgrade pip
$ pip3 install Flask
$ pip3 install flask_sqlalchemy
```

To run on windows, double-click on `backend.py` in the /public directory. To run from the command line,

```
$ cd public
$ python3 backend.py
```

Using your browser, navigate to `127.0.0.1:5000`. 

### Tutorials

The task and game modes can be played independently as part of an introductory tutorial.

* Peg board tutorial: In your browser, navigate to `http://127.0.0.1:5000/tutorialpeg` 
* Swimmer game tutorial: In your browser, navigate to `http://127.0.0.1:5000/tutorialgame` 

### Working with logs

To preview and download the logs for the experiment using your browser, navigate to `http://127.0.0.1:5000/results`.

More functionality is available using the script `database.py` in /public.

```
$ python3 database.py
Enter commands: logs, ids, clear, <pid>, export, help, quit
Enter a command:
```

* *logs*: lists all log messages
* *ids*: lists all participants
* *clear*: deletes all participants and logs
* *pid*: lists all log messages corresponding the given participant id
* *export*: save the database to a .csv file
* *help*: list commands
* *quit*: quits the application
