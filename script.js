let myLeads = [];
const input = document.getElementById("input"); 
const inputBtn = document.getElementById("inputBtn");
const tabBtn = document.getElementById("tabBtn");
const delBtn = document.getElementById("delBtn");  
const list = document.getElementById("list");

let leadsFromLS = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLS) {
    myLeads = leadsFromLS;
    render(myLeads);
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

delBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads=[];
    render(myLeads);
});

inputBtn.addEventListener("click", function() {
    if(input.value!=""){
        myLeads.push(input.value); 
        input.value = "";
        input.focus();
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    }
});

function render(leads) {
    let listItems = "";

    for(let i=0; i<leads.length; i++) {
        //listItems += "<li><a href='" + myLeads[i] + "'target='_blank'>" + myLeads[i] + "</a></li>";
        listItems += `
            <li>
                <a href="${leads[i]}" target="_blank">${leads[i]}</a>
            </li>`;
        //const li = document.createElement("li");
        //li.textContent = myLeads[i];
        //list.append(li);
    }
    
    list.innerHTML = listItems;
}

