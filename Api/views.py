from flaskext.couchdb import ViewDefinition

user_tasks_view = ViewDefinition('Views', 'new-view', '''\
    function(doc) {
        emit(doc_id, 1)
    }''')