function fetchCrypto() {
    var input = document.getElementById('cryptoInput').value.trim().toUpperCase();
    if (!input) return;
    
    var symbol = input + 'USDT';
    var result = document.getElementById('result');
    
    fetch('https://api4.binance.com/api/v3/ticker/24hr')
        .then(function(response) { return response.json(); })
        .then(function(data) {
            var coin = data.find(function(c) { return c.symbol === symbol; });
            
            if (coin) {
                var change = parseFloat(coin.priceChangePercent).toFixed(2);
                result.innerHTML = 
                    '<div class="coin-card">' +
                        '<h3>' + input + '</h3>' +
                        '<p>ფასი: $' + parseFloat(coin.lastPrice).toFixed(2) + '</p>' +
                        '<p style="color:' + (change > 0 ? '#0f9' : '#f55') + '">' +
                            (change > 0 ? 'Up' : 'Down') + ' ' + change + '%</p>' +
                    '</div>';
            } else {
                result.innerHTML = '<p style="color:#f55">მონეტა არ მოიძებნა</p>';
            }
        });
}