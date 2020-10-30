
$(document).ready(function () {		
		load();
	});

	var li = $("#nav").children();
    //console.log("li", li); 
    //console.log(typeof(li)) ;
	li.click(function (e) {
		e.preventDefault();
		//alert("xx");      
        //console.log("$(this)", $(this));
        li.children().attr("class","");
        $(this).children().attr("class","active");       	  
    });
	

	$("#download").click(function(e){		
        $.ajax({
            type: "GET",
            url: "/week2/DownloadController.do",
            //contentType: "application/json; charset=utf-8",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
    		//data:{'按钮':$(this).attr("value")}, 
            dataType: "html",
            success: function (data) { 
            	$(".content").html(data);
            },
            error: function (error) {
                alert("error=" + error);
            }
        });
	});	
		
	function load(){
        $.ajax({
            type: "GET",
            url: "/week2/MainController.do",
            //contentType: "application/json; charset=utf-8",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
    		//data:{'按钮':$(this).attr("value")}, 
            dataType: "html",
            success: function (data) { 
            	$(".content").html(data);
                //alert("data.d=" + data.d);
            },
            error: function (error) {
                alert("error=" + error);
            }
        });
	}

 $("#return").click(function(e){
	e.preventDefault();   
	        $.ajax({
            type: "GET",
            url: "/week2/LoginController.do",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            dataType: "text",
            success: function (data) { 
            },
            error: function (error) {
                alert("error=" + error);
            }
        });
	 var d = new Date();
	 var saveTime = -1;// cookie保存时间（单位：天）
	 d.setDate(d.getDate() + saveTime);
	 document.cookie = "userInfo = 0;path = /week2/src;expires=" + d.toGMTString();   
	window.location.href = "login.html";   
 });
