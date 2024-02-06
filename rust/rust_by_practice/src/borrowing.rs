pub fn my_function(){
    /*
        you can have either one mutalbe ref or any number of immutalbe ref
        reference must always be valid => check dangling references

    
     */

    let s1 = String::from("hello");

    let mut a = 3;

    let b = &mut a; //this is a mutable ref 

    let len = calculate_len(&s1); //here s1 is passed as ref

    println!("{}", s1); //so here we can use s1


    //dangling ref

    let reference_to_nothing = dangle();

    //printing references

    let x: i32 = 5;
    
    let p: &i32 = &x;

    println!("{:p}", p);


}

fn calculate_len(s: &String) -> usize {
    s.len()
}

fn dangle() -> String {
    let s = String::from("hello world");
     // &s here reference of s will be passed when  
     s
}

