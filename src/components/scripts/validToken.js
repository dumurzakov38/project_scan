export function validToken() {
    const expireToken = localStorage.getItem('expire');
    
    if (expireToken) {
        const year = expireToken.slice(0, 4);
        const month = expireToken.slice(5, 7) - 1;
        const day = expireToken.slice(8, 10);
        const hour = expireToken.slice(11, 13);
        const minute = expireToken.slice(14, 16);
        const second = expireToken.slice(17, 19);
        
        const expireTokenGMT = expireToken.slice(27, 30) + expireToken.slice(31, 33);
        const expireDateUTC = new Date(Date.UTC(year, month, day, hour, minute, second));
        const offsetHours = parseInt(expireTokenGMT.slice(0, 3), 10);
        const offsetMinutes = parseInt(expireTokenGMT.slice(3, 5), 10);

        const expireDate = new Date(expireDateUTC.getTime() - (offsetHours * 60 + offsetMinutes) * 60000);
        const currentTime = new Date();

        if (currentTime > expireDate) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('expire');
        }
    }
}
