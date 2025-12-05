
    
    const params = new URLSearchParams(window.location.search);
    const symbol = params.get('symbol')?.toUpperCase() || 'BTC';

    
    const logos = {
      BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      ETH: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      BNB: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      SOL: 'https://cryptologos.cc/logos/solana-sol-logo.png',
      ADA: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
      XRP: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
      DOGE: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
      DOT: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
      MATIC: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
      AVAX: 'https://cryptologos.cc/logos/avalanche-avax-logo.png'
    };

    async function loadCoinDetails() {
      const res = await fetch('https://api4.binance.com/api/v3/ticker/24hr');
      const data = await res.json();
      const coin = data.find(c => c.symbol === symbol + 'USDT');

      if (!coin) {
        document.getElementById('coinDetails').innerHTML = '<p style="color:#f55">მონეტა არ მოიძებნა</p>';
        return;
      }

      const price = parseFloat(coin.lastPrice).toFixed(2);
      const change = parseFloat(coin.priceChangePercent).toFixed(2);
      const volume = (coin.volume / 1e6).toFixed(1);
      const high = parseFloat(coin.highPrice).toFixed(2);
      const low = parseFloat(coin.lowPrice).toFixed(2);
      const logo = logos[symbol] || 'https://via.placeholder.com/120?text=' + symbol;

      document.getElementById('coinDetails').innerHTML = `
        <img src="${logo}" alt="${symbol}" class="coin-logo" onerror="this.src='https://via.placeholder.com/120/111/fff?text=${symbol}'">
        <h1>${symbol}/USDT</h1>
        <div class="price">$${price}</div>
        <div class="change ${change > 0 ? 'positive' : 'negative'}">
          ${change > 0 ? '↑' : '↓'} ${Math.abs(change)}% (24h)
        </div>

        <div class="info-grid">
          <div><strong>მოცულობა (24h):</strong></div>
          <div>$${volume} მლნ</div>

          <div><strong>მაქსიმუმი (24h):</strong></div>
          <div style="color:#0f9">$${high}</div>

          <div><strong>მინიმუმი (24h):</strong></div>
          <div style="color:#f55">$${low}</div>

          <div><strong>ბოლო განახლება:</strong></div>
          <div>${new Date().toLocaleString('ka-GE')}</div>
        </div>

        <button class="back-btn" onclick="history.back()">← უკან დაბრუნება</button>
      `;
    }

   
    loadCoinDetails();
  