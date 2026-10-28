package Controller;

import DAO.LoginDAO;
import Model.LoginModel;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "LoginController", urlPatterns = {"/LoginController"})
public class LoginController extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1. Obtener parámetros directamente del formulario
        String usuario = request.getParameter("usuario");
        String clave = request.getParameter("contrasena");

        LoginModel lm = new LoginModel();
        LoginDAO lg = new LoginDAO();

        lm.setUsuario(usuario);
        lm.setClave(clave);

        int rspta = 0;

        try {

            rspta = lg.validarLogin(lm);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        if (rspta > 0) {
            jakarta.servlet.http.HttpSession session = request.getSession();
            session.setAttribute("usuarioLogueado", usuario);
            response.sendRedirect("index.jsp");
        }
        else {
            response.sendRedirect("login.jsp?rspta=0");
        }
        
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
}
