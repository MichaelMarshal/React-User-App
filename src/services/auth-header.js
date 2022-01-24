export default function authHeader() {
    const user = localStorage.getItem('idToken');

    if(user) {
        return {  'Authorization': user , 'Access-Control-Allow-Origin': '*'};
    } else {
        return {};
    }
}
