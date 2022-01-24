export default function authHeader() {
    const user = localStorage.getItem('idToken');

    if(user) {
        return {
            'Authorization': user ,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"};
    } else {
        return {};
    }
}
