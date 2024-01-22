
pub fn my_function() {

    let x: i32; //here uninitalized variables give error
    x = 12; //here it is initialized so it does not give error

    let mut y: i32 = 20; //with mut you can mutate the variable
    y = 2;

    let _z = 20; //can declare unsed variable with f_

    //destructure variable 

    let (x, y);

    (x, ..) = (3, 4); //here we are assigning x to the 3 and we don't care of rest that is why we put ...
    [.., y] = [1, 2]; //here we are assigning y to 2 and we don't care of the rest that is why we put ...

    assert_eq!([x, y], [3, 2]);

    println!("Success");



    print!("{} x {} this is y ", x, y);
}