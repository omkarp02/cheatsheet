pub fn reverse_the_array<T, const N: usize>(arr: &mut  [T; N]) -> () {

    println!("Running reverse an array problem");

    let mid: i32 = arr.len() as i32 / 2;
    let mut end = arr.len() - 1;


    println!("{}", mid);

    for i in 0..=mid {
        end -= 1;
    }

    

    swap_an_array(0, 1, arr);



}

fn update_str(str: &mut String){
    println!("{:p}", str);
    str.push_str("sldkfjs");
}

fn swap_an_array<T, const N: usize>(index1: usize, index2: usize, arr: &mut [T; N]) {
    // let temp = &arr[index1];
    println!("{:p}", arr);
    
   
}

