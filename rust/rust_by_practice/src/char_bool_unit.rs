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

}