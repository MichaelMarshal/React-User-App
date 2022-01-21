export default function authHeader() {
    const user = localStorage.getItem('idToken');

    if(user && user.token) {
        return {  'x-access-token': user.token};
    } else {
        return {};
    }
}
