@core @smoke
Feature: Framework Foundation
  As a developer or educator
  I want the core framework functionality to work
  So that I can build upon a stable foundation

  Background:
    Given the Jekyll development server is running
    And I am using a modern web browser

  @wip
  Scenario: Homepage loads successfully
    When I visit the homepage
    Then I should see the Noesis AI Tutor Framework title
    And the page should load without errors
    And the navigation menu should be present

  @wip  
  Scenario: Navigation works correctly
    Given I am on the homepage
    When I click on the "Subject" navigation link
    Then I should be taken to the subjects page
    And I should see a list of available subjects

  @wip
  Scenario: Subject pages are accessible
    Given I am on the subjects page
    Then I should see a list of available subjects
    And I should see an "Open AI Tutor" button if available
