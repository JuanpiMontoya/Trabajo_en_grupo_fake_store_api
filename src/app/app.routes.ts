import { Routes, RouterModule  } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { TiendaComponent } from './paginas/tienda/tienda.component';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';
import { PaginaNoEncontradaComponent } from './paginas/pagina-no-encontrada/pagina-no-encontrada.component';
import { DetallesComponent } from './paginas/detalles/detalles.component';
import { IniciarSesionComponent } from './paginas/iniciar-sesion/iniciar-sesion.component';
import { CrearCuentaComponent } from './paginas/crear-cuenta/crear-cuenta.component';
import { NgModule } from '@angular/core';


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