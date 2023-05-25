document.querySelector("#btnSearch").addEventListener("click", () => {
    let text = document.querySelector("#textSearch").value;
    getCountry(text)
})

function getCountry(country) {
    const request = new XMLHttpRequest();

    request.open('GET', 'https://restcountries.com/v3.1/name/'+country)
    request.send();

    request.addEventListener('load', function(){
        const data = JSON.parse(this.responseText)
        console.log(data)
        renderCountry(data[0])

        const countries = data[0].borders.toString();

        // load neighbors
        const req = new XMLHttpRequest();
        req.open('GET', 'https://restcountries.com/v3.1/alpha?codes='+countries);
        req.send();

        req.addEventListener('load', function(){
            const data = JSON.parse(this.responseText)
            renderNeighbors(data)
        });
    });
}

function renderCountry(data) {
   
        let html = `
        <div class="card-header">
            Arama sonucu
        </div>


        <div class="card-body">
            <div class="row">
                <div class="col-4">
                    <img src="${data.flags.png}" alt="" class="img-fluid">
                </div>


                <div class="col-8">
                    <div class="card-title">${data.name.common}</div>
                    <hr>
                    <div class="row">
                        <div class="col-4">Əhali sayı:</div>
                        <div class="col-8">${(data.population / 1000000).toFixed(1)} milyon</div>
                    </div>

                    <div class="row">
                        <div class="col-4">Rəsmi dil:</div>
                        <div class="col-8">${Object.values(data.languages)}</div>
                    </div>

                    <div class="row">
                        <div class="col-4">Paytaxt:</div>
                        <div class="col-8">${data.capital[0]}</div>
                    </div>

                    <div class="row">
                        <div class="col-4">Valyuta:</div>
                        <div class="col-8">${Object.values(data.currencies)[0].name} (${Object.values(data.currencies)[0].symbol})</div>
                    </div>
                  
                </div>

            </div>
        </div>
        `;

        
        document.querySelector("#country-details").innerHTML = html
    
}

function renderNeighbors(data) {
    let html = "";
    for(let country of data){
        html = `
            <div class="col-2 mt-2">
                <div class="card">
                    <img src="${country.flags.png}" class="card-img-top img_height">
                    <div class="card-body">
                        <h6 class="card-title">${country.name.common}</h6>
                  
                        <hr>
                   
                        <p class="card-title"><b>Əhali sayı:</b></p>
                        <p class="card-title">${(country.population / 1000000).toFixed(1)} milyon</p>
                    
                     
                    
                        <p class="card-title"><b>Rəsmi dil:</b></p>
                        <p class="card-title">${Object.values(country.languages)}</p>
                   

                  
                        <p class="card-title"><b>Paytaxt:</b></p>
                        <p class="card-title">${country.capital[0]}</p>
                    
                   
                    
                        <p class="card-title"><b>Valyuta:</b></p>
                        <p class="card-title">${Object.values(country.currencies)[0].name} (${Object.values(country.currencies)[0].symbol})</p>
                    </div>
                  
                </div>  
                
            </div>
        `;
        document.querySelector("#neighbors").insertAdjacentHTML("beforeend", html);
    }
    
}
