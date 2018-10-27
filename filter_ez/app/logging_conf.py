"""
Module logger in order to collect info abt processes
"""
import os
import logging
from logging.handlers import RotatingFileHandler
from datetime import datetime


def rollover_with_date(self):
    """
    Do a rollover, as described in __init__().
    """

    if self.stream:
        self.stream.close()
        self.stream = None
    if self.backupCount > 0:
        for _ in range(self.backupCount - 1, 0, -1):
            sfn = self.rotation_filename(self.baseFilename)
            dfn = self.rotation_filename("%s.%s" % (self.baseFilename,
                                                    str(datetime.utcnow().isoformat())))
            if os.path.exists(sfn):
                if os.path.exists(dfn):
                    os.remove(dfn)
                os.rename(sfn, dfn)
        dfn = self.rotation_filename(self.baseFilename + ".1")
        if os.path.exists(dfn):
            os.remove(dfn)
        self.rotate(self.baseFilename, dfn)
    if not self.delay:
        self.stream = self._open()  # pylint: disable=protected-access


def make_logger(file_path):
    """
    Logger that collects info abt project processes
    :param file_path:
    :return: logger
    """
    logger = logging.getLogger('main')

    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)
    console_handler.setFormatter(formatter)

    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    RotatingFileHandler.doRollover = rollover_with_date

    file_handler = RotatingFileHandler(file_path, mode='a', maxBytes=100000, backupCount=5)
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(formatter)

    logger.addHandler(console_handler)
    logger.addHandler(file_handler)
    logger.setLevel(logging.INFO)

    return logger
