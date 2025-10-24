import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PollutionService } from '../../services/pollution';
import { Pollution } from '../../models/pollution.model';

@Component({
  selector: 'app-pollution-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pollution-detail.html',
  styleUrls: ['./pollution-detail.css']
})
export class PollutionDetailComponent implements OnInit {
  pollution: Pollution | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pollutionService: PollutionService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPollution(id);
  }

  loadPollution(id: number): void {
    this.pollutionService.getPollutionById(id).subscribe({
      next: (data) => {
        this.pollution = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement', error);
        this.loading = false;
      }
    });
  }
}