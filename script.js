const GoldMarket = {


    setRangeDays(){
        const inputRange = document.querySelector("#range-slider");
        this.rangeDays = inputRange.value;
        inputRange.addEventListener("change", (e) => {
            this.rangeDays = e.target.value;
            this.displayDaysHTML();
            this.setStartDate();
            this.getGoldPrice();
            this.setDefaultRadioBtn();
        })
    },
    displayDaysHTML(){
        const displayDays = document.querySelector("#display__days");
        displayDays.textContent = this.rangeDays;

    },
    setStartDate(){

        const today = new Date();
        const startDate = new Date();
        startDate.setDate(today.getDate()-this.rangeDays);
        let month = startDate.getMonth();
        if(month +1 < 10){
            month = "0" + (month + 1);
        }
        else{
            month = month + 1;
        }
        let day = startDate.getDate();
        if(day < 10){
            day = "0" + (day);
        }

        this.startDate = `${startDate.getFullYear()}-${month}-${day}`;



    },
    setEndDate(){
        const endDate = new Date();
        const year = endDate.getFullYear();
        let month = endDate.getMonth();
        let day = endDate.getDate();
        if(month +1 < 10){
            month = "0" + (month + 1);
        }
        else{
            month = month + 1;
        }
        
        if(day < 10){
            day = "0" + (day);
        }
        this.endDate = `${year}-${month}-${day}`;
    },
    getGoldPrice() {
        axios.get(`${this.urlAPI}/${this.startDate}/${this.endDate}`)
            .then(response => {
            
            this.dataGold = response.data;
            this.clearTable();
            this.createTable();

        })
    },
    createTable(){
        let newRows = document.createDocumentFragment();
        for(let gold in this.dataGold){
            
            let tr = document.createElement("tr");
            for(let value in this.dataGold[gold]){
                let td = document.createElement("td");
                td.textContent = this.dataGold[gold][value];
                tr.appendChild(td);

            }
            newRows.appendChild(tr);
        }
        this.tbody.appendChild(newRows);



    },
    clearTable(){
        this.tbody.innerHTML = "";

    },
    sortDate(){

        
        let radios = document.querySelectorAll(".radioDate")
        
        Array.from(radios).map(radio=>{
        
            radio.addEventListener("change",()=>{
                this.dataGold.reverse();
                this.clearTable();
                this.createTable();
            })
        })

    },
    sortValue(){
        let radios = document.querySelectorAll(".radioValue")
        Array.from(radios).map(radio=>{
            radio.addEventListener("change", (event)=>{
                this.clearTable();
                
                let radiobtn = event.target;
                if(radiobtn.dataset.name == "asc"){
                    let tempArray = [];
                    
                    
                    tempArray = this.dataGold.sort((a,b)=>a.cena-b.cena)
                    this.dataGold = tempArray;
                    this.createTable();
                }
                else{
                    let tempArray = [];
                    
                    
                    tempArray = this.dataGold.sort((a,b)=>b.cena-a.cena)
                    this.dataGold = tempArray;
                    this.createTable();
                    
                }
                
                
                
            })
        })
    },
    setDefaultRadioBtn(){
      let defaultBtn = document.querySelector("input[data-name='default']");
        defaultBtn.checked = true;
        
    },
    init(){
        this.urlAPI = 'https://api.nbp.pl/api/cenyzlota';
        this.rangeDays = Number;
        this.startDate = String;
        this.endDate = String;
        this.dataGold = [];
        this.tbody = document.querySelector("#display-gold");
        this.setRangeDays();
        this.displayDaysHTML();
        this.setEndDate();
        this.setStartDate();
        this.getGoldPrice();
        this.sortDate();
        this.sortValue();
        



    }
}
GoldMarket.init();
