from flask import Flask, g, request, make_response, jsonify
from flaskext.couchdb import CouchDBManager, paginate
from schema import TaskSchema
from views import user_tasks_view
from flask_cors import CORS, cross_origin

import uuid

app = Flask(__name__)
cors = CORS(app, resources={r"/todo_list*": {"origins": "*"}})
manager = CouchDBManager()

manager.setup(app)

@app.route('/todo_list/getAllViews', methods=['GET'])
@cross_origin()
def getAllTasks():
    tasks = user_tasks_view()
    paginate(tasks, 100, "?start=0")

    return tasks

@app.route('/todo_list/addTask', methods=['POST'])
@cross_origin()
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

