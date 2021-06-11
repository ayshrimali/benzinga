var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');

const fetchStockDetail = (symbol: string, from: string, to: string, interval: string) => new Promise((resolve, reject) => {
    fetch(`https://api.benzinga.com/api/v2/bars?token=0beae1e20cfd42c3b17b65e2a54c9d7f&symbols=${symbol}&from=${from}&to=${to}&interval=${interval}`, {
        method: 'GET',
        headers: myHeaders,
    }).then((response) => response.json())
        .then((symbol) => {
            if (symbol) {
                resolve(symbol)
            }
        }).catch(error => {
            reject(error)
        })
})


export {
    fetchStockDetail
}