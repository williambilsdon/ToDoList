from flaskext.couchdb import Document, TextField, BooleanField

class TaskSchema(Document):
    value = TextField()
    completed = BooleanField()
