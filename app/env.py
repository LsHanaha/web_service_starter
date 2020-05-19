import os

DEBUG = True

HOST_IP = '0.0.0.0'
HOST_PORT = '8888'

DB_NAME = 'Upos'


DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')

DB_PORT = 5432
DB_HOST = '0.0.0.0'
# 172.19.0.2
