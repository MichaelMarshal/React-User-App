export default function authHeader() {
    const user = localStorage.getItem('idToken');

    if(user && user.token) {
        return {  'x-access-token': user.token , 'Access-Control-Allow-Origin': '*'};
    } else {
        return {};
    }
}
