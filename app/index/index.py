# Открытые для всех данные

from sanic import response, Blueprint


index_bp = Blueprint('index')


@index_bp.route('/')
def index(request):
    return response.text("hello friend!")


@index_bp.route('/all')  # TODO remove this
def route_all(request):
    return response.text("hello friend!")
