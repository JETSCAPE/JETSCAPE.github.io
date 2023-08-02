# function to wrtie a json file
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
            firstName = ''
            while not rows[i][j] == ',':
                firstName += rows[i][j]
                j += 1

            while not  rows[i][j].isalpha():
                j += 1

            lastName = ''
            while not rows[i][j] == ',':
                lastName += rows[i][j]
                j += 1

            while not rows[i][j].isalpha():
                j += 1

            institution = ''
            while not rows[i][j] == '"':
                institution += rows[i][j]
                j += 1

            # rows[i] = [firstName, lastName, institution]
            rows[i] = f"{firstName} {lastName}, {institution}"

    return rows


# function to print an list
def printGrid(grid):
    # print the list
    for i in range(len(grid)):
        print(grid[i])


# write a 2D list to a json file
def writeJSON(outputFile, data):
    # open the file
    file = open(outputFile, 'w')
    # write the data to the file wit line breaks for readability
    file.write(json.dumps(data, indent = 4))

    # close the file
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
