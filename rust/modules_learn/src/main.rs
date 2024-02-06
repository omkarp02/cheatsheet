#![allow(dead_code, unused_variables, unused_assignments)]

mod array;

use array::problems::reverse_the_array;

fn main() {

    let mut arr = [1,2,3,4,5];
    reverse_the_array(&mut arr);
    println!("Here main file is running");
}



