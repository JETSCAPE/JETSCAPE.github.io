# The JETSCAPE Collaboration
#
# This script reads a CSV file containing author data
# and writes that data to a JSON file.

import json
import os

# function to open a csv file and return its data as a multidimensional list
def openCSV(filename):
    # open the file
    file = open(filename, 'r')
    # read the file treading data in quotationa marks as a single value
    data = file.read()
    # close the file
    file.close()

    # split the data into rows
    rows = data.split('\n')

    # delete the header row
    del rows[0]

    # split the rows into columns
    for i in range(len(rows)):

        j = 0
        while j < len(rows[i]):
            # captures the first name
            firstName = ''
            while not rows[i][j] == ',':
                firstName += rows[i][j]
                j += 1

            # advances past non-alpha characters after
            # the first delimiter
            while not  rows[i][j].isalpha():
                j += 1

            # captures the last name
            lastName = ''
            while not rows[i][j] == ',':
                lastName += rows[i][j]
                j += 1

            # advances past non-alpha characters after
            # the second delimiter, which includes
            # the opening quotation mark
            while not rows[i][j].isalpha():
                j += 1

            # captures the institution column including
            # the commas and stops at the second quotation mark
            institution = ''
            while not rows[i][j] == '"':
                institution += rows[i][j]
                j += 1

            # formats array element as a string
            rows[i] = f"{firstName} {lastName}, {institution}"

    # if the last row is empty, delete it
    if rows[-1] == '':
        del rows[-1]

    return rows


# function to print an list
def printGrid(grid):
    # print the list
    for i in range(len(grid)):
        print(grid[i])


# function to write a 2D list to a json file
def writeJSON(outputFile, data):
    file = open(outputFile, 'w')
    file.write(json.dumps(data, indent = 4))
    file.close()


def main():
    repoRoot = 'jetscape.github.io'
    fileName = 'JETSCAPE_Authors.csv'
    fileNameJSON = 'JETSCAPE_Authors.json'

    commandArgs = os.sys.argv
    if len(commandArgs) > 1:
        repoRoot = commandArgs[1]
    
    if len(commandArgs) > 2:
        fileName = commandArgs[2]
    
    if len(commandArgs) > 3:
        fileNameJSON = commandArgs[3]

    data = openCSV(repoRoot + '/data/' + fileName)
    printGrid(data)
    writeJSON(repoRoot + '/data/' + fileNameJSON, data)

if __name__ == '__main__':
    main()
