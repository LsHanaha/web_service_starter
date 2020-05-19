from sanic.response import text

from . import userboards_bp as bp


@bp.route('/user')
async def board_user(response):

    return text('board user')


@bp.route('/admin')
async def admin_board(response):

    return text('board admin')
