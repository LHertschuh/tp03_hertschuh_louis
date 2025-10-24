export interface Pollution {
  id?: number;
  type: string;
  localisation: string;
  description: string;
  gravite: 'Faible' | 'Moyenne' | 'Élevée' | 'Critique';
  date: string;
  statut: 'Signalée' | 'En cours' | 'Résolue';
}