@student @learning
Feature: Student Learning Experience
  As a student
  I want to access and interact with AI tutors
  So that I can receive guided learning support

  Background:
    Given I am a student accessing the framework
    And I want to learn about a specific subject

  @wip
  Scenario: Find and access subject tutors
    Given I am on the homepage
    When I browse the available subjects
    Then I should see subjects organized clearly
    And I should be able to identify which subjects have active tutors
    And I should be able to access tutor links easily

  @wip
  Scenario: Understand tutor interaction guidelines
    Given I am on a subject page with an active tutor
    When I view the tutor usage instructions
    Then I should see clear guidelines for effective interaction
    And I should understand the Socratic questioning approach
    And I should know how to save conversations for teacher review

  @wip
  Scenario: Access learning resources
    Given I am exploring a subject area
    When I look for additional learning materials
    Then I should find relevant assignments and resources
    And I should see links to related topics
    And I should understand how to progress through the curriculum
