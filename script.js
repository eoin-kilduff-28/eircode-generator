const county = document.querySelector("#counties").value;

 county.addEventListener("change",
    function(){
        const county = this.value;
        console.log(county);

    }
 )