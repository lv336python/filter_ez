'''
Module for datetime managing
'''

from datetime import datetime


class DateTimeManager:

    @classmethod
    def get_current_time(cls, isoformat=False):
        '''
        Get current time
        :return: current time in isoformat
        '''
        if isoformat:
            return datetime.utcnow().isoformat()
        return datetime.utcnow()

    @classmethod
    def get_file_last_modify_time(cls, file_path):
        return datetime.fromtimestamp(file_path).isoformat()

    @classmethod
    def get_current_time_stamp(cls):
        return datetime.utcnow().timestamp()

    @classmethod
    def expiration_time(cls, hours=1):

        return datetime.datetime.utcnow() + datetime.timedelta(hours)
