"""
    Module for creating fake data about cars
"""
import json
import sys
import xlwt

from random import choice



COL_DATASETS = {
    'Models': ['Mazaro', 'X5', 'Kwid', 'Scorpio', 'Vitara', 'A6', 'X4', 'Spyder'],
    'Make': ['Audi', 'BMW', 'Chevrolet', 'Citroen', 'Dacia', 'Fiat', 'Ford',
             'Honda', 'Kia', 'Lexus', 'Jeep', 'Opel', 'Nissan', 'Toyota', 'Pontiac'],
    'Body': ['Sedan', 'Hatchback', 'MPV', 'SUV', 'Crossover'],
    'Year': range(1950, 2018),
    'Mileage': range(0, 150000, 1000),
    'Fuel consumptions': range(10, 500),
    'Seats': range(1, 50),
    'Power': range(100, 400),
    'Engine type': ('Vee', 'Inline', 'Straight', 'VR', 'W', 'Boxer'),
    'Fuel type': ('Petrol', 'Diesel', 'Hybrid', 'Electric', 'Gas'),
    'Doors number': range(1, 6),
    'Transmission': ('Automatic', 'Manual', 'Semi-automatic'),
    'Gear numbers': range(3, 8),
    'Color': ('Red', 'Blue', 'Green', 'Yellow', 'Cyan'),
    'Wheel size': range(10, 20, 1),
    'Country': ('Ukraine', 'USA', 'German', 'England', 'France', 'Italy'),
    'Condition': ('Used', 'New', 'After car accident', 'Biohazard'),
    'Drive Type': ('All-Wheel', 'Front-Wheel', 'Rear-Wheel', 'Four-Wheel'),
    'Emission class': (1, 2, 3, 4, 5, 6),
    'Air bags': (0, 1, 2, 3, 4, 5),
    'Climate control': ("Yes", "No"),
    'Weight': range(800, 3000, 200),
    'Price': range(999, 29999, 1000),
    'Seat heater': ('Yes', 'No'),
    'Trim level': ('DX', 'LX', 'LS', 'EX', 'GL', 'SE', 'GT')
}

COLUMNS = sorted(list(COL_DATASETS.keys()))


def generate_row():
    """
    Returns a list of values for one row of car characteristics data
    :return: ['X5', 'Audi', 'Sedan', ...]
    """
    stats = []
    for column in COLUMNS:
        stats.append(choice(COL_DATASETS[column]))
    return stats

def configure():
    with open(sys.argv[1]) as conf_file:
        plain_text = conf_file.read()
        conf_json = json.loads(plain_text)
        print(conf_json)


def generate_data_frame():
    """
    Creates data frame with 50k rows of characteristics of
     cars and writes it to Excel file 'stats.xls'
    :return: None
    """
    workbook = xlwt.Workbook()
    sheet = workbook.add_sheet("Sheet 1")



    for index, column in enumerate(COLUMNS):
        sheet.write(0, index, column)
    for row_index in range(1, 50000):
        for col_index, col_value in enumerate(generate_row()):
            sheet.write(row_index, col_index, col_value)


    workbook.save("result.xls")


if __name__ == '__main__':
    if len(sys.argv) > 1:
        configure()
    generate_data_frame()
