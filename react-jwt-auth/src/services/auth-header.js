// Функция для формирования хэдеров - получаем из localStorage токен для доступа или ничего.
// Токен хранится там если уже была пройдена аутентификация.

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user['access_token']) {
        return {Authorization: 'Bearer ' + user['access_token']};
    } else {
        return {};
    }
}
