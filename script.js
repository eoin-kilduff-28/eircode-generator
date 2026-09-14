const county = document.querySelector("#counties");
const townContainer = document.querySelector("#town-container");
const towns = document.querySelector("#towns");

 county.addEventListener("change",
    function(){
        const chosenCounty = this.value;
        console.log(chosenCounty);

    }
     );

    const countyTowns = {
        CW: ["Carlow Town", "Tullow", "Muine Bheag"],
        CN: ["Cavan Town", "Kingscourt", "Bailieborough"],
        CE: ["Ennis", "Shannon", "Kilrush"],
        CK: ["Cobh", "Cork City", "Carrigaline", "Mallow"],
    }
