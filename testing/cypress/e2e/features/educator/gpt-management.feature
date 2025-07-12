@educator @gpt-management
Feature: GPT Configuration Management
  As an educator
  I want to manage and deploy AI tutor configurations
  So that my students can access effective learning tools

  Background:
    Given I am on the Noesis documentation site
    And I have access to the framework documentation

  @wip
  Scenario: View available AI tutors
    When I navigate to the subjects page
    Then I should see a list of available subjects
    And each subject should have clear tutor availability status
    And subjects with active tutors should show "Open AI Tutor" links

  @wip
  Scenario: Access GPT configuration documentation
    Given I am on the framework documentation page
    When I navigate to the "GPT Configuration" section
    Then I should see instructions for creating custom tutors
    And I should see the template.yml file documentation
    And I should see deployment guidelines

  @wip
  Scenario: Validate GPT deployment status
    Given I have access to the CLI tools documentation
    When I view the GPT status checking instructions
    Then I should see how to run the status checker
    And I should understand how to interpret the results
    And I should see troubleshooting guidance for incomplete deployments
