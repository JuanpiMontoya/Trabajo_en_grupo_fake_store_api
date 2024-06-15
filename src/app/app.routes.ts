import { Routes, RouterModule  } from '@angular/router';
import { NgModule } from '@angular/core';
//Importamos todos nuestros componentes
import { InicioComponent } from './paginas/inicio/inicio.component'; // Componente inicio 
import { TiendaComponent } from './paginas/tienda/tienda.component'; // Componente tienda
import { NosotrosComponent } from './paginas/nosotros/nosotros.component'; // Componente nosotros
import { PaginaNoEncontradaComponent } from './paginas/pagina-no-encontrada/pagina-no-encontrada.component'; // Componente pág. no encontrada
import { DetallesComponent } from './paginas/detalles/detalles.component'; // Componente detalles
import { IniciarSesionComponent } from './paginas/iniciar-sesion/iniciar-sesion.component'; // Componente Iniciar sesion
import { CrearCuentaComponent } from './paginas/crear-cuenta/crear-cuenta.component'; // Componente Crear cuenta

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'tienda', component: TiendaComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'iniciar-sesion', component: IniciarSesionComponent },
    { path: 'crear-cuenta', component: CrearCuentaComponent },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'detalles/:id', component: DetallesComponent },
    { path: '**', component: PaginaNoEncontradaComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }