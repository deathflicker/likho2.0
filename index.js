let state = "down";
let allNotes = document.getElementById('allNotes');
let expandBtn = document.getElementById('expandBtn');
let noteWrite = document.getElementById('noteWrite');
let newNoteCont = document.getElementById('newNoteCont');
let instructions = document.getElementById('instructions');
let developerInfo = document.getElementById('developerInfo');
let whatColor = '#2c3e50';
let divId = 0;
var clearAllDiv = document.getElementById("clearAllDiv");
var scrollToTop = document.getElementById("scrollToTop");
var deleteDiv;

var nowEditing;
var undoTimer;
var undoTimeOut;
var undoTimerCount = 6;
var undoDeleteDiv;
var deletingItem = false;
var prvScroll = 0;
var curScroll = 0;
var triggerScroll = 0;














//Below function controls the upward and downward motion of expand note div
function expandNote() {
    if (state == 'down') {
        allNotes.style.borderTopLeftRadius = '0px';
        allNotes.style.borderTopRightRadius = '0px';
        allNotes.style.height = '100%';
        state = 'up';
        expandBtn.innerHTML = 'arrow_drop_down';
    }
    else {
        allNotes.style.borderTopLeftRadius = '28px';
        allNotes.style.borderTopRightRadius = '28px';
        allNotes.style.height = '40%';
        state = 'down';
        expandBtn.innerHTML = 'arrow_drop_up';
    }
}

//[DEPRECATED FUNCTION] when user scrolls way too much, the below div will expand automatically
function expandNoteScroll() {
    if (allNotes.scrollTop >= 70) {
        if (state == 'down') {
            allNotes.style.borderTopLeftRadius = '0px';
            allNotes.style.borderTopRightRadius = '0px';
            allNotes.style.height = '100%';
            state = 'up';
            expandBtn.innerHTML = 'arrow_drop_down';
        }
        $("#scrollToTop").fadeIn();
    }
    else {
        $("#scrollToTop").fadeOut();
    }
}


//Below function controls the text color of div
function changeClr(color) {
    if (color == 'black') {
        whatColor = '#2c3e50';
    }
    else if (color == 'red') {
        whatColor = '#ff7675';
    }
    else if (color == 'green') {
        whatColor = '#00b894';
    }
    else if (color == 'yellow') {
        whatColor = '#f1c40f';
    }
    else if (color == 'blue') {
        whatColor = '#74b9ff';
    }
    else if (color == 'pink') {
        whatColor = '#fab1a0';
    }
    else {
        whatColor = '#d35400';
    }
}


// When user presses add button , a new note is added.
function newNote() {
    if (noteWrite.value != "" && noteWrite.value != " ") {
        noteWrite.value = noteWrite.value.replaceAll(/\n/g, '<br>').replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll("&", "&amp;");
        divId += 1;
        newNoteCont.innerHTML = newNoteCont.innerHTML + '<div style="border-color: ' + whatColor + '" ' + 'id="div' + divId + '"><div id="buttonsCont" style="position: relative; display: flex; justify-content: flex-start; align-items: center; flex-direction: row;  height: auto; width: auto; padding-right: 7%; margin-top: 0%;"><button class="material-icons" style=" text-align: center; margin-right: 35%;" onclick="deleteCurrent(' + "'div" + divId + "')" + '">' + 'delete_forever</button><button class="material-icons" style="position:relative; color: darkgreen;" onclick="editFunction(' + "'label" + divId + "')" + '">edit</button>  <button class="material-icons" style="position: relative; color: blue;" onclick="shareNote('+"'label"+divId+"')"+'">share</button>  </div><div><label style="color: ' + whatColor + '" id="label' + divId + '">' + noteWrite.value.replaceAll("<br>", "\n").replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&amp;", "&") + '</label><br></div>' + '</div>';
        console.log("arpanAddNew[arpanBreak]div" + divId + "[arpanBreak]" + noteWrite.value.replaceAll("<br>", "\n").replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&amp;", "&") + "[arpanBreak]" + $('#label' + divId).css("color"));
        noteWrite.value = '';
    }
    else {
        noteWrite.focus();
    }
    if (divId > 1) {
        $("#clearAllDiv").fadeIn();
    }
}



//Below function removes selected div

function deleteCurrent(whichDiv) {
    if (deletingItem) {
        console.log("arpanNotifi|already deleting an item.")
    }
    else {
        undoDeleteDiv = whichDiv;
        deleteDiv = document.getElementById(whichDiv);
        deleteDiv.style.animation = "shake 0.5s";
        setTimeout(function () {

            $('#' + whichDiv).fadeOut();
            $("#undoDiv").css("display", "flex");
            deletingItem = true;

            // shows second timer count animation
            undoTimer = setInterval(function () {
                undoTimerCount--;
                $("#undoBtn").text("(" + undoTimerCount + "s)");
            }, 1000);

            // actually acts as a 6s timer after which div is deleted
            undoTimeOut = setTimeout(function () {
                $("#undoDiv").hide();
                clearInterval(undoTimer);
                undoTimerCount = 6;
                $("#undoBtn").text("(6s)");
                console.log("arpanDelete[arpanBreak]"+undoDeleteDiv);
                deleteDiv.remove();
                deletingItem = false;
                if (allNotes.querySelectorAll('div').length <= 4) {
                    $("#clearAllDiv").fadeOut(600);
                    divId = 0;
                    if (state == "down") {
                        expandNote();
                    }
                    expandNote();
                }
            }, 6000);
        }, 600);
    }

}


//Show my name
function showAbout() {
    instructions.style.height = '100%'
    instructions.style.transition = '0s';
    developerInfo.scrollIntoView();
}



//Show Help

function showHelp() {
    instructions.style.height = '100%';
}

//Hide Help

function hideHelp() {
    instructions.style.transition = '0.5s';
    instructions.style.height = '0%';
}



// Clear All added notes

function clearAll() {
    if (deletingItem == false) {
        newNoteCont.innerHTML = "";
        divId = 0;
        $("#clearAllDiv").fadeOut();
        if (state == "down") {
            expandNote();
        }
        expandNote();
    }
}


// function to edit already added note

function editFunction(whatToEdit) {
    nowEditing = whatToEdit;
    $("#editMenu").css("display", "flex");
    $("#editTextArea").val($('#' + whatToEdit).html().replaceAll("<br>", "\n").replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&amp;", "&"));
    //console.log($('#' + whatToEdit).html());
}


// apply edit function to check if textarea and label texts are same or not

function editTickShow() {
    if ($("#editTextArea").val() == $('#' + nowEditing).text()) {
        $("#editTick").fadeOut(100);
        $("#editSpace").fadeOut(100);
    }
    else if ($("#editTextArea").val() == "") {
        $("#editTick").fadeOut(100);
        $("#editSpace").fadeOut(100);
    }
    else {
        $("#editTick").fadeIn();
        $("#editSpace").fadeIn();
    }
}


// undoing the last delete action

function undoDeleteTimer() {
    deleteDiv.style.animation = "none";
    clearTimeout(undoTimeOut);
    clearInterval(undoTimer);
    $('#' + undoDeleteDiv).fadeIn();
    undoTimerCount = 6;
    $("#undoDiv").fadeOut(50);
    $("#undoBtn").text("(6s)");
    deletingItem = false;
}





// trying scroll direction function with jquery

function scrollDirection(cursor){
    if(prvScroll==0 && curScroll==0){
        curScroll = cursor;
    }
    else{
        prvScroll = curScroll;
        curScroll = cursor;
    }

    

    /*if(curScroll>prvScroll){
        
    }
    else{
        console.log("scrolling up");
        if(cursor==0){
            if(triggerScroll==0){
              allNotes.scrollTop = 20;
              triggerScroll = 1;
              console.log(triggerScroll);
            }
            else{
                triggerScroll = 0;
                console.log("want to close full screen");
                console.log(triggerScroll);
                
            }
        }
    }*/




    /** Second Try */


    if (allNotes.scrollTop >= 70) {
        $("#scrollToTop").fadeIn();
    }
    else {
        $("#scrollToTop").fadeOut();
    }

    if(curScroll>prvScroll){
        //console.log("scrolling down");
        allNotes.style.borderTopLeftRadius = '0px';
        allNotes.style.borderTopRightRadius = '0px';
        allNotes.style.height = '100%';
        state = 'up';
        expandBtn.innerHTML = 'arrow_drop_down';
        
    }
    else{
        //console.log("scrolling up | speed: ",prvScroll-curScroll,"current scroll: ",curScroll);

        if(curScroll<=200){
            if((prvScroll-curScroll)>=100){
                allNotes.style.borderTopLeftRadius = '28px';
                allNotes.style.borderTopRightRadius = '28px';
                allNotes.style.height = '40%';
                state = 'down';
                expandBtn.innerHTML = 'arrow_drop_up';
                $("#scrollToTop").hide();
            }
        }
        
    }
}




// Function to share a created note over whatsapp

function shareNote(toShare){
    console.log("arpanNoteShare[arpanBreak]"+$('#'+toShare).text());
}



// On mobile app if js is passed, add elements

function retrieveAll(newDivID, newDivText, newDivColor){
    newNoteCont.innerHTML = newNoteCont.innerHTML + '<div style="border-color: ' + newDivColor + '" ' + 'id="div' + newDivID + '"><div id="buttonsCont" style="position: relative; display: flex; justify-content: flex-start; align-items: center; flex-direction: row;  height: auto; width: auto; padding-right: 7%; margin-top: 0%;"><button class="material-icons" style=" text-align: center; margin-right: 35%;" onclick="deleteCurrent(' + "'div" + newDivID + "')" + '">' + 'delete_forever</button><button class="material-icons" style="position:relative; color: darkgreen;" onclick="editFunction(' + "'label" + newDivID + "')" + '">edit</button>  <button class="material-icons" style="position: relative; color: blue;" onclick="shareNote('+"'label"+newDivID+"')"+'">share</button>  </div><div><label style="color: ' + newDivColor + '" id="label' + newDivID + '">' + newDivText.replaceAll("<br>", "\n").replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&amp;", "&") + '</label><br></div>' + '</div>';
    divId++;
}