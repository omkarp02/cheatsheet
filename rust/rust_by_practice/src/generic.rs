struct Point<T, U> {
    x: T, 
    y: U
}

// Fill in the blanks to make it work
struct A;          // Concrete type `A`.
struct S(A);       // Concrete type `S`.
struct SGen<T>(T); // Generic type `SGen`.

fn reg_fn(_s: S) {}

fn gen_spec_t(_s: SGen<A>) {}

fn gen_spec_i32(_s: SGen<i32>) {}

fn generic<T>(_s: SGen<T>) {}

struct Array<T, const N: usize> {
    data: [T; N]
}

pub fn my_function(){

    // * Generic 

     // Using the non-generic functions
     reg_fn(S(A));          // Concrete type.
     gen_spec_t(SGen(A));   // Implicitly specified type parameter `A`.
     gen_spec_i32(SGen(3)); // Implicitly specified type parameter `i32`.
 
     // Explicitly specified type parameter `char` to `generic()`.
     generic::<char>(SGen('a'));
 
     // Implicitly specified type parameter `char` to `generic()`.
     generic(SGen("asdf"));



    let arr = ["asdf", "asdf", "asdf", "asdf", "asdf"];
    accepts_arr(arr);

    let p1 = Point{x: 4, y: 10};
    let p1 = Point{x: 'd', y: 3};

    // * Generic Const

    let arrays = [
        Array{
            data: [1, 2, 3]
        },
        Array{
            data: [3, 2, 1]
        },
    ];







}

fn accepts_arr<T>(arr: [T; 5]) -> () {
    //TODO: here need to see how to print the arr
}

fn sum<T, U>(a: T, b: U) -> () {

}