<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">      
    <link rel="stylesheet" type ="text/css" href="bootstrap/css/bootstrap.css" >  
	<link rel="stylesheet" type ="text/css" href="bootstrap/css/bootstrap-table.css" >
	<link rel="stylesheet" type ="text/css" href="bootstrap/css/toastr.min.css" >
	<link rel="stylesheet" type ="text/css" href="CSS/main.css" >
    <script src="bootstrap/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="bootstrap/js/bootstrap-table.js"></script>
    <script src="bootstrap/js/toastr.min.js"></script>    
    <script src="bootstrap/js/bootstrap-table-zh-CN.js"></script>         
    <script src="bootstrap/vue.min.js"></script>
   
<title>系统主页</title>
</head>
<body>
 <%-- <p>${success.userName}<p> --%>
 <div class = "header">
 	<span class = "span1">欣欣停车场管理系统</span>
    <span class = "span2" >欢迎您：${success.chrName}<a href = "" id = "return">[安全退出]</a></span>
 </div>
<ul id="nav" class="nav"> 
  <li><a class ="active" id = "main"  onclick = "load()">主页</a></li>
  <li><a id = "download" href="">下载</a></li>  
  <li><a href="">待定</a></li>
  <li><a href="">待定</a></li>
  <li><a href="">待定</a></li>
  <li><a href="">待定</a></li>
  <li><a href="">待定</a></li>
  <li><a href="">待定</a></li> 
  <li id ="about"><a href="">关于</a></li>
</ul>

<div class = "content">

</div>
<script> 
    $.getScript("JS/main.js", function () { });   
</script>
</body>
</html>