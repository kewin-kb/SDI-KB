/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package login.crud;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author Kewin
 */
public class CRUD {

    Statement stmt = null;
    ResultSet rs = null;

    public void listar(Statement stmt) throws SQLException {
        rs = stmt.executeQuery("SELECT * FROM usuarios");
        while (rs.next()) {
            String nombre = rs.getString("nombre_completo");
            int area = rs.getInt("id");
            System.out.println("-nombre:" + nombre + " area:" + area);
        };

    }

    public void crear(Statement stmt) throws SQLException {
        stmt.execute("INSERT INTO `usuarios`(`id`,`nombre_completo`,`cedula`,`Area`,`Cargo`) VALUES (NULL, 'Diego Valbuena',10245125,2,7);");
        listar(stmt);
    }

    public void actualizar(Statement stmt) throws SQLException {
        stmt.executeUpdate("UPDATE `usuarios` SET `nombre_completo` = 'Anderson Lopezz' WHERE `usuarios`.`id`=1");
        listar(stmt);
    }

    public void eliminar(Statement stmt) throws SQLException {
        stmt.execute("DELETE FROM usuarios WHERE `usuarios`.`nombre_completo`='Diego Valbuena'");
        listar(stmt);
    }

}
