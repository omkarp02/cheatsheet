pub fn my_function(){
    let mut s = String::new();

    println!("{}", s.capacity()); //here the capacity is 0

    for _ in 0..2 {
        s.push_str("hello");
        println!("{}", s.capacity());
    }

    //then the capacity is 8 then in next iteration it is 16 so so if the length exceed it have to be reallocated so capacity always doulbes 0 8 16 32

    //so every time it doubles it can be expesive we can do this

    let mut s = String::capacity(24); //here we have already set the capacity

    // * Vector

}