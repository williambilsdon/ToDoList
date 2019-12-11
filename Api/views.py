from flaskext.couchdb import ViewDefinition

user_tasks_view = ViewDefinition('Views', 'view', '''\
    function(doc) {
        emit(doc_id, 1)
    }''')