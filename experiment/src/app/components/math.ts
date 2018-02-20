function doFact(n: number, akk = 1): number {
    if (n === 1) return akk;
    return doFact(n - 1, n * akk);
  }
  
  export function fact(n: number): number {
    return doFact(n);
  }
  
  function doFib(n: number, pprev = 0, prev = 1): number {
    if (n === 1) return prev;
    return doFib(n - 1, prev, pprev + prev);
  }
  
  export function fib(n: number): number{
    return doFib(n);
  }
  