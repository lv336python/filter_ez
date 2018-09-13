from functools import wraps
from flask import session

import json


def login_required(func):
    '''
    If you decorate a view with this, it will ensure that the current user is
    logged in and authenticated before calling the actual view. (If they are
    not, it calls the :attr:`LoginManager.unauthorized` callback.) For
    example::

        @app.route('/post')
        @login_required
        def post():
            pass
    :param func: The view function to decorate.
    :type func: function
    '''
    @wraps(func)
    def decorated_view(*args, **kwargs):
        try:
            if session['user_id']:
                return func(*args, **kwargs)
        except KeyError:
            return json.dumps({
                'message': 'User should be logged in!'
            }), 400
    return decorated_view