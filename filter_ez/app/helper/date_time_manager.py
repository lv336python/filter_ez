'''
Module for datetime managing
'''

from datetime import datetime, timedelta
import os

class DateTimeManager:
    '''
    Class for managing current date and time in different formats.
    You can get current time in two formats(default and ISO), get last file modify datetime,
    get current timestamp, generate expiration time
    '''
    @classmethod
    def get_current_time(cls, isoformat=False):
        '''
        Get current time in isoformat or default format
        :param isoformat: isoformat=True => return current datetime in ISO format
        :return: isoformat = False => return default current utc datetime
        '''

        if isoformat:
            return datetime.utcnow().isoformat()
        return datetime.utcnow()

    @classmethod
    def get_last_time_file_modify(cls, file_path):
        '''
        Return  last file modified datetime
        :param file_path: path to your file
        :return: datetime
        '''
        modify_date = os.path.getctime(file_path) # in seconds
        return datetime.utcfromtimestamp(modify_date).isoformat()

    @classmethod
    def get_current_time_stamp(cls):
        '''
        Return amount of seconds passed since 1970 year to now.
        :return: number
        '''
        return datetime.utcnow().timestamp()

    @classmethod
    def expiration_time(cls, days=0, hours=0):
        '''
        Function to set expiration time
        :param days: amount of days
        :param hours:amount of hours
        :return: new future datetime (now + days + hours)
        '''
        return datetime.utcnow() + timedelta(hours, days)
