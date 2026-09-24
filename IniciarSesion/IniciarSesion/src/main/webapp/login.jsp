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
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Inicar sesion</title>
        <% String rspta="";
        if(request.getParameter("rspta")!=null){
            int r=Integer.parseInt(request.getParameter("rspta"));
            if(r==0){
                rspta="Error: Validar datos ingresados";
            }
        }
        %>
    </head>
    <body class="bg-blue-700">
        <div class="flex items-center justify-center h-screen">
            <div class="bg-white p-5 rounded-xl">
                <div class="flex justify-center border-b-4 border-gray-950"><img src="img/LOGO.png"></div>
                <form method="post" action="LoginController">
                <div class="grid p-2">
                    <span class="text-xl">Usuario:</span>
                    <input type="text" name="usuario" class="bg-gray-200 text-xl rounded-xl p-2 " id="usuario"placeholder="Introduce usuario..." >
                    </br>
                    <span class="text-xl">Contraseña:</span>
                    <input type="password" name="contrasena"class="bg-gray-200 text-xl rounded-xl p-2 " id ="clave" placeholder="Introduce contraseña...">
                </div>
                 

                <div class="rounded-xl text-center">
                    <input type="submit" class="bg-blue-700 px-5 rounded-xl text-xl text-white p-2 text-center border-2
                            hover:bg-gray-50
                            hover:text-black
                            hover:border-2
                            hover:border-gray-950
                            " value="Iniciar sesión" name="ingresar">
                    <p class="bg-red p-1 text-xl text-red-500 "><%=rspta %> </p>
                </div>
                 </form>   
            </div>
        </div>
    </form>
    <hr>
</body>
</html>
