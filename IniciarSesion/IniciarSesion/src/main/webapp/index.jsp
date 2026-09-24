<%-- 
    Document   : index.jsp
    Created on : 23/09/2026, 3:18:43 p. m.
    Author     : Sistemas2L
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%

    HttpSession sesion = request.getSession(false);
    String usuario = (sesion != null) ? (String) sesion.getAttribute("usuarioLogueado") : null;
    if (usuario == null) {
        response.sendRedirect("login.jsp");
        return;
    }
%>


<!DOCTYPE html>

<html>
    <head>
        <title>Inicio - SDI-KB</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>

        <aside class="fixed inset-y-0 left-0 w-60 bg-blue-600 h-screen grid grid-rows-10">

            <div class="items-center row-span-1">
                <img src="img/LOGO.png" alt="Logo" class="w-50 h-15 brightness-0 invert pt-5">
            </div>

            <div class="flex row-span-8  py-5 items-center justify-center">
                <ul class="flex-col w-full">            
                    <li class="hover:bg-blue-300 transition-colors bg-gray-50 rounded-l-xl">
                        <a href="/IniciarSesion" class="flex items-center gap-4 p-4">
                            <img src="img/inicio.svg" class="w-8 h-8">
                            <span class="text-black font-bold">Dashboard</span>
                        </a>
                    </li>

                    <li class="hover:bg-blue-300 rounded-l-xl">
                        <a href="#" class="flex items-center gap-4 p-4">
                            <img src="img/inventario.svg" class="w-8 h-8  brightness-0 invert">
                            <span class="text-white font-bold">Inventario</span>
                        </a>
                    </li>

                    <li class="hover:bg-blue-300 transition-colors  rounded-l-xl">
                        <a href="#" class="flex items-center gap-4 p-4">
                            <img src="img/usuario.svg" class="w-8 h-8 brightness-0 invert">
                            <span class="text-white font-bold">Usuario</span>
                        </a>
                    </li>

                    <li class="hover:bg-blue-300 transition-colors  rounded-l-xl">
                        <a href="#" class="flex items-center gap-4 p-4">
                            <img src="img/configuracion.svg" class="w-8 h-8 brightness-0 invert">
                            <span class="text-white font-bold">Configuración</span>
                        </a>
                    </li>

                    <li class="hover:bg-blue-300 transition-colors  rounded-l-xl">
                        <a href="#" class="flex items-center gap-4 p-4">
                            <img src="img/alerta.svg" class="w-8 h-8 brightness-0 invert">
                            <span class="text-white font-bold">Alertas</span>
                        </a>
                    </li>

                </ul>
            </div>
            <div class=" row-span-1 text-center content-end mb-2">
                <a href="login.jsp">
                    <button class="bg-gray-200 p-2 rounded-xl">Cerrar sesión</button>
                </a>
            </div>
        </aside>
    </body>
</html>
