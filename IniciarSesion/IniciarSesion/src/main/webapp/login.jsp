<%-- 
    Document   : login
    Created on : 23/09/2026, 3:21:58 p. m.
    Author     : Sistemas2L
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Inicar sesion</title>
    </head>
    <body>
         <h2>Inicar sesion</h2>
        <form name="login" action="LoginServlet" method="POST">
            <input type="text" name="nombre" placeholder="Ingresa tu nombre:" />
             <input type="password" name="password" placeholder="Ingresa tu contraseña:" />
             <input type="submit" value="Ingresar" name="login" />
        </form>
        <hr>
    </body>
</html>
