//Zachary Crosser
//Project 3
//MiU Term 1209
//Zachary Crosser

var parseForm = function(data){
  //Form Data
  console.log(data);
};

$(document).ready(function(){
  
  var tform = $('#transform'),
      transerrorslink = $('#transerrorslink')
  ;
  
  tform.validate({
    invalidHandler: function(form, validator){
      transerrorslink.click();
      var html = '';
      for(var key in validator.submitted){
       var label = $('label[for^="'+ key +'"]').not('generated');
       var legend = label.closest('fieldset').find('.ui-controlgroup-label');
       var fieldName = legend.length ? legend.text() : label.text();
       html += '<li>' + fieldName + '</li>';
      };
      $('#transerrors ul').html(html);
    }, 
    submitHandler: function(){
      var data = tform.serializeArray();
      parseForm(data);
    }
  });
  
});