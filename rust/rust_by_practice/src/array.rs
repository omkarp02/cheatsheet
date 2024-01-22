pub fn my_function() {
    let arr: [i32; 5] = [1, 2, 3, 4, 5]; 
    let arr2: [_; 3] = ['a', 'b', 'c'];
    assert!(arr.len() == 5);
    assert!(std::mem::size_of_val(&arr2) == 12);

    let data : &[_; 3]= &arr2;


}