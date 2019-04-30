FROM python:3 AS base
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/

FROM node AS npm_build
COPY --from=base /code/ ./code
WORKDIR /code/p2plending/lending/static/
RUN npm install node-sass
RUN npm install .
RUN npm run build

FROM base AS release
COPY --from=npm_build /code/p2plending/lending/static/css/ /code/p2plending/lending/static/css
COPY --from=npm_build /code/p2plending/lending/static/js/ /code/p2plending/lending/static/js

