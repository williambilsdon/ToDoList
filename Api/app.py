from flask import Flask, g, request, make_response, jsonify
from flaskext.couchdb import CouchDBManager, paginate
from schema import TaskSchema
from views import user_tasks_view
from flask_cors import CORS, cross_origin
from GetTaskIDs import GetTaskIDs
from couchdb import Server
import requests

import uuid

app = Flask(__name__)
cors = CORS(app, resources={r"/todo_list/*": {"origins": "*"}})
manager = CouchDBManager()

manager.setup(app)
manager.add_viewdef(user_tasks_view)

@app.route('/todo_list/getAllViews', methods=['GET'])
@cross_origin()
def getAllTasks():
    docIDs = GetTaskIDs(user_tasks_view)
    documents = []

    for ids in docIDs:
        documents.append(g.couch[ids])

    return jsonify(documents)

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

@app.route('/todo_list/deleteTask', methods=['POST'])
@cross_origin()
def deleteTask():
    id = request.get_data()
    server = Server()
    db = server['todo_list']
    del db[id]
    return make_response('DELETE Successful', 200)

@app.route('/todo_list/updateTask', methods=['POST'])
@cross_origin()
def updateTask():
    document = g.couch[request.get_data()]

    if not document['completed']:
        document['completed'] = True
    else: 
        document['completed'] = False

    g.couch.save(document)

    return make_response('UPDATE Successful', 200)

if __name__ == '__main__':
    app.config.update(
        DEBUG = True,
        COUCHDB_SERVER = "http://localhost:5984/",
        COUCHDB_DATABASE = "todo_list"
        )
    app.run(threaded = True)

