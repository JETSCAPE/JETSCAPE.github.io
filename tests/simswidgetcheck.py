import requests

def test_simswidgetcheck():
    url = "http://eg1.jetscape.wayne.edu"
    response = requests.get(url)
    
    if response.status_code == 200:
        print(f"{url} is reachable.")
    else:
        print(f"{url} had returned code {response.status_code}.")
        raise Exception(f"{url} has returned code {response.status_code}.")


def main():
    test_simswidgetcheck()


if __name__ == "__main__":
    main()
