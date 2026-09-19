import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../../core/services/acceso.service';
import { ModuloAcceso } from '../../core/models/acceso.model';

@Component({
  selector: 'app-sidebar',
  template: `
    <button class="hamburger" (click)="toggle()">
      <i class="bi bi-list"></i>
    </button>

    <div class="sidebar" [class.collapsed]="!abierto">
      <ul class="nav flex-column">
        <li *ngFor="let modulo of arbol">
          <a *ngIf="!modulo.hijos?.length" class="nav-link" [routerLink]="modulo.ruta" routerLinkActive="active">
            <i class="bi {{ modulo.icono }}"></i> {{ modulo.nombre }}
          </a>

          <div *ngIf="modulo.hijos?.length">
            <span class="nav-link parent-label">
              <i class="bi {{ modulo.icono }}"></i> {{ modulo.nombre }}
            </span>
            <ul class="submenu">
              <li *ngFor="let hijo of modulo.hijos">
                <a class="nav-link" [routerLink]="hijo.ruta" routerLinkActive="active">
                  <i class="bi {{ hijo.icono }}"></i> {{ hijo.nombre }}
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .hamburger {
      background: none;
      border: none;
      color: white;
      font-size: 1.4rem;
      padding: 0.5rem;
      cursor: pointer;
    }
    .sidebar {
      width: 260px;
      background: #2c3e50;
      transition: width 0.2s ease, opacity 0.2s ease;
      overflow: hidden;
    }
    .sidebar.collapsed {
      width: 0;
      opacity: 0;
    }
    .nav-link {
      color: #d8dee5;
      padding: 0.6rem 1.2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
    }
    .nav-link.active { background: #3498db; color: #fff; }
    .parent-label { opacity: 0.75; font-weight: 700; text-transform: uppercase; font-size: 0.78rem; }
    .submenu .nav-link { padding-left: 2.5rem; }
  `]
})
export class SidebarComponent implements OnInit {
  arbol: ModuloAcceso[] = [];
  abierto = true;

  constructor(private accesoService: AccesoService) {}

  ngOnInit(): void {
    this.accesoService.obtenerAccesos().subscribe({
      next: (modulos) => {
        this.arbol = this.construirArbol(modulos);
      }
    });
  }

  toggle(): void {
    this.abierto = !this.abierto;
  }

  private construirArbol(modulos: ModuloAcceso[]): ModuloAcceso[] {
    const mapa = new Map<number, ModuloAcceso>();
    modulos.forEach(m => mapa.set(m.id, { ...m, hijos: [] }));

    const raices: ModuloAcceso[] = [];
    modulos.forEach(m => {
      const nodo = mapa.get(m.id)!;
      if (m.idModuloPadre === null) {
        raices.push(nodo);
      } else {
        const padre = mapa.get(m.idModuloPadre);
        if (padre) padre.hijos!.push(nodo);
      }
    });

    return raices;
  }
}