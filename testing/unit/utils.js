// Simple utility functions for the framework
const utils = {
  /**
   * Validates that a required configuration value exists
   * @param {any} value - The value to validate
   * @param {string} name - The name of the configuration
   * @returns {boolean} - True if valid
   */
  validateRequired(value, name) {
    if (value === null || value === undefined || value === '') {
      throw new Error(`${name} is required`)
    }
    return true
  },

  /**
   * Formats a test scenario name for display
   * @param {string} scenario - The scenario name
   * @returns {string} - Formatted scenario name
   */
  formatScenario(scenario) {
    if (!scenario) return 'Unknown Scenario'
    return scenario.trim().replace(/\s+/g, ' ')
  },

  /**
   * Checks if a URL is valid
   * @param {string} url - The URL to validate
   * @returns {boolean} - True if valid URL
   */
  isValidUrl(url) {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
}

module.exports = utils
