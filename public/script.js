const county = document.querySelector("#counties");
const townContainer = document.querySelector("#town-container");
const townsDropdown = document.querySelector("#towns");
const generateButton = document.querySelector("#code");
const saveButton = document.querySelector("#save");
const result = document.querySelector("#result");

let currentEircode = null;

class Generator {
    generateCode(route) {
        const catalogue = "0123456789ACDEFHKNPRTVWXY"; 
        let blank = ""; 
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * catalogue.length);
            blank = blank + catalogue.charAt(randomIndex);
        }
        return route + " " + blank;
    }
}

const eircodeGenerator = new Generator();

const countyTowns = {
    CW: ["Carlow Town", "Muine Bheag"],
    CN: ["Cavan Town", "Kingscourt", "Cootehill", "Belturbet"],
    CE: ["Ennis", "Shannon", "Kilrush"],
    CK: ["Cobh", "Cork City", "Carrigaline", "Mallow"],
    DL: ["Letterkenny", "Ballybofey", "Donegal Town"],
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

const routes = {
    "Carlow Town": "R93", "Muine Bheag": "R21",
    "Cavan Town": "H12", "Kingscourt": "A82", "Cootehill": "H16", "Belturbet": "H14",
    "Ennis": "V95", "Shannon": "V14", "Kilrush": "V15",
    "Cobh": "P24", "Cork City": "T12", "Carrigaline": "P43", "Mallow": "P51",
    "Letterkenny": "F92", "Ballybofey": "F93", "Donegal Town": "F94",
    "Dublin City": "D01", "Tallaght": "D24", "Swords": "K67", "Dún Laoghaire": "A96", "Blanchardstown": "D15", "Malahide": "K36",
    "Galway City": "H91", "Tuam": "H54", "Ballinasloe": "H53", "Loughrea": "H62",
    "Tralee": "V92", "Killarney": "V93", "Listowel": "V31",
    "Naas": "W91", "Newbridge": "W12", "Maynooth": "W23",
    "Kilkenny City": "R95", "Ferrybank": "X91", "Thomastown": "R95",
    "Portlaoise": "R32", "Portarlington": "R32", "Mountmellick": "R32",
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
    "Enniscorthy": "Y21", "Gorey": "Y25", "Wexford Town": "Y35",
    "Wicklow Town": "A67", "Bray": "A98", "Arklow": "Y14", "Greystones": "A63"
};

county.addEventListener("change", function() {
    const chosenCounty = this.value;
    townsDropdown.innerHTML = "";

    if (countyTowns[chosenCounty]) {
        countyTowns[chosenCounty].forEach(function(town) {
            const option = document.createElement("option");
            option.value = town;
            option.textContent = town;
            townsDropdown.appendChild(option);
        });
        townContainer.style.display = "block";  
    } else {
        townContainer.style.display = "none"; 
    }
});

generateButton.addEventListener("click", async function() {
    const townValue = townsDropdown.value;
    const route = routes[townValue];

    if (!route) {
        result.textContent = "Choose a county and town first.";
        return;
    }

    result.textContent = "Checking database...";
    let isUnique = false;
    let candidateCode = "";
    let attempts = 0;

    while (!isUnique && attempts < 20) {
        attempts++;
        candidateCode = eircodeGenerator.generateCode(route);

        try {
            const response = await fetch(`/api/check-eircode?code=${encodeURIComponent(candidateCode)}`);

            if (!response.ok) {
                result.textContent = `Server error (${response.status}). Check terminal!`;
                return;
            }

            const data = await response.json();
            if (data.exists === false) {
                isUnique = true;
            }
        } catch (err) {
            result.textContent = "Cannot reach server. Is node server.js running?";
            return;
        }
    }

    if (isUnique) {
        currentEircode = candidateCode;
        result.textContent = currentEircode;
    } else {
        result.textContent = "Could not find a unique code. Try again.";
    }
});

saveButton.addEventListener("click", async function() {
    if (!currentEircode) {
        alert("Generate an Eircode first!");
        return;
    }

    try {
        const response = await fetch("/api/save-eircode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                eircode: currentEircode,
                county: county.value,
                town: townsDropdown.value
            })
        });

        if (response.ok) {
            alert(`Saved ${currentEircode} to database!`);
            currentEircode = null; 
        } else {
            alert("Error: That Eircode is already in use. Please generate a new one.");
        }
    } catch (err) {
        alert("Cannot reach server to save. Check that node server.js is running.");
    }
});





    
