const county = document.querySelector("#counties");
const townContainer = document.querySelector("#town-container");
const townsDropdown = document.querySelector("#towns");

 
//arrays of towns relative to county IDs 
    const countyTowns = {
        CW: ["Carlow Town", "Tullow", "Muine Bheag"],
        CN: ["Cavan Town", "Kingscourt", "Bailieborough"],
        CE: ["Ennis", "Shannon", "Kilrush"],
        CK: ["Cobh", "Cork City", "Carrigaline", "Mallow"],
        DL: ["Buncrana", "Letterkenny", "Ballybofey", "Stranolar"],
        D: ["Dublin City", "Tallaght", "Swords", "Dún Laoghaire", "Blanchardstown", "Malahide"],
        GY: ["Galway City", "Tuam", "Ballinasloe", "Loughrea"],
        KY: ["Tralee", "Killarney", "Listowel"],
        KE: ["Naas", "Newbridge", "Maynooth", "Celbridge"],
        KK: ["Kilkenny City", "Ferrybank", "Thomastown"],
        LS: ["Portlaois","Portarlington", "Mountmellick"],
        LM: ["Carrick-on-Shannon", "Manorhamilton", "Ballinamore"],
        LK: ["Newcastle West", "Kilmallock", "Limerick City"],
        LD: ["Longford Town", "Granard", "Ballymahon"],
        LH: ["Drogheda", "Ardee", "Dundalk", "Dunleer"],
        MO: ["Castlebar", "Ballina", "Westport"],
        MH: ["Trim", "Navan", "Kells"],
        MN: ["Monaghan Town", "Carrickmacross", "Castleblayney"],
        OY: ["Tullamore", "Birr", "Edenderry"],
        RN: ["Roscommon Town", "Castlerea", "Boyle"],
        SO: ["Sligo Town", "Tubbercurry", "Ballymote"],
        WD: ["Tramore", "Waterford City", "Dungarvan"],
        WH: ["Mullingar", "Athlone", "Moat"],
        WX: ["Enniscourthy", "Gorey", "Wexford Town"],
        WW: ["Wicklow Town", "Bray", "Arklow", "Greystones"]
    };

    //obtains the id of the county when a county is chosen
    county.addEventListener("change", 
    function() {
    const chosenCounty = this.value;

    //hides town dropdown until a county is chosen
    townsDropdown.innerHTML = "";

    //loop to fill town dropdown menu with relevant towns
    if(countyTowns[chosenCounty]){
        countyTowns[chosenCounty].forEach(
            function(town) {
                const option = document.createElement("option"); //creates blank item for dropdown
                option.value=town; //size of dropdown equal to array size
                option.textContent=town; //each option is named after corresponding array element
                townsDropdown.appendChild(option);
        });
        
        
        townContainer.style.display = "block";  
    } else {
        
        townContainer.style.display = "none"; 
    }
});



    
