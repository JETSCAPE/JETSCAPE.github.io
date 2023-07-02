import sys
import requests

# assign site from a command line argument
site = sys.argv[1]

try:
    valid = requests.get(site)
    if valid.status_code == 200:
        print(f"{site} is reachable.")
    else:
        raise SystemExit(f"{site}: is Not reachable, status_code: {valid.status_code}")

except requests.exceptions.RequestException as e:
    raise SystemExit(f"{site}: is Not reachable \nErr: {e}")
