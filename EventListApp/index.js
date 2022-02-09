import { api } from "./api.js";

// get all events
api.getEvents().then((data) => {
    console.log('get');
    function convertISOtoDate(string) {
        let date = new Date;
        date.setMilliseconds(string);
        return date
    }
    
    function convertDatetoISO(string) {
        let date = new Date(string);
        return date.getTime()
    }

    let checkUpdate = (newEvent, data) => {
        for (let key in newEvent) {
            console.log(data);
            if (key in data) {
                data[key] = newEvent[key];
            };
        };
    };
    function displayData(data) {
        let l = $('.myinput');
        console.log(l)
        for (let i = 0; i < l.length; i++) {
            l[i].innerHTML = '';
        }

        data.forEach((item, index) => {
            $('table').append(
                '<tr class="myinput">' + 
                '<td><input class="input1'+ index +'" disabled="True" value =' + item["eventName"] + '></td>'+
                '<td><input class="input2' + index +'" disabled="True" value =' + convertISOtoDate(item["startDate"]) + '></td>' +
                '<td><input class="input3' + index +'" disabled="True" value =' + convertISOtoDate(item["endDate"]) + '></td>' +
                '<td><button class=' + `edit${index}`+ '>EDIT</button>' +
                '<button class="del' + index +'">DELETE</button>' +
                '</tr>'
            )
            $(`.input1${index}`).on('change', (event) => {
                newEvent['eventName'] = event.target.value;
                checkUpdate(newEvent, item);
                console.log(newEvent);
            });

            $(`.input2${index}`).on('change', (event) => {
                newEvent['startDate'] = event.target.value;
                checkUpdate(newEvent, item);
                console.log(newEvent);
            });

            $(`.input3${index}`).on('change', (event) => {
                newEvent['endDate'] = event.target.value;
                checkUpdate(newEvent, item);
                console.log(newEvent);
            })

            $(`.edit${index}`).on('click', ()=>{
                $(`.input1${index}`).removeAttr('disabled');
                $(`.input2${index}`).removeAttr('disabled');
                $(`.input3${index}`).removeAttr('disabled');

                $(`.edit${index}`)[0].innerHTML = 'SAVE';
                $(`.edit${index}`)[0].id = `save${index}`;

                $(`#save${index}`).on('click', function () {
                    api.updateEvent(item['id'], item)
                });
            });

            $(`.del${index}`).on('click', function () {
                console.log(1)
                $(`.del${index}`).parent().parent().hide()
                api.deleteEvent(item['id']);
            });
        })
    };

    let rows_per_page = 5;
    let curr_page = 1

    displayData(data)

    function display(rows_per_page, data, curr_page) {
        let start = (curr_page - 1) * rows_per_page;
        let end = start + rows_per_page;

        let display_list = data.slice(start, end);
        displayData(display_list);
    }

    function managePagination(rows_per_page, data) {
        console.log(data)
        let totalPage = Math.ceil(data.length / rows_per_page);
        console.log(totalPage)
        let pre = $('.previous')[0];
        let next = $('.next')[0];

        pre.onclick = function () {
            curr_page -= 1;
            if (curr_page <= totalPage && curr_page > 0) {
                display(rows_per_page, data, curr_page);
            }
        }

        next.onclick = function () {
            curr_page += 1;
            if (curr_page <= totalPage && curr_page > 0) {
                display(rows_per_page, data, curr_page);
            }
        }
    }
    display(rows_per_page, data, curr_page);
    managePagination(rows_per_page, data);

    // add new event
    let newEvent = {};
    var addbtn = $(".addbtn");
    addbtn[0].on('click', () => {
        console.log($('tr').length)
        if (data.length < $('tr').length/2 - 1) {
            return 0
        }

        $('table').append(
            '<tr class="myinput">' +
            '<td><input class="input1" ></td>' +
            '<td><input class="input2" type="date"></td>' +
            '<td><input class="input3" type="date"></td>' +
            '<td><button class="save">SAVE</button>' +
            '<button class="del">DELETE</button>' +
            '</tr>'
        )

        $('.input1').on('change', (event) => {
            newEvent['eventName'] = event.target.value;
            console.log(event.target.value);
        });

        $('.input2').on('change', (event) => {
            newEvent['startDate'] = convertDatetoISO(event.target.value);
            console.log(newEvent);
        });

        $('.input3').on('change', (event) => {
            newEvent['endDate'] = convertDatetoISO(event.target.value);
            console.log(newEvent);
        });

        // save event
        $('.save').on('click', function () {
            newEvent['id'] = $('tr').length / 2 - 1;
            console.log(newEvent);
            api.addEvent(newEvent);
        });

        // delete event
        $('.del').on('click', function () {
            $('.del').parent().parent().hide();
            api.deleteEvent(newEvent['id']);
        });
    });
});
