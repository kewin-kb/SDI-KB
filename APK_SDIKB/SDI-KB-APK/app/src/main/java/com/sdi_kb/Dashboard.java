
package com.sdi_kb;

import android.os.Bundle;
import android.view.Gravity;
import android.widget.LinearLayout;
import android.widget.Toast;
import android.widget.TextView;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;

import com.google.android.material.navigation.NavigationView;

public class Dashboard extends AppCompatActivity {

    DrawerLayout drawerLayout;
    NavigationView navigationView;
    LinearLayout menuHamburguesa;

    @Override
    protected void onCreate(Bundle savedInstanceState)

    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        drawerLayout = findViewById(R.id.drawerLayout);
        navigationView = findViewById(R.id.navigationView);
        TextView menuHamburguesa = findViewById(R.id.menuHamburguesa);

        // Abrir menú lateral
        menuHamburguesa.setOnClickListener(v ->
                drawerLayout.openDrawer(GravityCompat.START)
        );

        // Acciones de las opciones del menú
        navigationView.setNavigationItemSelectedListener(item -> {

            int id = item.getItemId();

            if (id == R.id.nav_inicio) {
                Toast.makeText(this, "Inicio", Toast.LENGTH_SHORT).show();

            } else if (id == R.id.nav_equipos) {
                Toast.makeText(this, "Equipos", Toast.LENGTH_SHORT).show();

            } else if (id == R.id.nav_usuarios) {
                Toast.makeText(this, "Usuarios", Toast.LENGTH_SHORT).show();

            } else if (id == R.id.nav_roles) {
                Toast.makeText(this, "Roles", Toast.LENGTH_SHORT).show();

            } else if (id == R.id.nav_reportes) {
                Toast.makeText(this, "Reportes", Toast.LENGTH_SHORT).show();

            } else if (id == R.id.nav_logout) {
                finish();
                return true;
            }

            drawerLayout.closeDrawer(Gravity.START);
            return true;
        });
    }
}
