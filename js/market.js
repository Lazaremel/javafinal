async function loadCryptoTable() {
    try {
        var res = await fetch('https://api4.binance.com/api/v3/ticker/24hr');
        var data = await res.json();

        var top100 = data
            .filter(function(c) { 
                return c.symbol.endsWith('USDT') && 
                       !c.symbol.includes('BUSD') && 
                       !c.symbol.includes('ზრდა') && 
                       !c.symbol.includes('კლება'); 
            })
            .sort(function(a, b) { 
                return parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume); 
            })
            .slice(0, 100);

        var tbody = document.getElementById('tableBody');
        var htmlContent = '';

        for (var i = 0; i < top100.length; i++) {
            var coin = top100[i];
            var symbol = coin.symbol.replace('USDT', '');
            var price = parseFloat(coin.lastPrice).toLocaleString('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 6 
            });
            var change = parseFloat(coin.priceChangePercent).toFixed(2);
            var volume = parseFloat(coin.quoteVolume).toLocaleString('en-US');

            var isPositive = change > 0;
            var changeClass = isPositive ? 'change-positive' : 'change-negative';
            var changeIcon = isPositive ? 'ზრდა' : 'კლება';

            htmlContent += `
                <tr>
                    <td>${i + 1}</td>
                    <td><strong>${symbol}</strong></td>
                    <td class="price">$${price}</td>
                    <td class="${changeClass}">${changeIcon} ${change}%</td>
                    <td class="volume">$${volume}</td>
                    <td><button class="action-btn" onclick="location.href='coin-details.html?symbol=${symbol}'">დეტალურად</button></td>
                </tr>
            `;
        }

        tbody.innerHTML = htmlContent;

    } catch (error) {
        var tbodyError = document.getElementById('tableBody');
        tbodyError.innerHTML = '<tr><td colspan="6" style="color:#f55; text-align:center;">შეცდომა მონაცემების ჩატვირთვისას. სცადეთ განახლება.</td></tr>';
    }
}

function filterTable() {
    var term = document.getElementById('searchInput').value.toLowerCase();
    var rows = document.querySelectorAll('#tableBody tr');

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var text = row.textContent.toLowerCase();
        if (text.includes(term)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}


function filterByChange() {
    var val = document.querySelector('select').value;
    var rows = document.querySelectorAll('#tableBody tr');

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var changeCell = row.querySelector('td:nth-child(4)');
        if (!changeCell) continue;

        var changeText = changeCell.textContent;

        if (val === 'all') {
            row.style.display = '';
        } else if (val === 'ზრდა' && changeText.includes('ზრდა')) {
            row.style.display = '';
        } else if (val === 'კლება' && changeText.includes('კლება')) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

loadCryptoTable();
setInterval(loadCryptoTable, 30000);