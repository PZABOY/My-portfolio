"use strict";

// main.js

// Global scope reference for inner span
let textInnerSpan;

// Filter projects by category
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        const categories = project.dataset.category.split(',').map(c => c.trim());
        const match = category === 'all' || categories.includes(category);
        project.style.display = match ? 'block' : 'none';
        project.classList.remove('fade-in');
        if (match) {
            setTimeout(() => project.classList.add('fade-in'), 10);
        }
    });
}

// DOM Ready actions
window.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Section reveal on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Typewriter effect
    const heroContent = document.querySelector(".hero-content");
    const container = document.createElement("div");
    container.className = "typewriter-container";

    const staticText = document.createElement("span");
    staticText.className = "static-text";
    staticText.textContent = "Hi I'm Eliav and I'm a: ";

    const typedSpan = document.createElement("span");
    typedSpan.className = "typed-word";

    textInnerSpan = document.createElement("span");
    textInnerSpan.className = "text";

    const cursorSpan = document.createElement("span");
    cursorSpan.className = "cursor blinking";
    cursorSpan.textContent = "|";

    typedSpan.appendChild(textInnerSpan);
    typedSpan.appendChild(cursorSpan);

    container.appendChild(staticText);
    container.appendChild(typedSpan);
    heroContent.insertBefore(container, heroContent.firstChild);

    const words = ["Developer", "Creator", "Problem Solver", "Full-Stack Wizard"];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const visibleText = isDeleting
            ? currentWord.substring(0, charIndex--)
            : currentWord.substring(0, charIndex++);

        textInnerSpan.textContent = visibleText;

        let delay = isDeleting ? 80 : 120;

        if (!isDeleting && charIndex === currentWord.length + 1) {
            delay = 1200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 300;
        }

        setTimeout(type, delay);
    }

    type();
});

const cvLink =
  document.querySelector('#cv-link') || 
  document.querySelector('.download-cv') || 
  document.querySelector('a[href="assets/files/EliavMendelsohnFullStackDeveloper.pdf"]'); // לפי href

if (cvLink) {
  cvLink.addEventListener('click', () => {
    console.log('Downloading CV: EliavMendelsohnFullStackDeveloper.pdf');
  });
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
});