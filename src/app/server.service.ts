import { Injectable } from '@angular/core';
import  { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor() {
  }
  // private paris=[]
  private paris = [
    {
      id: 0,
      titre: 'Paris 1',
      prix: 2000,
      createdAt: '20.12.19',
      auteur: 'Mr x',
      debut: '21.12.19',
      fin: '25.12.19',
      status: 'en cours',
      description: "Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire",
      profil: "http://lorempixel.com/400/200",
      participants: [
        {
          id: 2,
          nom: 'Mr y'
        },
        {
          id: 3,
          nom: 'Mr k'
        },
        {
          id: 4,
          nom: 'Mr Z'
        }
      ]
    },
    {
      id: 5,
      titre: 'Paris 5',
      prix: 2000,
      createdAt: '03.05.19',
      auteur: 'Mr pinochio',
      debut: '30.01.2020',
      fin: '01.02.2020',
      description: "Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire",
      profil: "http://lorempixel.com/400/200",
      status: 'en cours',
      participants: [
        {
          id: 2,
          nom: 'Mr y'
        }
      ]
    }
    
  ]
  parisSubscription = new Subject();
  getparis() {
    this.parisSubscription.next(this.paris)
  }
  sutoto() {
    this.getparis()
  }
}
