package controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import dao.CRUDUserDao;

/**
 * Servlet implementation class DeleteUserController
 */
@WebServlet("/DeleteUserController.do")
public class DeleteUserController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteUserController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String str = request.getParameter("rows");
		//System.out.println(str);
		JsonArray Jarray = new JsonParser().parse(str).getAsJsonArray();
		CRUDUserDao dao = new CRUDUserDao();
		boolean flag = false;
		for(JsonElement obj : Jarray )
		{
			String userid = obj.getAsJsonObject().get("userName").getAsString();			
			if(dao.deleteByUserName(userid))
			{flag = true;}
		}
		if(flag)
		{
			out.print("success");
		}
		else{
			out.print("error");
		}
		out.close();
		dao.close();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
	}

}
