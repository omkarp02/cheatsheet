use std::mem::size_of_val;

pub fn my_function(){

    let s = String::from("Hello world");

    let hello = &s[0..5];
    let world = &s[6..11];

    let s3 = String::from("hi, 中国");
    let h = &s3[0..1];
    let z = "h";

    //in rust &str has a allocated size of 16bytes and size_of_val is more commonly used for measuring the size of more complex data structures.
    //and char has a allocated size of 4 bytes;

    println!("{}", h);

    println!("{} <<<<<<<<<< size of char h", size_of_val(&z));



    

    //arr

    let arr: [i32; 5] = [1, 2, 3, 4, 5]; 
    let arr2: [_; 3] = ['a', 'b', 'c'];
    assert!(arr.len() == 5);
    assert!(std::mem::size_of_val(&arr2) == 12);

    let list = [1;100]; //now it will hold 100 element of 1

    println!("{:?}",list);


    let data : &[_; 3]= &arr2;



    let arr = ['a', 'b', 'c'];
    let arr2 = arr;

    let ele = arr[0];

    let ele2 = arr.get(0).unwrap(); //here it is safe to use option type

    println!("{}, {}", ele, ele2);


    //slice

    /*

        Reference  to continogous sequence of element in collection
        provide a way to borrow part of collection without taking ownership of the entire collection
        can be created from array, vectors, Strings and other colleciton implementing the deref trait
        slice is just a view into the collection

     */


    let a = [1, 2, 3, 4, 5];

    let slice = &a[1..3];

    let arr = ['a', 'b', 'c'];

    let slice = &arr[..2];

    println!("{:?}", slice);

    //A slice reference is a two-word object, for simplicity reasons, from now on we will use slice instead of slice reference. The first word is a pointer to the data, and the second word is the length of the slice. The word size is the same as usize, determined by the processor architecture, e.g. 64 bits on an x86-64. Slices can be used to borrow a section of an array, and have the type signature &[T]. so the total size is 16bytes, so pointer and length both field will occupy usize means 8bytes total to 16bytes

    


}