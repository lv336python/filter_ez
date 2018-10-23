from io import BytesIO

from pandas import ExcelWriter


class DataframeWriter:
    @staticmethod
    def excel_bytes_io(dataframe):
        byte_writer = BytesIO()
        excel_writer = ExcelWriter(byte_writer, engine='xlsxwriter')
        dataframe.to_excel(excel_writer, 'Sheet1', index=False)
        excel_writer.close()
        byte_writer.seek(0)
        return byte_writer
