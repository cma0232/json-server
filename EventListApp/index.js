import { api } from "./api.js";


// get all events
api.getEvents().then((data) => {
    console.log(data[0])
    for(let i=0; i<data.length; i++){
        let tr = document.createElement('TR');

        let td1 = document.createElement("TD");
        let input1 = document.createElement('INPUT')
        input1.value = data[i]['eventName']
        input1.setAttribute('disabled', 'True')
        td1.appendChild(input1)
        tr.appendChild(td1)
        

        let td2 = document.createElement("TD");
        let input2 = document.createElement('INPUT');
        input2.value = data[i]['startDate'];
        input2.setAttribute('disabled', 'True');
        td2.appendChild(input2);
        tr.appendChild(td2);
        
        let td3 = document.createElement("TD");
        let input3 = document.createElement('INPUT');
        input3.value = data[i]['endDate'];
        input3.setAttribute('disabled', 'True');
        td3.appendChild(input3);
        tr.appendChild(td3);

        let td4 = document.createElement('TD')
        var btn1 = document.createElement("button");
        btn1.appendChild(document.createTextNode("EDIT"));
        var btn2 = document.createElement("button");
        btn2.appendChild(document.createTextNode("DELETE"));
   
        td4.appendChild(btn1);
        td4.appendChild(btn2);
        console.log(td4)
        tr.appendChild(td4)

        td1.className = 'event-name';
        td2.className = 'start-date';
        td2.className = 'end-date';
   
        document.getElementsByTagName('TABLE')[0].appendChild(tr)
    }
})   

