import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PollutionService } from '../../services/pollution';
import { Pollution } from '../../models/pollution.model';

@Component({
  selector: 'app-pollution-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pollution-form.html',
  styleUrls: ['./pollution-form.css']
})
export class PollutionFormComponent implements OnInit {
  pollution: Pollution = {
    type: '',
    localisation: '',
    description: '',
    gravite: 'Moyenne',
    date: new Date().toISOString().split('T')[0],
    statut: 'Signalée'
  };

  isEditMode: boolean = false;
  pollutionId: number | null = null;

  constructor(
    private pollutionService: PollutionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.pollutionId = Number(id);
      this.loadPollution(this.pollutionId);
    }
  }

  loadPollution(id: number): void {
    this.pollutionService.getPollutionById(id).subscribe({
      next: (data) => {
        this.pollution = data;
      },
      error: (error) => console.error('Erreur lors du chargement', error)
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.pollutionId) {
      this.pollutionService.updatePollution(this.pollutionId, this.pollution).subscribe({
        next: () => {
          alert('Pollution modifiée avec succès !');
          this.router.navigate(['/pollutions']);
        },
        error: (error) => console.error('Erreur lors de la modification', error)
      });
    } else {
      this.pollutionService.createPollution(this.pollution).subscribe({
        next: () => {
          alert('Pollution ajoutée avec succès !');
          this.router.navigate(['/pollutions']);
        },
        error: (error) => console.error('Erreur lors de la création', error)
      });
    }
  }
}