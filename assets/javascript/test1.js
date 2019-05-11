let arrTest =[1,2,3,4,5]
let textTest = "Hi"

 changeArray2(arrTest, textTest)

// function changeArray(array){

//     array.splice(2,1)

//     console.log(arrTest)
//     console.log(array)

// }

function changeArray2(array, myText){
   
    var clone = array
    //clone.splice(2,1)
    myText = myText + " Chris"

    console.log(arrTest)
    console.log(array)
    console.log(clone)
    console.log(textTest)
    console.log(myText)

    var arr = [1, 2, 3, "up"];
    var duplicate = arr.slice(0,1) ;
    // duplicate[3] = "down";
    // console.log(arr[3]); //"up"
    // console.log(duplicate[3]); //"down"
    console.log(arr)
    console.log(duplicate)

}

