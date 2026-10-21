class PracticeFormPage {
  fill(data) {
    cy.get('#firstName').type(data.firstName);
    cy.get('#lastName').type(data.lastName);
    cy.get('#userEmail').type(data.email);
    cy.contains('#genterWrapper label', data.gender).click();
    cy.get('#userNumber').type(data.mobile);
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select(String(data.birth.year));
    cy.get('.react-datepicker__month-select').select(String(data.birth.month));
    cy.get(
      `.react-datepicker__day--${String(data.birth.day).padStart(3, '0')}:not(.react-datepicker__day--outside-month)`,
    ).click();
    data.subjects.forEach((subject) => {
      cy.get('#subjectsInput').type(subject);
      cy.contains(
        '.subjects-auto-complete__option',
        new RegExp(`^${subject}$`),
      ).click();
    });
    data.hobbies.forEach((hobby) =>
      cy.contains('#hobbiesWrapper label', hobby).click(),
    );
    cy.get('#uploadPicture').selectFile(`cypress/fixtures/${data.fileName}`);
    cy.get('#currentAddress').type(data.address);
    cy.get('#state').scrollIntoView().click();
    cy.contains('[id^="react-select-"][id*="-option-"]', data.state).click();
    cy.get('#city').click();
    cy.contains('[id^="react-select-"][id*="-option-"]', data.city).click();
  }

  submit() {
    cy.get('#submit').scrollIntoView().click();
  }

  assertSubmitted(data) {
    cy.get('.modal-content')
      .should('be.visible')
      .within(() => {
        cy.get('#example-modal-sizes-title-lg').should(
          'have.text',
          'Thanks for submitting the form',
        );
        const expected = {
          'Student Name': `${data.firstName} ${data.lastName}`,
          'Student Email': data.email,
          Gender: data.gender,
          Mobile: data.mobile,
          'Date of Birth': data.birth.display,
          Subjects: data.subjects.join(', '),
          Hobbies: data.hobbies.join(', '),
          Picture: data.fileName,
          Address: data.address,
          'State and City': `${data.state} ${data.city}`,
        };
        Object.entries(expected).forEach(([label, value]) => {
          cy.contains('td', new RegExp(`^${label}$`))
            .next('td')
            .should('have.text', value);
        });
      });
  }

  closeModal() {
    cy.get('.modal').should('be.visible').type('{esc}');
    cy.get('.modal-content').should('not.exist');
  }
}

export default new PracticeFormPage();
