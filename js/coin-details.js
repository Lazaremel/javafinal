var params = new URLSearchParams(window.location.search);
var symbol = params.get('symbol');
if (symbol) {
    symbol = symbol.toUpperCase();
} else {
    symbol = 'BTC';
}

var logos = {
    BTC:  'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    ETH:  'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    BNB:  'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    SOL:  'https://cryptologos.cc/logos/solana-sol-logo.png',
    ADA:  'https://cryptologos.cc/logos/cardano-ada-logo.png',
    XRP:  'https://cryptologos.cc/logos/xrp-xrp-logo.png',
    DOGE: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
    DOT:  'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
    MATIC:'https://cryptologos.cc/logos/polygon-matic-logo.png',
    AVAX: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    SHIB: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png',
    LINK: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    TRX:  'https://cryptologos.cc/logos/tron-trx-logo.png',
    LTC:  'https://cryptologos.cc/logos/litecoin-ltc-logo.png'
};

async function loadCoinDetails() {
    var res, data, coin, price, change, volume, high, low, logo, html;

    try {
        res = await fetch('https://api4.binance.com/api/v3/ticker/24hr');
        data = await res.json();

        coin = data.find(function(c) {
            return c.symbol === symbol + 'USDT';
        });

        if (!coin) {
            document.getElementById('coinDetails').innerHTML = '<p style="color:#f55; text-align:center; padding:3rem;">მონეტა არ მოიძებნა</p>';
            return;
        }

        price = parseFloat(coin.lastPrice).toFixed(2);
        change = parseFloat(coin.priceChangePercent).toFixed(2);
        volume = (parseFloat(coin.volume) / 1000000).toFixed(1); 
        high = parseFloat(coin.highPrice).toFixed(2);
        low = parseFloat(coin.lowPrice).toFixed(2);

        logo = logos[symbol] || 'https://via.placeholder.com/120/111/fff?text=' + symbol;

        html = `
            <img src="${logo}" alt="${symbol}" class="coin-logo" 
                 onerror="this.src='https://via.placeholder.com/120/111/fff?text=${symbol}'">
            <h1>${symbol}/USDT</h1>
            <div class="price">$${price}</div>
            <div class="change ${change > 0 ? 'positive' : 'negative'}">
                ${change > 0 ? 'ზრდა' : 'კლება'} ${Math.abs(change)}% (24სთ)
            </div>

            <div class="info-grid">
                <div><strong>მოცულობა (24h):</strong></div>
                <div>$${volume} მლნ</div>

                <div><strong>მაქსიმუმი (24h):</strong></div>
                <div style="color:#16a34a">$${high}</div>

                <div><strong>მინიმუმი (24h):</strong></div>
                <div style="color:#dc2626">$${low}</div>

                <div><strong>ბოლო განახლება:</strong></div>
                <div>${new Date().toLocaleString('ka-GE')}</div>
            </div>

            <button class="back-btn" onclick="history.back()">← უკან დაბრუნება</button>
        `;

        document.getElementById('coinDetails').innerHTML = html;

    } catch (error) {
        document.getElementById('coinDetails').innerHTML = 
            '<p style="color:#f55; text-align:center; padding:3rem;">შეცდომა მონაცემების ჩატვირთვისას</p>';
    }
}


loadCoinDetails();