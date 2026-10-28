/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package login.crud;

import login.crud.CRUD;
import login.crud.Conector;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author Sistemas2L
 */
public class principal {

    /**
     * @param args the command line arguments
     * @throws java.sql.SQLException
     */
    public static void main(String[] args) throws SQLException {
        Conector conector = new Conector();
        CRUD crud = new CRUD();
        Connection conn = conector.conecta();
        Statement stmt = conn.createStatement();
        crud.listar(stmt);
        System.out.println("----------------");
        crud.crear(stmt);
        System.out.println("----------------");
        crud.actualizar(stmt);
        System.out.println("----------------");
        crud.eliminar(stmt);
    }

}
