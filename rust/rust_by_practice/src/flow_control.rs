enum Coin {
    Penny,
    Nickel,
    Dime
}

pub fn my_function() {
    println!(">>>>>>>>>>>>>>>> flow control <<<<<<<<<<<<<<<<<<<<");

    let n = 5;

    if n < 0 {
        println!("{} is negative", n);
    } else if n > 0 {
        println!("{} is positive", n);
    } else {
        println!("{} is zero", n);
    }

    let big_n = if n < 10 && n > -10 {
        println!(", and is a small number, increase ten-fold");

        10 * n
    } else {
        println!(", and is a big number, halve the number");

        n / 2.0 as i32
    };

    println!("{}", big_n);

    for n in 1..=100 {
        // modify this line to make the code work
        if n == 100 {
        }
    }


    let names = [String::from("liming"),String::from("hanmeimei")];
    for name in &names {
        // Do something with name...
    }
    println!("{:?}", names);


    let numbers = [1, 2, 3];
    // The elements in numbers are Copy，so there is no move here
    for n in numbers {
        // Do something with n...
    }
    
    println!("{:?}", numbers);


    let a = [4, 3, 2, 1];

    // Iterate the indexing and value in 'a'
    for (i,v) in a.iter().enumerate() {
        println!("The {}th element is {}",i+1,v);
    }

    //match

    value_in_cents(Coin::Dime);

    let config_max = Some(3);

    if let Some(max) = config_max {
        println!("{}", max);
    }




}


fn value_in_cents (coin: Coin) -> i32 {
    match coin {
        Coin::Dime => 1,
        Coin::Nickel => 5, 
        Coin::Penny => 2
    }
}

