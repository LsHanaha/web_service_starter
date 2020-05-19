# main module in the server. contains auth logic and open data

from sanic_jwt import exceptions
from werkzeug.security import check_password_hash

from app.db_access import database


async def authenticate(request, *args, **kwargs):
    username = request.json.get('username')
    password = request.json.get('password')

    if not username or not password:
        raise exceptions.AuthenticationFailed("Missing username or password")

    query = 'select * from public."User" where username = :username;'
    user = await database.fetch_one(query=query, values={'username': username})
    if user is None:
        raise exceptions.AuthenticationFailed('Wrong username or password')
    user = dict(user)
    print('user in auth = ', user)
    print("\n\ncheck_password_hash = ", check_password_hash(user.get('password'), password))
    if not check_password_hash(user.get('password'), password):
        raise exceptions.AuthenticationFailed('Wrong username or password')

    return user


async def jwt_payload_extender(payload, user):
    print("\n\npayload_extender = ", payload, type(payload), end='\n\n')
    print("user in extender = ", user, end='\n\n')

    # payload['id'] = user_data.get('id')
    payload['username'] = user.get('username')
    payload['email'] = user.get('email')
    payload['roles'] = [user.get('roles')]
    print("payload = ", payload)
    return payload
