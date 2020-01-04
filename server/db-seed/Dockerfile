FROM mongo

COPY data /data

CMD mongoimport --uri "mongodb://db:27017/local" --drop --file /data/frequencies.json --jsonArray && \
    mongoimport --uri "mongodb://db:27017/local" --drop --file /data/locales.json --jsonArray

