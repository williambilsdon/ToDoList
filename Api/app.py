from flask import Flask, g, request, make_response, jsonify
from flaskext.couchdb import CouchDBManager
from schema import TaskSchema
from views import user_tasks_view

import uuid

app = Flask(__name__)
manager = CouchDBManager()

manager.setup(app)

#@app.route('/todo_list/getAllViews', methods=['POST'])

@app.route('/todo_list/addTask', methods=['POST'])
def addTask():
    print("request recieved at api")
    taskValue = request.get_data()
    print(taskValue)
    task = TaskSchema(value=taskValue, completed=False)
    task.id = uuid.uuid4().hex
    print(task)
    task.store()

    return make_response('POST Succesful', 200)

if __name__ == '__main__':
    app.config.update(
        DEBUG = True,
        COUCHDB_SERVER = "http://localhost:5984/",
        COUCHDB_DATABASE = "todo_list"
        )
    app.run()

