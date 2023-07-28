const frame = document.querySelector('.frame')
const track = document.querySelector('.track')
const numberEl = document.querySelectorAll('.item__container')
track.style.height = `${numberEl.length * 100}vh` // set the height of the track auto depending of the number of element inside
// variable for animation
const offset = track.offsetTop 
const height = track.offsetHeight - frame.offsetHeight

let coef = (numberEl.length - 1) * 100 // coef for translate depending on the number of element inside the hozizontal scroll

let check = { // variable set as switch to check if scroll is after of before horizontal scroll
    before: true,
    after:true
}
document.addEventListener('scroll', ()=>{
    const rect = frame.getBoundingClientRect() // get the frame information
    const scrollPosition = window.scrollY
    if(rect.top > 0 && check.before){ // if first scroll before 
        check.before = false // set switch to off
        frame.style.transform = `translateX(-0vw)` // translate the frame to 0 to prevent gap
    }
    if(rect.top === 0 ){ // check if we are the frame to scroll horizontal
        check.before = true // set switch to on
        check.after = true // set switch to on
        let diff = scrollPosition - offset // scroll position inside the element
        let translate = diff / height // % of scroll done inside the element
        translate = translate * coef // * the coef ( number of element * size of screen )
        frame.style.transform = `translateX(-${translate}vw)` // translation of the frame to create horizontal scroll
    }
    if(rect.top < 0 && check.after){ // if first scroll after
        check.after = false // turn off switch
        frame.style.transform = `translateX(-${coef}vw)` // set translate to max to prevent gap
    }
})