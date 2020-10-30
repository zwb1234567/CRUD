<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
<title></title>
 <link rel="stylesheet" type ="text/css" href="CSS/mainView.css" >
</head>
<body>
	<div class = "content_left">
		<div class = "dropdown_main dropdown ">
			<button class="btn   dropdown-toggle1 btn-default  thisopen" type="button" id="btn-CarManager" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    车位管理
		    <span>&nbsp&nbsp&nbsp</span>
		    <span class="glyphicon glyphicon-menu-right selected"></span>
		  	</button>
		</div>
		<div class = "dropdown_main dropdown">
			<button class="btn   dropdown-toggle1 btn-default" type="button" id="btn-Usermanager" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    用户管理
		    <span>&nbsp&nbsp&nbsp</span>
		    <span class="glyphicon glyphicon-menu-right"></span>
		  	</button>
		</div>
		<div class = "dropdown_main dropdown">
			<button class="btn   dropdown-toggle1 btn-default" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    收费管理
		    <span>&nbsp&nbsp&nbsp</span>
		    <span class="glyphicon glyphicon-menu-right"></span>
		  	</button>
		</div>
		<div class = "dropdown_main dropdown">
			<button class="btn   dropdown-toggle1 btn-default" type="button" id="dropdownMenu4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    交互管理
		    <span>&nbsp&nbsp&nbsp</span>
		    <span class="glyphicon glyphicon-menu-right"></span>
		  	</button>
		</div>		
		<div class = "dropdown_main dropdown">
			<button class="btn   dropdown-toggle1 btn-default" type="button" id="dropdownMenu5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    系统管理
		    <span>&nbsp&nbsp&nbsp</span>
		    <span class="glyphicon glyphicon-menu-right"></span>
		  	</button>
		</div>						
	</div>	
	<div  class = "content_right">	
    	<div class="panel panel-default panels">
            <div class="panel-heading">查询条件</div>
            <div class="panel-body">
                <form id="formSearch" class="form-horizontal">
                    <div class="form-group" style="margin-top:5px">
                        <label class="control-label col-sm-2" for="txt_search_departmentname">车牌号：</label>
                        <div class="col-sm-3">
                            <input type="text" class="form-control" id="txt_search_CNO" placeholder="模糊搜索...">
                        </div>
                        <label class="control-label col-sm-2" for="txt_search_departmentname">车主姓名：</label>
                        <div class="col-sm-3">
                            <input type="text" class="form-control" id="txt_search_CarPerson" placeholder="模糊搜索...">
                        </div>                        
                        <div class="col-sm-2" style="text-align:left;">
                            <button type="button" style="margin-left:40px" id="btn_query" class="btn btn-success">查询</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div id="toolbar" class="btn-group">
            <button id="btn_add" type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal_add">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
            </button>
            <button id="btn_edit" type="button" class="btn btn-primary" >
                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改
            </button>
            <button id="btn_delete" type="button" class="btn btn-danger">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
            </button>
        </div>
        <table id="tb_departments"></table>
	</div>
	
	 <!--新增模态框-->
	<div class="modal fade add_modle" tabindex="-1" role="dialog" id = "myModal_add">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" style = "color:white">新增</h4>
	      </div>
	      <div class="modal-body">
 	         <div class="row">
              	<label for="AddModelCNO" class="col-sm-3 col-sm-offset-2 control-label">车牌号：</label>
              	<div class="col-sm-6" style="margin-left:-50px;">
              	<input type="text" class="form-control" id="AddModelCNO" placeholder="车牌号" name="AddModelCNO">
              	</div>	         
            </div>
            <div class="row">
              	<label for="AddModelCarNum" class="col-sm-3 col-sm-offset-2 control-label">车位号：</label>
              	<div class="col-sm-6" style="margin-left:-50px;">
              	<input type="text" class="form-control" id="AddModelCarNum" placeholder="车位号" name="AddModelCarNum">
              	</div>	         
            </div>
            <div class="row">
              	<label for="AddModelCarPerson" class="col-sm-3 col-sm-offset-2 control-label">车主姓名：</label>
              	<div class="col-sm-6" style="margin-left:-50px;">
              	<input type="text" class="form-control" id="AddModelCarPerson" placeholder="车主" name="AddModelCarPerson">
              	</div>	         
            </div>
            <div class="row">
              	<label for="AddModelCarType" class="col-sm-3 col-sm-offset-2 control-label">车位类型：</label>
              	<div class="col-sm-6" style = "margin-left:-50px;">
              	<!-- <input type="text" class="form-control" id="AddModelCarType" placeholder="车位类型" name="AddModelCarType"> -->
				    <select class="form-control" id = "AddModelCarType">
				        <option>临时车位</option>
				        <option>长期车位</option>
				    </select>  
				  </div>          				     		       
            </div>
            <div class="row">
              	<label for="AddModelCarDicretion" class="col-sm-3 col-sm-offset-2 control-label">车位方向：</label>
              	<div class="col-sm-6" style = "margin-left:-50px;">              
				    <select class="form-control" id = "AddModelCarDicretion">
				        <option>A区</option>
				        <option>B区</option>
				        <option>C区</option>
				    </select>  
              	</div>            				     		       
            </div>                                                  
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary" id = "addModelButton">确认</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	<!--修改模态框-->
	<div class="modal fade add_modle" tabindex="-1" role="dialog" id = "myModal_update">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" style = "color:white">修改</h4>
	      </div>
	      <div class="modal-body">
	        <div class="row">
              	<label for="UpdateModelCNO" class="col-sm-3 col-sm-offset-2 control-label">车牌号：</label>
              	<div class="col-sm-6" style="margin-left:-50px;">
              	<input type="text" class="form-control" id="UpdateModelCNO" placeholder="车牌号" name="UpdateModelCNO"  disabled>
              	</div>	         
            </div>
            <div class="row">
              	<label for="UpdateModelCarNum" class="col-sm-3 col-sm-offset-2 control-label">车位号：</label>
              	<div class="col-sm-6" style="margin-left:-50px;">
              	<input type="text" class="form-control" id="UpdateModelCarNum" placeholder="车位号" name="UpdateModelCarNum">
              	</div>	         
            </div>
            <div class="row">
              	<label for="UpdateModelCarPerson" class="col-sm-3 col-sm-offset-2 control-label">车主姓名：</label>
              	<div class="col-sm-6" style="margin-left:-50px;">
              	<input type="text" class="form-control" id="UpdateModelCarPerson" placeholder="车主" name="UpdateModelCarPerson">
              	</div>	         
            </div>
            <div class="row">
              	<label for="UpdateModelCarType" class="col-sm-3 col-sm-offset-2 control-label">车位类型：</label>
              	<div class="col-sm-6" style = "margin-left:-50px;">
              	<!-- <input type="text" class="form-control" id="AddModelCarType" placeholder="车位类型" name="AddModelCarType"> -->
				    <select class="form-control" id = "UpdateModelCarType">
				        <option>临时车位</option>
				        <option>长期车位</option>
				    </select>  
				  </div>          				     		       
            </div>
            <div class="row">
              	<label for="UpdateModelCarDicretion" class="col-sm-3 col-sm-offset-2 control-label">车位方向：</label>
              	<div class="col-sm-6" style = "margin-left:-50px;">              
				    <select class="form-control" id = "UpdateModelCarDicretion">
				        <option>A区</option>
				        <option>B区</option>
				        <option>C区</option>
				    </select>  
              	</div>            				     		       
            </div> 
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary" id = "UpdateModelButton">确认</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	<!-- 删除模态框 -->
	<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id = "myModal_delete">
	  <div class="modal-dialog modal-sm" role="document">
	    <div class="modal-content" style = "border:none">
	     <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" style = "color:white">删除确认</h4>
	      </div>
	      <div class="modal-body">
	        <p style = "margin:0 0 0 83px">是否确认删除?</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-success" data-dismiss="modal" id = "delete_ok">确认</button>
	      </div> 
	    </div>
	  </div>
	</div>
</body>
<script> 
    $.getScript("JS/main_index.js", function () { });   
</script>

</html>