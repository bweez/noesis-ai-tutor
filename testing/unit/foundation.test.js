// Simple unit test to verify the testing setup works
describe('Framework Foundation', () => {
  test('should have basic testing setup', () => {
    expect(true).toBe(true)
  })

  test('should be able to test JavaScript functions', () => {
    const sum = (a, b) => a + b
    expect(sum(2, 3)).toBe(5)
  })

  test('should handle async operations', async () => {
    const asyncSum = async (a, b) => {
      return new Promise(resolve => {
        setTimeout(() => resolve(a + b), 10)
      })
    }
    
    const result = await asyncSum(2, 3)
    expect(result).toBe(5)
  })
})
