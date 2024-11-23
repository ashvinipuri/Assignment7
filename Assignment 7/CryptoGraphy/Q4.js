$(document).ready(function () {
   
    const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr";
    
   
    function fetchPrices() {
      $.getJSON(apiUrl, function (data) {
        const cryptoList = $('#crypto-list');
        cryptoList.empty(); 

        data.forEach(coin => {
          const coinHtml = `
            <div class="coin">
              <p><strong>${coin.name} (${coin.symbol.toUpperCase()})</strong></p>
              <p>Price: ₹${coin.current_price.toLocaleString()}</p>
            </div>
          `;
          cryptoList.append(coinHtml);
        });
      });
    }

    
    fetchPrices();

   
    $('#refresh').click(function () {
      fetchPrices();
    });

    
    $('#search').keyup(function () {
      const searchQuery = $(this).val().toLowerCase();

      $.getJSON(apiUrl, function (data) {
        const filteredData = data.filter(coin => 
          coin.name.toLowerCase().includes(searchQuery)
        );
        
        const cryptoList = $('#crypto-list');
        cryptoList.empty();  

        filteredData.forEach(coin => {
          const coinHtml = `
            <div class="coin">
              <p><strong>${coin.name} (${coin.symbol.toUpperCase()})</strong></p>
              <p>Price: ₹${coin.current_price.toLocaleString()}</p>
            </div>
          `;
          cryptoList.append(coinHtml);
        });
      });
    });
  });
