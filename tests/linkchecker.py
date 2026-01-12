import requests
import os
import sys

# path to data folder
default_data_folder = '/home/echo/jetscape/JETSCAPE.github.io/data'

# function to check if a url is valid
# returns a boolean
SSL_IGNORE = [
    "indico.ectstar.eu",
]

def check_url(url, file):
    try:
        url = url.rstrip("\\").replace("\\", "/")
        headers = {"User-Agent": "Mozilla/5.0"}

        hostname = url.split("/")[2]

        verify_ssl = hostname not in SSL_IGNORE

        response = requests.get(
            url,
            headers=headers,
            timeout=30,
            stream=True,
            allow_redirects=True,
            verify=verify_ssl
        )

        code = response.status_code

        if code == 200:
            return True

        if code in (301, 302, 303, 307, 308):
            return True

        if code == 403:
            print(f"Warning: 403 for {url} in {file}")
            return True

        print(f"Error {code}: {url} in {file}")
        return False

    except Exception as e:
        print(f"Exception for {url} in {file}: {e}")
        return False

# function to read one command line argument
# returns a string
def get_argument():
    if len(sys.argv) > 1:
        return sys.argv[1]
    else:
        return default_data_folder

# function to return an array of urls found in a text file
# returns an array of strings
# function to return an array of urls found in a text file
def get_urls(text):
    urls = []
    start = 0
    while True:
        start = text.find('http', start)
        if start == -1:
            break
        end = text.find('"', start)
        urls.append(text[start:end])
        start = end
    return urls

# function to check whether a path is a file or a directory
# returns a boolean
# function to check whether a path is a file or a directory
def is_file(path):
    return os.path.isfile(path)

# function to get all files in a directory its subdirectories
# returns an array of strings
def get_all_files(path):
    files = []
    if is_file (path): 
        files.append (path)
    else: 
        for item in os.listdir(path):
            files += get_all_files(path + '/' + item)
    return files

# main program
def main():
    path = get_argument()

    # if path doesn't exist, raise an error and exit
    if not os.path.exists(path):
        raise SystemExit(path + " doesn't exist")

    files = get_all_files(path)
    err = False

    # loop over all files
    for file in files:
        print('checking link in the file ' + file + '\n')
        # if file is a text or json file, check for urls
        if file.endswith('.txt') or file.endswith('.json'):
            # open file and read text
            with open(file, 'r') as f:
                text = f.read()
            # get all urls in text
            urls = get_urls(text)
            # loop over all urls
            for url in urls:
                # check url for problems
                if not check_url(url, file):
                    err = True

    if err:
        raise SystemExit('Errors found')
    else:
        print('All links in ' + path + ' are valid.')

if __name__ == '__main__':
    main()

