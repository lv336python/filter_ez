'''
Module for fake classes
'''
from datetime import datetime


class FakeUser:
    '''
    fake user class for mocking
    '''
    id = 1
    email = "mock_testinga@gmai.com"
    password = "admin1234"
    confirmed = True
    confirmed_date = datetime.now()

    def mock_url_for(self,*args,**kwargs):
        return "mocked_url_for"

    def mock_send_email(self,*args,**kwargs):
        return "mock_send_email"

    def __repr__(self):
        return self.email


class FakeSession:
    '''
    fake session class for mocking
    '''
    fake_session = {'user_id': FakeUser.id}
    fake_session_none = {}
