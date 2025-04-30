import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements AfterViewInit {
  textColorClass = 'text-white'; // valeur par défaut

  private whiteTextSections = ['home','service2']; // les sections où le texte doit être blanc

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            this.textColorClass = this.whiteTextSections.includes(id)
              ? 'text-white'
              : 'text-blue-800';
          }
        });
      },
      { threshold: 0.6 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });
  }
}
