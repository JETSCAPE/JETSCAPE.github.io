import json
import urllib.request
from datetime import datetime

# function to get  data from the InspireHEP api query
def get_inspirehep_data(url):
    try:
        with open('inspireHep.json', 'r') as f:
            data = json.load(f)
        return data
    except FileNotFoundError:
        pass

    data = json.loads(urllib.request.urlopen(url).read().decode('utf-8'))
    with open('inspireHep.json', 'w') as f:
        json.dump(data, f, indent=4)

    return data

# function to parse the data from the InspireHEP api query
def parse_data(data):
    records = []
    for hit in data['hits']['hits']:
        record = type('Values', (object,), {})()
        
        record.id = int(hit['id'])
        record.url = 'https://inspirehep.net/literature/' + str(record.id)
        record.title = hit['metadata']['titles'][0]['title']
        record.author = hit['metadata']['authors'][0]['full_name']
        if len(hit['metadata']['authors']) > 1:
            record.et_al  = 'et al.'
        else:
            record.et_al = ''

        if 'affiliations' in hit['metadata']['authors'][0]:
            record.first_author_affiliation = hit['metadata']['authors'][0]['affiliations'][0]['value']
            if len(hit['metadata']['authors'][0]['affiliations']) > 1:
                for i in range(1, len(hit['metadata']['authors'][0]['affiliations'])):
                    record.first_author_affiliation += ', ' + hit['metadata']['authors'][0]['affiliations'][i]['value']
        else:
            record.first_author_affiliation = ''

        record.earliest_date = hit['metadata']['earliest_date']
        record.date = datetime.strptime(record.earliest_date, "%Y-%m-%d").strftime("%B %d, %Y")
        record.earliest_year = int(hit['metadata']['earliest_date'][0:4])

        if 'dois' in hit['metadata']:
            record.doi = hit['metadata']['dois'][0]['value']
        else:
            record.doi = ''

        if 'abstracts' in hit['metadata']:
            record.abstract = hit['metadata']['abstracts'][0]['value']
        else:
            record.abstract = ''

        if 'publication_info' in hit['metadata']:
            if 'journal_title' in hit['metadata']['publication_info'][0]:
                record.journal = hit['metadata']['publication_info'][0]['journal_title']
            else:
                record.journal = ''
        else:
            record.journal = ''

        if 'publication_info' in hit['metadata']:
            if 'journal_volume' in hit['metadata']['publication_info'][0]:
                record.volume = hit['metadata']['publication_info'][0]['journal_volume']
            else:
                record.volume = ''
        else:
            record.volume = ''

        if 'publication_info' in hit['metadata']:
            if 'journal_issue' in hit['metadata']['publication_info'][0]:
                record.issue = hit['metadata']['publication_info'][0]['journal_issue']
            else:
                record.issue = ''
        else:
            record.issue = ''

        if 'publication_info' in hit['metadata']:
            if 'page_start' in hit['metadata']['publication_info'][0]:
                record.pages = hit['metadata']['publication_info'][0]['page_start']
            else:
                record.pages = ''
        else:
            record.pages = ''

        if 'publication_info' in hit['metadata']:
            if 'year' in hit['metadata']['publication_info'][0]:
                record.pub_year = str(hit['metadata']['publication_info'][0]['year'])
            else:
                record.pub_year = ''
        else:
            record.pub_year = ''

        records.append(record)

    return records


# function to print the records
def print_records(records):
    for record in records:
        if record.id:
            print(record.id)
        if record.url:
            print(record.url)
        if record.earliest_year:
            print(record.earliest_year)
        if record.title:
            print(record.title)
        if record.author:
            print(record.author)
        if record.first_author_affiliation:
            print(record.first_author_affiliation)
        if record.date:
            print(record.date)
        if record.journal:
            print(record.journal)
        if record.volume:
            print(record.volume)
        if record.issue:
            print(record.issue)
        if record.pages:
            print(record.pages)
        if record.pub_year:
            print(record.pub_year)
        if record.abstract:
            print(record.abstract)
        if record.doi:
            print(record.doi)
        # if record.publication_info:
        #     print(record.publication_info)
        print('------------------------------------')


# function to print the records to a JSON file
def print_records_json(records, output_json):
    for record in records:
        record.__dict__ = {k: v for k, v in record.__dict__.items() if v}

    with open(output_json, 'w') as f:
        json.dump([record.__dict__ for record in records], f, indent=4)


def main():
    earliest_date = datetime(1900, 1, 1)

    # url = 'https://inspirehep.net/api/literature?collaboration=JETSCAPE'
    url = 'https://inspirehep.net/api/literature?sort=mostrecent&size=250&page=1&q=collaboration%3AJETSCAPE&ui-citation-summary=false'
    # url = 'https://inspirehep.net/api/literature?fields=titles,authors.full_name,authors.affiliations&?sort=mostrecent&size=250&page=1&q=collaboration%3AJETSCAPE&ui-citation-summary=false'

    output_json = '../data/publications.json'

    data = get_inspirehep_data(url)
    print('Total number of hits:', data['hits']['total'])
    print('------------------------------------')
    records = parse_data(data)
    print_records(records)
    print_records_json(records, output_json)


if __name__ == '__main__':
    main()
