import { api } from "./api.js";

// get all events
let data = api.getEvents().then((data) => {
    console.log('get');
    let checkUpdate = (newEvent, data) =>{
        for (let key in newEvent) {
            console.log(data);
            if (key in data) {
                data[key] = newEvent[key];
            };
        };
    };
    function displayData(data){
        let l = document.getElementsByClassName('myinput');
        for (let i = 0; i < l.length; i++) {
            l[i].innerHTML = '';
        }

        for(let i=0; i<data.length; i++){
        let tr = document.createElement('TR');
        tr.className = 'myinput'

        let td1 = document.createElement("TD");
        let input1 = document.createElement('INPUT')
        input1.value = data[i]['eventName']
        input1.setAttribute('disabled', 'True')

        input1.addEventListener('change', (event) => {
            newEvent['eventName'] = event.target.value;
            checkUpdate(newEvent, data[i])
            console.log(newEvent)
        }, false);
        
        td1.appendChild(input1);
        tr.appendChild(td1);
        

        let td2 = document.createElement("TD");
        let input2 = document.createElement('INPUT');

        // q: how to use getTime()?
        input2.value = data[i]['startDate'];
        input2.setAttribute('disabled', 'True');
       
        input2.addEventListener('change', (event) => {
            newEvent['startDate'] = event.target.value;
            checkUpdate(newEvent, data[i]);
            console.log(newEvent);
        }, false);
        
        td2.appendChild(input2);
        tr.appendChild(td2);
        
        let td3 = document.createElement("TD");
        let input3 = document.createElement('INPUT');
        input3.value = data[i]['endDate'];
        input3.setAttribute('disabled', 'True');
        

        input3.addEventListener('change', (event) => {
            newEvent['endDate'] = event.target.value;
            checkUpdate(newEvent, data[i]);
            console.log(newEvent);
        }, false);
        
        td3.appendChild(input3);
        tr.appendChild(td3);

        let td4 = document.createElement('TD');
        var btn1 = document.createElement("button");
        btn1.className = `edit${i}`;
        btn1.appendChild(document.createTextNode("EDIT"));
        var btn2 = document.createElement("button");
        btn2.className='del';
        btn2.appendChild(document.createTextNode("DELETE"));
   
        td4.appendChild(btn1);
        td4.appendChild(btn2);
        tr.appendChild(td4);

        td1.className = 'event-name';
        td2.className = 'start-date';
        td2.className = 'end-date';

        btn1.onclick = function() {
            input1.removeAttribute('disabled', 'True');
            input2.removeAttribute('disabled', 'True');
            input3.removeAttribute('disabled', 'True');
            
            console.log(document.getElementsByClassName(`edit${i}`)[0])
            document.getElementsByClassName(`edit${i}`)[0].innerText = 'SAVE';
            document.getElementsByClassName(`edit${i}`)[0].id = `save${i}`;

            console.log(document.getElementById(`save${i}`))
            document.getElementById(`save${i}`).onclick = function () {
                api.updateEvent(data[i]['id'], data[i])
            };
        };

        btn2.onclick = function () {
            var div = this.parentElement.parentElement;
            div.style.display = "none";
            api.deleteEvent(data[i]['id']);
        };
        document.getElementsByTagName('TABLE')[0].appendChild(tr)
    }};

    let rows_per_page = 5;
    let curr_page = 1

    function display(rows_per_page, data, curr_page){
        let start = (curr_page-1) * rows_per_page;
        let end = start + rows_per_page;

        let display_list = data.slice(start, end);
        displayData(display_list);
    }
    
    function managePagination(rows_per_page, data){
        console.log(data)
        let totalPage = Math.ceil(data.length / rows_per_page);
        console.log(totalPage)
        let pre = document.getElementsByClassName('previous')[0];
        let next = document.getElementsByClassName('next')[0];
        console.log(pre)
        pre.onclick = function() {
            curr_page -= 1;
            if(curr_page <= totalPage && curr_page >0){
                
                display(rows_per_page, data, curr_page);
            }
            
        }

        next.onclick = function() {
            curr_page += 1;
            if (curr_page <= totalPage && curr_page > 0){
                display(rows_per_page, data, curr_page);
            }
           
        }
    }
    display(rows_per_page, data, curr_page);
    managePagination(rows_per_page, data);

    // add new event
    let newEvent = {};
    var addbtn = document.getElementsByClassName("addbtn");
    addbtn[0].addEventListener('click', () => {
        
        if (data.length < document.getElementsByTagName('TR').length -2) {
            return 0
        }

        let tr = document.createElement('TR');
        let td1 = document.createElement("TD");
        let input1 = document.createElement('INPUT');
        input1.addEventListener('change', (event) => {
            newEvent['eventName'] = event.target.value;
            console.log(newEvent);
        }, false);

        td1.appendChild(input1);
        tr.appendChild(td1);

        let td2 = document.createElement("TD");
        let input2 = document.createElement('INPUT');
        input2.setAttribute('type', 'date');
        input2.addEventListener('change', (event) => {
            newEvent['startDate'] = event.target.value;
            console.log(newEvent);
        }, false);

        td2.appendChild(input2);
        tr.appendChild(td2);

        let td3 = document.createElement("TD");
        let input3 = document.createElement('INPUT');
        input3.setAttribute('type', 'date');
        input3.addEventListener('change', (event) => {
            newEvent['endDate'] = event.target.value;
            console.log(newEvent);
        }, false);

        td3.appendChild(input3);
        tr.appendChild(td3);

        let td4 = document.createElement('TD');
        var btn1 = document.createElement("button");
        btn1.className = 'save';
        btn1.appendChild(document.createTextNode("SAVE"));
        var btn2 = document.createElement("button");
        btn2.className = 'del';
        btn2.appendChild(document.createTextNode("DELETE"));

        td4.appendChild(btn1);
        td4.appendChild(btn2);
        tr.appendChild(td4);

        td1.className = 'event-name';
        td2.className = 'start-date';
        td2.className = 'end-date';

        // save event
        btn1.onclick = function () {

            newEvent['id'] = document.getElementsByTagName('TR').length / 2 + 1;
            console.log(newEvent);
            api.addEvent(newEvent);
        };

        // delete event
        btn2.onclick = function () {
            var div = this.parentElement.parentElement;
            console.log(div);
            div.style.display = "none";
            api.deleteEvent(data[i]['id']);
        };

        document.getElementsByTagName('TABLE')[0].appendChild(tr);
    }, false);
});



