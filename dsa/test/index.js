const n = 11

function soln(n){
const mid = Math.floor(n / 2)
  for (let i = 0; i < n; i++) {
    const noofspace = Math.abs(mid - i)
      for (let j = 0; j < noofspace * 2; j++) {
          process.stdout.write(" ");
      }
      const noofstart = 2 * Math.abs(noofspace - mid) + 1
      for (let k = 0; k < Math.abs(noofstart); k++) {
        process.stdout.write(" *");
      }
      console.log("")
  }

}
soln(n)

/*


  *
 ***    
*****

*/