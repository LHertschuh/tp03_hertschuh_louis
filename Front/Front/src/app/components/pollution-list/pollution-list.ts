import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PollutionService } from '../../services/pollution';
import { Pollution } from '../../models/pollution.model';

@Component({
  selector: 'app-pollution-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pollution-list.html',
  styleUrls: ['./pollution-list.css']
})
export class PollutionListComponent implements OnInit {
  pollutions: Pollution[] = [];
  filteredPollutions: Pollution[] = [];
  
  // Filtres
  filterType: string = '';
  filterGravite: string = '';
  filterStatut: string = '';

  constructor(private pollutionService: PollutionService) { }

  ngOnInit(): void {
    this.loadPollutions();
  }

  loadPollutions(): void {
    this.pollutionService.getAllPollutions().subscribe({
      next: (data) => {
        this.pollutions = data;
        this.filteredPollutions = data;
      },
      error: (error) => console.error('Erreur lors du chargement', error)
    });
  }

  applyFilters(): void {
    this.filteredPollutions = this.pollutions.filter(pollution => {
      return (!this.filterType || pollution.type === this.filterType) &&
             (!this.filterGravite || pollution.gravite === this.filterGravite) &&
             (!this.filterStatut || pollution.statut === this.filterStatut);
    });
  }

  deletePollution(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pollution ?')) {
      this.pollutionService.deletePollution(id).subscribe({
        next: () => {
          this.loadPollutions();
        },
        error: (error) => console.error('Erreur lors de la suppression', error)
      });
    }
  }

  resetFilters(): void {
    this.filterType = '';
    this.filterGravite = '';
    this.filterStatut = '';
    this.filteredPollutions = this.pollutions;
  }
}