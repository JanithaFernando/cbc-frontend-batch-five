export function getCart(){
    let cart=localStorage.getItem("cart")
    if(cart==null){
        cart=[]
        localStorage.setItem("cart",JSON.stringify(cart))//json covert to string
    }
    return cart
}