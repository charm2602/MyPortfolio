
    document.addEventListener("DOMContentLoaded", function() {
        const navLinks = document.querySelectorAll("nav ul li");
    
        navLinks.forEach(link => {
            link.addEventListener("click", function() {
                navLinks.forEach(link => link.classList.remove("active"));
                this.classList.add("active");
            });
        });
    
       
        const currentHash = window.location.hash;
        if (currentHash) {
            const activeLink = document.querySelector(`nav ul li a[href="${currentHash}"]`);
            if (activeLink) {
                activeLink.parentElement.classList.add("active");
            }
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
        const progressBars = document.querySelectorAll(".progress");
    
        const animateProgressBars = () => {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        };
    
        const checkScroll = () => {
            const aboutSection = document.querySelector(".about");
            const aboutPosition = aboutSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.5;
    
            if (aboutPosition < screenPosition) {
                animateProgressBars();
                window.removeEventListener("scroll", checkScroll);
            }
        };
    
        window.addEventListener("scroll", checkScroll);
    });
 
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate__animated');
        animatedElements.forEach(function(element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                element.classList.add('animate__fadeInLeft');
                element.style.opacity = 1;
            }
        });
    }

    window.addEventListener('load', function() {
        setTimeout(function() {
            const loadingOverlay = document.getElementById('loadingOverlay');
            loadingOverlay.style.display = 'none';

            handleScrollAnimations();
            window.addEventListener('scroll', handleScrollAnimations);
        }, 3000);  
    });

    document.addEventListener('DOMContentLoaded', handleScrollAnimations);


var modal = document.getElementById("myModal");


var span = document.getElementsByClassName("close")[0];


var progressPM = document.getElementById("progress-pm");
var progressQA = document.getElementById("progress-qa");
var progressWD = document.getElementById("progress-wd");


var progressData = {
    "progress-pm": {
        title: "Project Management",
        percentage: "90%",
        description: "Managing projects efficiently with proper planning and execution."
    },
    "progress-qa": {
        title: "Quality Assurance",
        percentage: "80%",
        description: "Ensuring the quality of products through rigorous testing."
    },
    "progress-wd": {
        title: "Web Development",
        percentage: "70%",
        description: "Developing robust and scalable web applications."
    }
};


progressPM.addEventListener('click', function() {
    showModal('progress-pm');
});
progressQA.addEventListener('click', function() {
    showModal('progress-qa');
});
progressWD.addEventListener('click', function() {
    showModal('progress-wd');
});


function showModal(progressId) {
    var data = progressData[progressId];
    document.getElementById("modal-title").textContent = data.title;
    document.getElementById("modal-percentage").textContent = data.percentage;
    document.getElementById("modal-description").textContent = data.description;
    modal.style.display = "block";
}


span.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


$(document).ready(function() {
    $("#contactsOnly").submit(function(event) {
        event.preventDefault();
        $.ajax({
            url: '/.netlify/functions/send_email',
            type: 'POST',
            data: JSON.stringify($(this).serializeArray().reduce((obj, item) => {
                obj[item.name] = item.value;
                return obj;
            }, {})),
            contentType: 'application/json; charset=utf-8',
            success: function(response) {
                $('#formResponse').html(response);
            },
            error: function(xhr, status, error) {
                $('#formResponseError').html(`<p>Email sending failed: ${error}</p>`);
            }
        });
    });
});


