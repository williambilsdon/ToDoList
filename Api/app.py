from flask import Flask, g, request, make_response, jsonify
from flaskext.couchdb import CouchDBManager, paginate
from schema import TaskSchema
from views import user_tasks_view
from flask_cors import CORS, cross_origin
from GetTaskIDs import GetTaskIDs
from couchdb import Server
import requests

import uuid

#prepare app to be a flask based application
#Enable cors on the app
#set up couch DB manager to enable communication from API to DB
app = Flask(__name__)
cors = CORS(app, resources={r"/todo_list/*": {"origins": "*"}})
manager = CouchDBManager()

manager.setup(app)
#Add user_tasks_view to manager's list of views
manager.add_viewdef(user_tasks_view)

#Route to return all currently store tasks in the DB 
@app.route('/todo_list/getAllViews', methods=['GET'])
@cross_origin()
def getAllTasks():
    #runs user_tasks_view and returns resulting IDs to docIDs
    docIDs = GetTaskIDs(user_tasks_view)
    documents = []

    #for ever ID locate the doc in DB and append to documents array
    for ids in docIDs:
        documents.append(g.couch[ids])

    return jsonify(documents)

#Route to allow addition of new tasks to the DB
@app.route('/todo_list/addTask', methods=['POST'])
@cross_origin()
def addTask():
    print("request recieved at api")
    #get data from HTTP request recieved from React Front end
    #map data to a schema object relating to the JSON format of the DB
    taskValue = request.get_data()
    print(taskValue)
    task = TaskSchema(value=taskValue, completed=False)
    print(task)
    #save the object to DB
    task.store()

    return make_response('POST Succesful', 200)

#route to allow the user to delete tasks
@app.route('/todo_list/deleteTask', methods=['POST'])
@cross_origin()
def deleteTask():
    '''
    having to use couchdb to allow deletion and communication with DB
    due to limitations of flask-couchdb
    '''
    id = request.get_data()
    server = Server()
    db = server['todo_list']
    #after extracting the ID from posted data delete doc with ID 'id' in DB
    del db[id]
    return make_response('DELETE Successful', 200)

#route to enable the updating and editing of task completion values    
@app.route('/todo_list/updateTask', methods=['POST'])
@cross_origin()
def updateTask():
    #document to update
    document = g.couch[request.get_data()]

    #adhearing to dry principles establish current state
    #swap to the opposite - reduction of code done here
    if not document['completed']:
        document['completed'] = True
    else: 
        document['completed'] = False

    g.couch.save(document)

    return make_response('UPDATE Successful', 200)

if __name__ == '__main__':
    #set config settings to allow flask-couchdb to connect to correct db
    app.config.update(
        DEBUG = True,
        COUCHDB_SERVER = "http://localhost:5984/",
        COUCHDB_DATABASE = "todo_list"
        )
    app.run(threaded = True)

