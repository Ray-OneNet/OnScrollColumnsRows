window.onload = function() {
    // Your code here
    gsap.registerPlugin(CustomEase) 
    gsap.defaults({
        ease: "none",
    
    
    });
    gsap.set(".loader_column-inner",{
        width: "100vw",
        height: "350%",
    })
    gsap.set(".loader_flex",{
        scale: 0.25,
    })
    gsap.set(".loader_column-inner.is-reverse",{
        y: "-40%",
    })
    gsap.set(".loader_column-inner.is-cented",{
        y: "40%",
    })
    gsap.set(".loader_column-inner.is-edge",{
        y: "70%",
    })
    gsap.set(".loader_img-wrap",{
        scale: 0.95,
    })

    let tl=gsap.timeline()
    .to("main",{
        opacity: 1,
        duration: 1,
        delay: 0.25
    })
    .to(".loader_column-inner",{
        width: "100vw",
        height: "100%",
        duration: 2.5,
        ease: "sine.inOut",
    })
    .to(".loader_column-inner.is-cented",{
        y: "0%",
        duration: 2.5,
        ease: "power2.inOut",
    },"<")
    .to(".loader_column-inner.is-reverse",{
        y: "10%",
        duration: 2.5,
        ease: "power2.inOut",
    },"<+0.25")
    .to(".loader_column-inner.is-edge",{
        y: "0%",
        duration: 2.5,
        ease: "power2.inOut",
    },"<+0.25")
    .to(".loader_img-wrap > img, .loader_img-wrap > video",{
        scale: 1,
        duration: 2,
        ease: "power3.inOut",
    },">-1")
    .to(".loader_img-wrap#main-img",{
        scale: 1,
        duration: 2,
        ease: "power3.inOut",
    },"<")
    .to(".loader_flex",{
        scale: 1,
        duration: 2,
        ease: "power3.inOut",
    },"<")
    
};