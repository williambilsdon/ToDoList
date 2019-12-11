from flask import Flask, g, request, make_response, jsonify
from flaskext.couchdb import CouchDBManager, paginate
from schema import TaskSchema
from views import user_tasks_view
from flask_cors import CORS, cross_origin
from GetTaskIDs import GetTaskIDs

import uuid

app = Flask(__name__)
cors = CORS(app, resources={r"/todo_list*": {"origins": "*"}})
manager = CouchDBManager()

manager.setup(app)
manager.add_viewdef(user_tasks_view)

@app.route('/todo_list/getAllViews', methods=['GET'])
@cross_origin()
def getAllTasks():
    docIDs = GetTaskIDs(user_tasks_view)

    documents = []

    #for ids in docIDs:
     #   documents.append(g.couch.get([ids]))

    #print(documents)
    return docIDs

@app.route('/todo_list/addTask', methods=['POST'])
@cross_origin()
def addTask():
    print("request recieved at api")
    taskValue = request.get_data()
    print(taskValue)
    task = TaskSchema(value=taskValue, completed=False)
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

