from databases import Database
import app.env as config

db_metadata = f'postgresql://{config.DB_USER}:{config.DB_PASSWORD}' \
              f'@{config.DB_HOST}:{config.DB_PORT}/{config.DB_NAME}'

database = Database(db_metadata,
                    min_size=5, max_size=20)


class Repository(object):
    def __init__(self, adapter=None):
        self.client = adapter()

    def find_all(self, selector):
        return self.client.find_all(selector)

    def find(self, selector):
        return self.client.find(selector)

    def create(self, entity):
        return self.client.create(entity)

    def update(self, selector, entity):
        return self.client.update(selector, entity)

    def delete(self, selector):
        return self.client.delete(selector)
