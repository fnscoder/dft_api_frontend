var _BASE_ = "https://cors-anywhere.herokuapp.com/https://dft-api-fnsouza.herokuapp.com/api/";

var _AUTH_ = "auth/token/";
var _SHOES_ = "shoes/"


var getToken = function(){
    $("#btntoken").click(function(){
        user = $("#user").val();
        pass = $("#pass").val();    
        $.ajax({
            url: _BASE_ + _AUTH_,
            type: 'POST',
            dataType: 'json',
            crossDomain: true,
            headers: {'Access-Control-Allow-Origin': '*'},
            data : {
                username : user,
                password : pass
            },
            success : function(data) {
                $("#token").val(data.token)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                json = JSON.parse(jqXHR.responseText)
                $("#token").val('error: ' + json.non_field_errors[0]);
            }  
          })
    })
}

var getListShoes = function(){    
    $("#btngetshoes").click(function(){ 
        token = $("#token").val();   
        $.ajax({
            url: _BASE_ + _SHOES_,
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            headers: {'Authorization': 'JWT ' + token},
            success : function(data) {
                pretty = JSON.stringify(data, undefined, 4);
                console.log(pretty)
                $("#listShoes").val(pretty)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                $("#listShoes").val(jqXHR.responseText)
            }  
          })
    })
}

var addShoe = function(){     
    $("#btnaddshoe").click(function(){
        token = $("#token").val();
        brand = $("#brand").val();
        color = $("#color").val();
        size = $("#size").val();
        price = $("#price").val();
        quantity = $("#quantity").val();    
        $.ajax({
            url: _BASE_ + _CLIENT_,
            type: 'POST',
            dataType: 'json',
            crossDomain: true,
            headers: {'Authorization': 'JWT ' + token},
            data : {
                brand: brand,
                color: color,
                size: size,
                price: price,
                quantity: quantity
            },
            success : function(data) {
                pretty = JSON.stringify(data, undefined, 4);
                $("#listShoes").val(pretty)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                $("#listShoes").val(jqXHR.responseText)
            }  
          })
    })
}

$(document).ready(function(){
	    
    getToken();  
    getListShoes();
    addShoe();
    
});