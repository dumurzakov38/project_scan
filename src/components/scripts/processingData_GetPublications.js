let firstId = 0;
let lastId = 10;

export function processingData_GetPublications(props) {
    const accessToken = localStorage.getItem('accessToken');

    if (props === 'lazy') {
        firstId += 10;
        lastId += 10;
    }

    const idPublications = JSON.parse(sessionStorage.getItem('idPublications'));
    const slicedData = idPublications.slice(firstId, lastId);

    const encodedIds = slicedData.map(item => item.encodedId);

    const idPublication = {
        "ids": encodedIds
    };

    fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(idPublication) // Fix here
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        let news = sessionStorage.getItem('news');

        if (!news) {
            sessionStorage.setItem('news', JSON.stringify(data));            
        } else {
            news = JSON.parse(news);
            news.push(...data);
            sessionStorage.setItem('news', JSON.stringify(news)); 
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
