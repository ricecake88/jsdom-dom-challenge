var timer_go = true;
likes = new Map();
comments = [];

function incrementCounter() {
        setInterval(function() {
            if (timer_go) {
                counter = document.getElementById("counter");
                counter.textContent = parseInt(counter.textContent)+1;
            }
        }, 1000);
};

function incrementByOne() {
    counter = document.getElementById("counter");
    counter.textContent = parseInt(counter.textContent)+1;
}

function decrementByOne() {
    counter = document.getElementById("counter");
    counter.textContent = parseInt(counter.textContent)-1;
}

function toggleButtonColor(color) {
    buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.color = color;
    }
}

function like() {
    let counter = document.getElementById("counter").textContent;
    if (likes.get(counter) == null) {
        likes.set(counter, 1);
    } else {
        let num_of_likes = likes.get(counter);
        num_of_likes+=1;
        likes.set(counter, num_of_likes);
    }
}

function createLi() {
    let counter_key = document.getElementById("counter").textContent;
    let like_class = document.getElementsByClassName("likes")
    let li_list = like_class[0].querySelectorAll("li");
    let found_li = false;
    for (let i = 0; i < li_list.length; i++) {
        if (li_list[i].getAttribute("data-num") == counter_key) {
            found_li = true;
            num_of_likes_str = likes.get(counter_key);
            li_list[i].textContent = counter_key + " has been liked " + num_of_likes_str + " times";     
        }
    }
    if (!found_li) {
        let li = document.createElement("li");        
        li.setAttribute("data-num", counter_key);
        if (likes.get(counter_key) == 1) {
            num_of_likes_str = likes.get(counter_key);
            li.textContent = counter_key + " has been liked " + num_of_likes_str + " time";      
        }
        like_class[0].appendChild(li);       
    }
}

function update_likes_output() {
    like();
    createLi();
}

function handleCounter(event) {
    event.preventDefault();
    if (this.id == "pause") {
      timer_go = !timer_go;
      if (timer_go) {
        this.textContent = "pause"
        toggleButtonColor("black");
      } else {
        this.textContent = "resume"
        toggleButtonColor("grey");
      }
    } else if (this.id == "minus") {
        if (timer_go)
            decrementByOne();
    } else if (this.id == "plus") {
        if (timer_go)
            incrementByOne();
    } else if (this.id == "heart") {
        if (timer_go)
            update_likes_output();
    }
    
}
document.addEventListener("DOMContentLoaded", function() {
    console.log("The DOM has loaded");
    incrementCounter();
    buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", handleCounter);
    }
    submit = document.getElementById("submit");
    comments = document.getElementById("list");
    submit.addEventListener("click", function() {
        comment = document.createElement("p");
        comment.textContent = document.getElementById("comment-input").value;
        comments.appendChild(comment);
        document.getElementById("comment-input").value = '';
    })
});