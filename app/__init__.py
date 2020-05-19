from sanic import Sanic
from sanic_jwt import initialize
from sanic_cors import CORS

import app.env as config
from .index import authenticate, jwt_payload_extender
from .db_access import database


from .userboards import userboards_bp
from .index.index import index_bp


def create_app():
    # create backend application
    app = Sanic(__name__)

    app.config.from_object(config)
    # register CORS policy
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Create policy for authenticate
    initialize(app,
               authenticate=authenticate,
               url_prefix='/api/auth',
               path_to_authenticate='/signin',
               extend_payload=jwt_payload_extender,
               access_token_name='accessToken',
               expiration_delta=3600,
               private_key='MySuperSecretKey',
               secret='SuperSecretForToken',
               user_id='id')

    # register blueprints
    app.blueprint(userboards_bp, url_prefix='/api/boards')
    app.blueprint(index_bp, url_prefix='/api')

    # listeners. They are doing smth with condition presented in brackets
    @app.listener('before_server_start')
    async def create_db_connection(app, loop):
        print("Create_db_connection")

        await database.connect()
        data = await database.fetch_one(query=r'SELECT * FROM public."User";')
        print("data = ", dict(data), type(data))

    @app.listener('after_server_stop')
    async def close_db_connection(app, loop):
        print("Close db connection")
        await database.disconnect()

    app.run(host=app.config.HOST_IP,
            port=app.config.HOST_PORT,
            debug=app.config.DEBUG)
