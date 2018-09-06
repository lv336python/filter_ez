"""
    Module for creating fake data about cars
"""
import sys
from random import choice

import pandas as pd


CAR_CHARACTERISTICS = {
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

COLUMNS = sorted(list(CAR_CHARACTERISTICS.keys()))


def generate_row():
    """
    Returns a list of values for one row of car characteristics data
    :return: ['X5', 'Audi', 'Sedan', ...]
    """
    stats = []
    for column in COLUMNS:
        stats.append(choice(CAR_CHARACTERISTICS[column]))
    return stats


def generate_data_frame():
    """
    Creates data frame with 50k rows of characteristics of
     cars and writes it to Excel file 'stats.xls'
    :return: None
    """
    cars_data_frame = pd.DataFrame(columns=COLUMNS)
    for i in range(5000):
        cars_data_frame.loc[i] = generate_row()
    writer = pd.ExcelWriter(sys.argv[1])
    cars_data_frame.to_excel(writer, sheet_name="Sheet 1", index=False)
    writer.save()


if __name__ == '__main__':
    generate_data_frame()
