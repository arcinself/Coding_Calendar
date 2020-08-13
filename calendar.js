const axios = require('axios');
const URL= "https://clist.by/get/events/";

var runningEvents=[];
var pastEvents=[];
var upcomingEvents=[];

axios.get(URL)
    .then(response=>{
        categoriseEvents(response.data);
    })
    .catch(err=>{
        console.log(err);
    })

function categoriseEvents(events){
    var today=new Date();
    var choice= process.argv[2];
    events.forEach(event => {
        var startDate=new Date(event.start);
        var endDate=new Date(event.end);
        if( startDate > today){
            upcomingEvents.push(event);
        }else if(endDate< today){
            pastEvents.push(event);
        }else{
            runningEvents.push(event);
        }
    });
    switch(choice){
        case "past":
            events=pastEvents;
            break;
        case "running":
            events=runningEvents;
            break;
        case "upcoming":
            events=upcomingEvents;
            break;
        default:
            console.log("Invalid Choice\n Available choices are: Past, Running, Upcoming");
            return;
    }
    console.log("The",choice, "events are ::\n",events);
}