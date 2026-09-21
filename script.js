const county = document.querySelector("#counties");
const townContainer = document.querySelector("#town-container");
const townsDropdown = document.querySelector("#towns");
const generateButton = document.querySelector("#code");
const result = document.querySelector("#result");


//generator method converted from java
class Generator {
    generateCode(route) {
        const catalogue = "0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ"; 
        let blank = ""; 
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * catalogue.length);
            blank = blank + catalogue.charAt(randomIndex);
        }
        const eircode = route + " " + blank;
        return eircode;
    }
}

const eircodeGenerator = new Generator(); //moved below generator to initiate generator first

 
//arrays of towns relative to county IDs 
    const countyTowns = {
        CW: ["Carlow Town", "Tullow", "Muine Bheag"],
        CN: ["Cavan Town", "Kingscourt", "Bailieborough"],
        CE: ["Ennis", "Shannon", "Kilrush"],
        CK: ["Cobh", "Cork City", "Carrigaline", "Mallow"],
        DL: ["Buncrana", "Letterkenny", "Ballybofey", "Stranorlar"],
        D: ["Dublin City", "Tallaght", "Swords", "Dún Laoghaire", "Blanchardstown", "Malahide"],
        GY: ["Galway City", "Tuam", "Ballinasloe", "Loughrea"],
        KY: ["Tralee", "Killarney", "Listowel"],
        KE: ["Naas", "Newbridge", "Maynooth"],
        KK: ["Kilkenny City", "Ferrybank", "Thomastown"],
        LS: ["Portlaoise","Portarlington", "Mountmellick"],
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
        WH: ["Mullingar", "Athlone", "Moate"],
        WX: ["Enniscorthy", "Gorey", "Wexford Town"],
        WW: ["Wicklow Town", "Bray", "Arklow", "Greystones"]
    };

    
    //routing keys for eqach listed town
    const routes = {
    "Carlow Town": "R93", "Tullow": "R93", "Muine Bheag": "R21",
    "Cavan Town": "H12", "Kingscourt": "A82", "Bailieborough": "A82",
    "Ennis": "V95", "Shannon": "V14", "Kilrush": "V15",
    "Cobh": "P24", "Cork City": "T12", "Carrigaline": "P43", "Mallow": "P51",
    "Buncrana": "F93", "Letterkenny": "F92", "Ballybofey": "F93", "Stranolar": "F93",
    "Dublin City": "D01", "Tallaght": "D24", "Swords": "K67", "Dún Laoghaire": "A96", "Blanchardstown": "D15", "Malahide": "K36",
    "Galway City": "H91", "Tuam": "H54", "Ballinasloe": "H53", "Loughrea": "H62",
    "Tralee": "V92", "Killarney": "V93", "Listowel": "V31",
    "Naas": "W91", "Newbridge": "W12", "Maynooth": "W23",
    "Kilkenny City": "R95", "Ferrybank": "X91", "Thomastown": "R95",
    "Portlaois": "R32", "Portarlington": "R32", "Mountmellick": "R32",
    "Carrick-on-Shannon": "N41", "Manorhamilton": "F91", "Ballinamore": "N41",
    "Newcastle West": "V42", "Kilmallock": "V35", "Limerick City": "V94",
    "Longford Town": "N39", "Granard": "N39", "Ballymahon": "N39",
    "Drogheda": "A92", "Ardee": "A92", "Dundalk": "A91", "Dunleer": "A92",
    "Castlebar": "F23", "Ballina": "F26", "Westport": "F28",
    "Trim": "C15", "Navan": "C15", "Kells": "A82",
    "Monaghan Town": "H18", "Carrickmacross": "A81", "Castleblayney": "A75",
    "Tullamore": "R35", "Birr": "R42", "Edenderry": "R45",
    "Roscommon Town": "F42", "Castlerea": "F45", "Boyle": "F52",
    "Sligo Town": "F91", "Tubbercurry": "F91", "Ballymote": "F91",
    "Tramore": "X91", "Waterford City": "X91", "Dungarvan": "X35",
    "Mullingar": "N91", "Athlone": "N37", "Moate": "N37",
    "Enniscourthy": "Y21", "Gorey": "Y25", "Wexford Town": "Y35",
    "Wicklow Town": "A67", "Bray": "A98", "Arklow": "Y14", "Greystones": "A63"
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

//uses Generator method to make full eircode
generateButton.addEventListener("click",
    function(){
        const townValue = townsDropdown.value;
        const route = routes[townValue];

        if(route){
            //this method passes the county's routing key into generator
            const fullCode = eircodeGenerator.generateCode(route);
            result.textContent = fullCode;
        } else{
            result.textContent="Choose a county and town first.";
        }
    }
);



    
