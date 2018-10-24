"""Module include DataFrame writer"""

from io import BytesIO
from pandas import ExcelWriter


class DataFrameWriter:
    """
    Class to hold all needed write methods.
    It is working with DataFrames and write it to different outputs.
    """
    @staticmethod
    def excel_bytes_io(dataframe):
        """
        Writes given DataFrame to bytes output.
        It is Used to write DataFrame to Excel without creating file in file system.
        :return BytesIO object containing DataFrame in excel format.
        """
        byte_writer = BytesIO()
        excel_writer = ExcelWriter(byte_writer, engine='xlsxwriter')
        dataframe.to_excel(excel_writer, 'Sheet1', index=False)
        excel_writer.close()
        byte_writer.seek(0)
        return byte_writer

    @staticmethod
    def excel_file(datframe, save_path):
        """

        :param save_path:
        :return:
        """
        pass
