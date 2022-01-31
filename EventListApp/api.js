export const api = (() => {
    // baseurl = "https://jsonplaceholder.typicode.com";
    const baseurl = "http://localhost:3000";
    const path = "events";

    // get data
    const getEvents = () =>
        fetch([baseurl, path].join("/")).then((response) => response.json());

    // create new data
    const addEvent = (event) =>
        fetch([baseurl, path].join("/"), {
            method: "POST",
            body: JSON.stringify(event),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((response) => response.json());

    const deleteEvent = (id) =>
        fetch([baseurl, path, id].join("/"), { method: "DELETE" });

    // update data
    const updateEvent = (id, event) => {
        fetch([baseurl, path, id].join("/"), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(event),
    })
        .then((response) => response.json())}

    return {
        deleteEvent,
        getEvents,
        addEvent,
        updateEvent,
    };
})();