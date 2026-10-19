/**
 * AMMOS by Blue Eye Luxury — Interactive UI Script (Step W1)
 * - Mobile hamburger navigation drawer open/close toggle
 * - Interactive "For Captains" vs "For Crew" role tab switcher & highlighter
 * - FAQ accordion expand/collapse handler (for support.html)
 * - Mock form submission handler (for support.html & delete-account.html)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================================
     1. Mobile Hamburger Menu Open/Close Toggle
     ======================================================================== */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    const closeMobileMenu = () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close drawer when clicking a navigation link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close drawer when clicking outside the header
    document.addEventListener('click', (event) => {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close drawer on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMobileMenu();
        navToggle.focus();
      }
    });
  }

  /* ========================================================================
     2. Interactive Tab Switcher: "For Captains" vs "For Crew"
     ======================================================================== */
  const roleTabButtons = document.querySelectorAll('[data-role-tab]');
  const rolePanels = document.querySelectorAll('[data-role-panel]');

  if (roleTabButtons.length > 0 && rolePanels.length > 0) {
    const activateRoleTab = (selectedRole) => {
      roleTabButtons.forEach((btn) => {
        const isTarget = btn.getAttribute('data-role-tab') === selectedRole;
        btn.classList.toggle('active', isTarget);
        btn.setAttribute('aria-selected', String(isTarget));
      });

      rolePanels.forEach((panel) => {
        const panelRole = panel.getAttribute('data-role-panel');
        if (selectedRole === 'all') {
          panel.classList.add('is-highlighted');
          panel.classList.remove('is-dimmed');
        } else if (panelRole === selectedRole) {
          panel.classList.add('is-highlighted');
          panel.classList.remove('is-dimmed');
        } else {
          panel.classList.remove('is-highlighted');
          panel.classList.add('is-dimmed');
        }
      });
    };

    roleTabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetRole = btn.getAttribute('data-role-tab');
        if (targetRole) {
          activateRoleTab(targetRole);
        }
      });
    });

    // Allow clicking directly on a role card to highlight its tab
    rolePanels.forEach((panel) => {
      panel.addEventListener('click', () => {
        const panelRole = panel.getAttribute('data-role-panel');
        if (panelRole) {
          activateRoleTab(panelRole);
        }
      });
    });
  }

  /* ========================================================================
     3. FAQ Accordion Expand/Collapse Handler (for upcoming support.html)
     ======================================================================== */
  const faqQuestions = document.querySelectorAll('.faq-question');

  if (faqQuestions.length > 0) {
    faqQuestions.forEach((questionBtn) => {
      questionBtn.addEventListener('click', () => {
        const parentItem = questionBtn.closest('.faq-item');
        if (!parentItem) return;

        const isOpen = parentItem.classList.toggle('is-open');
        questionBtn.setAttribute('aria-expanded', String(isOpen));
      });
    });
  }

  /* ========================================================================
     4. Mock Form Submit Handler (for support.html & delete-account.html)
     ======================================================================== */
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      let confirmationEl = form.querySelector('.form-confirmation');
      if (!confirmationEl && form.parentElement) {
        confirmationEl = form.parentElement.querySelector('.form-confirmation');
      }

      if (!confirmationEl) {
        confirmationEl = document.createElement('div');
        confirmationEl.className = 'form-confirmation';
        confirmationEl.setAttribute('role', 'status');
        confirmationEl.setAttribute('aria-live', 'polite');
        form.appendChild(confirmationEl);
      }

      // Apply CSS variable styling explicitly in addition to .form-confirmation class
      confirmationEl.style.backgroundColor = 'var(--color-surface-mint)';
      confirmationEl.style.borderColor = 'var(--color-primary)';
      confirmationEl.style.color = 'var(--color-primary)';

      const customMessage = form.getAttribute('data-success-message');
      const isDeleteForm =
        form.id === 'delete-account-form' ||
        form.classList.contains('delete-account-form');

      if (customMessage) {
        confirmationEl.textContent = customMessage;
      } else if (isDeleteForm) {
        confirmationEl.textContent =
          'Your AMMOS account deletion request has been received by Blue Eye Luxury. Our privacy team will verify your request and permanently erase your account data within 30 days.';
      } else {
        confirmationEl.textContent =
          'Thank you for contacting AMMOS Support at Blue Eye Luxury. Your message has been received and our team will respond to your email shortly.';
      }

      confirmationEl.classList.add('is-visible');
      form.reset();
    });
  });
});

