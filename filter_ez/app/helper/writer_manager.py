"""Module include DataFrame writer"""
from io import BytesIO
import xlsxwriter


class DataFrameWriter:  # pylint: disable=R0903:
    """
    Class to hold all needed write methods.
    It is working with DataFrames and write it to different outputs.
    """
    @staticmethod
    def xlsx_bytes_io(dataframe):
        """
        Writes given DataFrame to bytes output.
        It is Used to write DataFrame to Excel without creating file in file system.
        :param dataframe: DataFrame to writen
        :return BytesIO object containing DataFrame in excel format.
        """
        byte_writer = BytesIO()
        excel_writer = xlsxwriter.Workbook(byte_writer)
        sheet = excel_writer.add_worksheet('Sheet1')
        head = dataframe.columns.tolist()
        data = dataframe.values.tolist()
        data.insert(0, head)

        for i, row in enumerate(data):
            for j, cell in enumerate(row):
                sheet.write(i, j, cell)

        excel_writer.close()
        byte_writer.seek(0)
        return byte_writer
