let controller;
let slideScene;
let pageScene;
let detailedScene;
function animateSlides () { 
    //Init controller
    controller = new ScrollMagic.Controller(); 
    //Select some things

    const sliders = document.querySelectorAll(".slide")
    const nav = document.querySelector(".nav")
    //Loop over each slide 
    sliders.forEach((slide, index, slides) => { 
        const revealImg = slide.querySelector(".reveal-img");
        const img = slide.querySelector("img"); 
        const revealText = slide.querySelector(".reveal-text")

        // const tl = new gsap.timeline( { 
        //     defaults: { 
        //         duration: 1,
        //         ease: "power2.InOut"
        //     }
        // })
        //GSAP


        const slideTl = gsap.timeline({
            defaults: { 
                duration: 1, 
                ease: "power2.inOut"
            }
        });
        
        slideTl.fromTo(revealImg, {x: "0%"}, { x : "100%"})
        slideTl.fromTo(img, {scale: 2}, {scale: 1}, "-=1")
        slideTl.fromTo(revealText, {x: "0%"}, {x: "100%"}, "-=0.75")
        slideTl.fromTo(nav, {y: "-100%"}, {y: "0%"}, "-=0.5")
        //Create Scene

        slideScene = new ScrollMagic.Scene({
            triggerElement: slide, 
            triggerHook: 0.30,
            reverse: false
        })
        .setTween(slideTl)
        .addIndicators({
            color: "white",
            colorTrigger: "white",
            name: "slide"
        })
        .addTo(controller);

        const pageTl = gsap.timeline() 
        let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1]; 
        pageTl.fromTo(nextSlide, {y: "0%"}, {y: "50%"})
        pageTl.fromTo(slide, {opacity: 1, scale: 1}, {opactiy: 0, scale: 0})
        pageTl.fromTo(nextSlide, {y: "50%"}, {y: "0%"}, "-=0.5")
       
        //Creat A New Scene

        pageScene = new ScrollMagic.Scene({ 
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0
        })

            .addIndicators({
                color: "white",
                colorTrigger:"white",
                name: "page",
                indent: 200
            })
            .setPin(slide, {pushFollowers: false})
            .setTween(pageTl)
            .addTo(controller)
        



    })



}



const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector('span')
const burger = document.querySelector('.burger')
const line1 = document.querySelector(".line1")
const line2 = document.querySelector(".line2")
const cursor = (e) => { 
    //Make Div follow position of mouse
    mouse.style.top = e.pageY + 'px';
    mouse.style.left = e.pageX +"px"

}

const activeCursor = (e) => { 
    const item = e.target 
    

    if(item.id === "logo" || item.classList.contains('burger')){
       mouse.classList.add("nav-active"); 
       mouseTxt.innerText = "Tap";
       

    }else { 
        mouse.classList.remove("nav-active")
    }

    if(item.classList.contains('explore')) { 
        mouse.classList.add('explore-active')
        gsap.to(".title-swipe", {duration: 1, y: "0%"})
        mouseTxt.innerText = "Tap";
        console.log(mouseTxt.innerText)

    }else { 
        mouse.classList.remove('explore-active')
        gsap.to(".title-swipe", {duration: 1, y: "100%"})

        mouseTxt.innerText = "";
    }

}

const navToggle = (e) => {
    if(!e.target.classList.contains("active")) { 
    e.target.classList.add("active")
    gsap.to(".slide" , { duration: 0.2,zIndex: "-1"})

    gsap.to(".line1", {duration: 0.5, rotate: "45", y :5, background: "black"})
    gsap.to(".line2", {duration: 0.5, rotate: "-45", y : -5, background: "black"});
    gsap.to('#logo', {duration: 1, color: "black"})
    gsap.to(".nav-bar", {duration: 1, clipPath: ' circle(2550px at 100% -10%'})

    document.body.classList.add("hide")

}else {
    e.target.classList.remove("active")
    gsap.to(".slide" , { duration: 2 ,zIndex: "0"})


gsap.to(".line1", {duration: 0.5, rotate: "0", y :5, background: "white"})
gsap.to(".line2", {duration: 0.5, rotate: "0", y :5, background: "white"});
gsap.to('#logo', {duration: 1, color: "white"})
gsap.to(".nav-bar", {duration: 1, clipPath: ' circle(50px at 100% -10%'})
document.body.classList.remove("hide")

}

}


// Barba page Transitions

const logo = document.querySelector("#logo");

barba.init({
    views: [
        {
            namespace: "home",
            beforeEnter() { 
                animateSlides();
                gsap.fromTo('.nav-header', {duration:1, y: "100%"}, {y: "0%", ease: "power2.inOut"} )
                logo.href = './index.html'
            },
            beforeLeave() { 
                slideScene.destroy();
                pageScene.destroy();
                controller.destroy(); 
            },
        },
           
        {
            namespace: "fashion",
            beforeEnter() { 
            detailedAnimiation()

                logo.href = "../index.html"
            }
        }
    ],
    transitions: [
        {
            leave({current, next}) {
                //Tell When to start bringing other page in 
                let done  = this.async();

              

                //An animation
                const tl = gsap.timeline({defaults: {ease: 'power2.inOut'} });
                tl.fromTo(current.container,{duration: 1, opacity: 1}, { opacity:0})
                tl.fromTo('.swipe', { duration: 0.75,  x: '-100%'}, {x: "0%", onComplete: done}, "-=0.5")
            },  
            
            enter({current, next}) { 
                let done  = this.async();
                //Adds smoothness to transition
                window.scrollTo(0,0)

              //An animation
              const tl = gsap.timeline({defaults: {ease: 'power2.inOut'} });
              tl.fromTo('.swipe', { duration: 1,  x: '0%'}, {x: "100%", stagger: 0.25, onComplete: done})

              tl.fromTo(next.container,{duration: 1, opacity: 0}, { opacity:1})
              
            }
        },
      
    ]
}

)


//Detailed Animation 

const detailedAnimiation = () => { 

    console.log("Function is running sir")
    controller = new ScrollMagic.Controller();
    const slides = document.querySelectorAll(".detail-slide");
    slides.forEach((slide,index,slides) => { 
        const slideTl = gsap.timeline({
            defaults: {
                duration: 1
            }
        })
        let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1]; 
        const image = nextSlide.querySelector(".img");
        slideTl.fromTo(slide, {opacity: 1}, {opacity: 0});

        //Scene2 
        detailedScene = new ScrollMagic.Scene({
            trigger: slide,
            duration: "100%",
            triggerHook: 0
        })
        .setPin(slide, {pushFollowers: false})
        .setTween(slideTl)
        .addTo(controller)
    })
}



//Event Listeners
burger.addEventListener("click", navToggle)
window.addEventListener("mouseover", activeCursor)
window.addEventListener("mousemove", cursor)
animateSlides()