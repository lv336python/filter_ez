'''
Module for datetime managing
'''

from datetime import datetime, timedelta


class DateTimeManager:

    @classmethod
    def get_current_time(cls, isoformat=False):
        '''
        Get current time in isoformat or default format
        :param isoformat: isoformat=True => return current datetime in ISO format
        :return: isoformat = False => return default current datetime
        '''

        if isoformat:
            return datetime.utcnow().isoformat()
        return datetime.utcnow()

    @classmethod
    def get_file_last_modify_time(cls, file_path):
        '''
        Return  last file modified datetime
        :param file_path: path to your file
        :return: datetime
        '''
        return datetime.fromtimestamp(file_path).isoformat()

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
        return datetime.utcnow() + timedelta(hours,days)


