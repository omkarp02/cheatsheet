
use std::mem::size_of_val;

pub fn my_function(){

    //here it is character boolean

    //char is of 4 bytes
    //bool is of 1 bytes
    //unit is of 0 bytes

    let c1: char = 'a'; //we define char in '' 
    //a character in memory takes 4 bytes

    assert_eq!(size_of_val(&c1), 4);


    let f: bool = false;

    //statement is instrucatino that perform some action but does not return any value
    //expression evalute to resultant value


    let x = 5u32;

    let y = {
        let x_squared = x * x;
        let x_cube = x_squared * x;

        // This expression will be assigned to `y`
        x_cube + x_squared + x
    };

    // all the code inside curly bracker is expression and the whole let y and curly bracket is statement because it does not return anything

    let z: () = {
        // The semicolon suppresses this expression and `()` is assigned to `z`
        let _ = 2 * x;
    };

}