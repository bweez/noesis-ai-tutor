const utils = require('./utils')

describe('Framework Utils', () => {
  describe('validateRequired', () => {
    test('should pass for valid values', () => {
      expect(utils.validateRequired('test', 'value')).toBe(true)
      expect(utils.validateRequired(123, 'number')).toBe(true)
      expect(utils.validateRequired([], 'array')).toBe(true)
    })

    test('should throw for invalid values', () => {
      expect(() => utils.validateRequired(null, 'value')).toThrow('value is required')
      expect(() => utils.validateRequired(undefined, 'value')).toThrow('value is required')
      expect(() => utils.validateRequired('', 'value')).toThrow('value is required')
    })
  })

  describe('formatScenario', () => {
    test('should format scenario names correctly', () => {
      expect(utils.formatScenario('  Test   Scenario  ')).toBe('Test Scenario')
      expect(utils.formatScenario('Single')).toBe('Single')
      expect(utils.formatScenario('')).toBe('Unknown Scenario')
      expect(utils.formatScenario(null)).toBe('Unknown Scenario')
    })
  })

  describe('isValidUrl', () => {
    test('should validate URLs correctly', () => {
      expect(utils.isValidUrl('https://example.com')).toBe(true)
      expect(utils.isValidUrl('http://localhost:4000')).toBe(true)
      expect(utils.isValidUrl('not-a-url')).toBe(false)
      expect(utils.isValidUrl('')).toBe(false)
    })
  })
})
