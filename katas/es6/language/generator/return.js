// 73: Generator - `return` inside a generator is special
// To do: make all tests pass, leave the assert lines unchanged!

describe('`return` in a generator function is special', function() {

  describe('the returned value is an IteratorResult (just like any value returned via `yield`)', function() {
    
    it('returns an IteratorResult (an object with the properties `value` and `done`)', function() {
      function* generatorFunction() { return 1; }
      const returned = generatorFunction().next();
      assert.deepEqual(Object.keys(returned), ['value', 'done']);
    });
    
    it('the property `value` is the value given after the `return` statement', function() {
      function* generatorFunction() { return 23; }
      const {value} = generatorFunction().next();
      assert.deepEqual(value, 23);
    });
    
    it('the property `done` is true', function() {
      function* generatorFunction() { return 42; }
      const {done} = generatorFunction().next();
      assert.deepEqual(done, true);
    });
    
    it('NOTE: `yield` does not return `done=true` but `done=false`!', function() {
      function* generatorFunction() { yield 1; }
      const returned = generatorFunction().next();
      assert.deepEqual(returned, {value: 1, done: false});
    });
    
    it('a missing `return` returns {value: undefined, done: true}', function() {
      function* generatorFunction() {}
      const returned = generatorFunction().next();
      assert.deepEqual(returned, {value: void 0, done: true});
    });
    
  });

  describe('mixing `return` and `yield`', function() {
    
    function* generatorFunctionWithYieldAndReturn() {
      yield 1;
      return 2;
    }
    
    it('is possible', function() {
      const iterator = generatorFunctionWithYieldAndReturn();
      const values = [
        iterator.next().value,
        iterator.next().value
      ];
      assert.deepEqual(values, [1, 2]);
    });
    
    it('the mix behaves different to two `yield`s', function() {
      const iterator = generatorFunctionWithYieldAndReturn();
      assert.deepEqual(Array.from(iterator), [1]);
    });

    it('two `yield`s returning values', function() {
      function* generatorFunctionWithTwoYields() {
        yield 1;
        yield 2;
      }
      const iterator = generatorFunctionWithTwoYields();
      assert.deepEqual(Array.from(iterator), [1, 2]);
    });

    it('returning a yielded value', function() {
      function* generatorFunction() {
        return yield 1;
      }
      const iterator = generatorFunction();
      const values = [
        iterator.next().value,
        iterator.next(2).value
      ];
      assert.deepEqual(values, [1, 2]);
    });
    
  });
  
});
