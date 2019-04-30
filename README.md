# Peer-to-Peer Lending

## About

Peer to Peer lending is a web application actively being developed by [Open San Diego](https://opensandiego.org) in partnership with the [San Diego Linda Vista Library branch](https://www.sandiego.gov/public-library/locations/linda-vista-library) to facilitate community peer-to-peer lending. The goal is to help community members share books and media outside of the SD Library's collection (specifically foreign language books) with the help of the library. The Library staff will faciltate the loans with this application so that there is both trust and anonymity in the lending.

Read more in the [Project Brief](PROJECT-BRIEF.md).

## Status

We are currently at the **Proof-of-Concept** stage, and hoping to get to **Minimum-Viable-Product** soon. For more information on contributing, please review the [Project Brief](PROJECT-BRIEF.md).

## Setting Up

The project files consist of a [Django 2 Application](https://djangoproject.com) in conjunction with a [React.js](https://reactjs.org) front-end. 

The quickest way to get going is to use [Docker](https://docker.com):

~~~~~
> docker-compose up
> open http://localhost:8000/
~~~~~

**TODO: make docker-compose up auto-migrate db and possibly inject demo data**

Alternatively, to work locally, you can create a virtual environment:

~~~~~
> virtualenv venv
> source venv/bin/activate
> pip install -r requirements.txt
> cd p2plending
> ./manage.py migrate
> cd frontend
> npm install .
> npm run build
> cd ..
> ./manage.py runserver
> open http://localhost:8000/
~~~~~


