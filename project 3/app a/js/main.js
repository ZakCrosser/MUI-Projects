//Zachary Crosser
//Project 3
//MiU Term 1209
//Zachary Crosser

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addItem').on('pageinit', function(){

		var myForm = $('#transform');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
  
  function r(x){
    var theElement = document.getElementById(x);
    return theElement;
  }
  
  
  var getRadioType = function(){
    var radios = document.forms[0].types;
    for(var i=0; i<radios.length; i++){
      if(radios[i].checked){
        typeValue = radios[i].value;
      }
    }
  }
  
  var getCheckBoxStatus = function(){
    if(r('recurring').checked){
      checkBoxValue = $('recurring').value;
    }else{
      checkBoxValue = "No";
    }
  }
  
  
  var storeTransaction = function(key){
    if(!key){
        var id          = Math.floor(Math.random()*100001);
    }else{
      id = key;
    }
    getRadioType();
    getCheckBoxStatus();
    var item            = {};
        item.date       =["Date", r('date').value];
        item.transType  =["Type", typeValue];
        item.catagory   =["Catagory", r('groups').value];
        item.amount     =["Amount", r('amount').value];
        item.checkBox   =["Is it a reccuring transaction:", checkBoxValue];
        item.notes      =["Notes", r('notes').value];
    localStorage.setItem(id, JSON.stringify(item));
    alert("Transaction Saved!");
    return item
  }
  
  var showData = function(data){
    if(localStorage.length === 0){
      alert("There is no data in Local Storage, static data function added!")
     autoFillData();
     showData();
    } else {
      var makeDiv = document.createElement("div");
      makeDiv.setAttribute("id", "data");
      var makeList = r('storedTransactions');
      makeList.innerHTML = "";
      makeDiv.appendChild(makeList);
      document.body.appendChild(makeDiv);
      r("data").style.display ="block"
      for(var i=0, len=localStorage.length; i<len; i++){
        var makeLi = document.createElement('li');
        var linksLi = document.createElement('li');
        makeList.appendChild(makeLi);
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value);
        var makeSubList = document.createElement('ul');
        makeLi.appendChild(makeSubList);
        makeLi.setAttribute('class', 'transaction ' + obj.catagory[1]);
        for(var s in obj){
          var makeSubLi = document.createElement('li');
          makeSubList.appendChild(makeSubLi);
          var optSubText = obj[s][0]+" "+obj[s][1];
          makeSubLi.innerHTML = optSubText;
          makeSubList.appendChild(linksLi);
        }
        makeItemLinks(localStorage.key(i), linksLi);
      }
    }
  }
  
  var autoFillData = function (){
    for(var j in json){
      var id = Math.floor(Math.random()*100001);
      localStorage.setItem(id, JSON.stringify(json[j]));
    }  
  }
  
  var makeItemLinks = function(key, linksLi){
    var editLink = document.createElement('a');
    editLink.href = "#";
    editLink.key = key;
    var editText = "Edit Transaction";
    editLink.onclick = (function() {editItem(key);});
    editLink.innerHTML = editText;
    linksLi.appendChild(editLink);
    var breakTag = document.createElement('br');
    linksLi.appendChild(breakTag);
    var deleteLink = document.createElement('a');
    deleteLink.href = "#";
    var deleteText = "Delete Transaction";
    deleteLink.onclick = (function() {deleteItem(key);});
    deleteLink.innerHTML = deleteText;
    linksLi.appendChild(deleteLink);
  }  
  
  var editItem = function(key){
    var value = localStorage.getItem(key);
    var item = JSON.parse(value);
    var submit = r('submit');
    r('date').value = item.date[1];
    var radios = document.forms[0].types;
    for(var i=0; i<radios.length; i++){
      if(radios[i].value == "Deposit" && item.transType[1] == "Deposit"){
        radios[i].setAttribute("checked", "checked");
      }else if(radios[i].value == "Withdraw" && item.transType[1] == "Withdraw"){
        radios[i].setAttribute("checked", "checked");
      }else if(radios[i].value == "Adjustment" && item.transType[1] == "Adjustment"){
        radios[i].setAttribute("checked", "checked");
      }else if(radios[i].value == "Transfer" && item.transType[1] == "Transfer"){
        radios[i].setAttribute("checked", "checked");
      }  
    }
    if(item.checkBox[1] == "Yes"){
      r('recurring').setAttribute("checked", "checked");
    }
    r('groups').value = item.catagory[1];
    r('amount').value = item.amount[1];
    r('notes').value = item.notes[1];
    
    submit.value = "Edit Transaction";
    submit.key = key;
    console.log('editItem');
    console.log(submit.key);
    submit.onclick = (function(evt) {validate(evt);});
  }
  
  var deleteItem = function(key){
    var ask = confirm("Are you sure you want to delete this Transaction?");
    if(ask){
      localStorage.removeItem(key);
      window.location.reload();
    }else{
      alert("Transaction was NOT deleted!")
    }
  }
  
  var clearData = function(){
    if(localStorage.length === 0){
      alert("There Are No Transactions Saved!")
    }else{
      localStorage.clear();
      alert("All Transactions Have Been Deleted!");
      window.location.reload();
      return false;
    }
  }
    
  var typeValue,sss
      checkBoxValue = "No"
      errMsg = r('errors');
      ;

  document.getElementById('showInfo').onclick = (function(evt) {showData(evt);});
  document.getElementById('clearData').onclick = (function(evt) {clearData(evt);});
  //document.getElementById('submit').onclick = (function(evt) {validate(evt);});
  
  


});