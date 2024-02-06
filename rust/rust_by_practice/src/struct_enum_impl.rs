#[derive(Debug)] //this need to be implement to console.log user
struct User {
    active: bool, 
    username: String,
    email: String,
}


#[derive(Debug)]
enum Number1 {
    Zero, 
    One,
    Two
}

#[derive(Debug)]
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

#[derive(Debug)] //this need to be implement to console.log user
struct Rectangle {
    width: u32,
    height: u32
}



pub fn my_function(){

    //struct and impl


    let mut user1 = User {
        active: true, 
        username: String::from("omkar paswaw"),
        email: String::from("omkar@gmail.com")
    };

    user1.email = String::from("lskdjflskd");

    let user2 = User {
        active: false,
        ..user1
    };

    println!("{:?}", user2);



    //enum

    println!(">>>>>>>>>>>>>>>> Enum <<<<<<<<<<<<<");

    println!("{:?}", Number1::One as u8);

    let msg1 = Message::Move{x: 1, y: 2}; // Instantiating with x = 1, y = 2 
    let msg2 = Message::Write(String::from("asdfsadf")); // Instantiating with "hello, world!"

    println!("{:?},{:?}", msg1, msg2);

    
    println!(">>>>>>>>>>>>>>>> Option enum <<<<<<<<<<<<<");

    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);

    println!("{:?}", six);




}

fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1)
    }
}