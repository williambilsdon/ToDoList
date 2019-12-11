from flaskext.couchdb import ViewDefinition

user_tasks_view = ViewDefinition('todo_list', 'tasks', '''\
    function (doc) {
        if (doc.active) {
            emit(doc.id, doc)
        };
    }''')