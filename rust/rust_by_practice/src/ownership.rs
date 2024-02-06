pub fn my_function(){

    println!(">>>>>>>>>>>>> onwership <<<<<<<<<<<<<<");

    /*     
        each value in rust has an owner
        there can only be one owner
        when the owner go out of scoper the value will be dropped
     */

    let x = String::from("Hello world");
     takes_ownership(x); //here s value moves into the function so it no longer can be used

     //println!("{}", x);  here the value is dropped in when value is stored in head

     let y = 4; 

     make_copy(y); //y would move into the fucniton , but i32 is a copy, so its ok to still use x afterward

     println!("{}", y);

     let x: (i32, i32, (), &str) = (1, 2, (), "hello");
     let y: (i32, i32, (), &str) = x; //here we can print both because the tuple contain all value of fixed size at complile therefore x is a copy where as instead of "hello" it is "hello".to_string() the would be not of fixed size as it would be stored in heap and the print y will not work.
     

     println!("{:?}, {:?}", x, y);
     
     
     let x = Box::new(9);

     let mut y = Box::new(8); //box value is store in heap 

     *y = 4; //so here we are directly change the value in the heap with the help of * 


     assert_eq!(*x, 9); //here you can see * get the value from the memory address so 5

    println!("{} <<<<", y);

    //parital move

    let t = (String::from("hello"), String::from("world"));
    let _s = t.0; //here the hello is moved out of t and now in _s

    println!("{}", t.1); //here printing t will not work






     println!();
}

fn takes_ownership(some_string: String) {
    print!("{}", some_string)
}

fn make_copy(some_int: i32){
    println!("{}", some_int)
}