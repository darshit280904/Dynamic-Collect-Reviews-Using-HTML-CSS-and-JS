let reviewsLeft = [];
let reviewsRight = [];
let leftSingleView = false;
let isLeftBoxVisible = false;

const reviewBox = document.getElementById("reviewBox");
const reviewBox2 = document.getElementById("reviewBox2");
const reviewCountEl = document.getElementById("reviewCount");
const reviewCountEl2 = document.getElementById("reviewCount2");
const wrapper = document.getElementById("rightBoxWrapper");
const arrow = document.getElementById("arrow");
const arrow2 = document.getElementById("arrow2");

function submitReview() {
  const name = document.getElementById("name").value.trim();
  const rating = parseInt(document.getElementById("rating").value);
  const desc = document.getElementById("desc").value.trim();

  if (!name || !desc || isNaN(rating) || rating < 1 || rating > 5) {
    alert("Please Enter Correct Details!");
    return;
  }

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const date = new Date().toLocaleDateString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const index = reviewsLeft.length;

  const color = Math.floor(Math.random() * 16777215).toString(16);

  const htmlLeft = `
  <div class="review" onclick="openSingleReview(${index})">
    <div class="review-header">
    <div style="display:flex;align-items:center;">
        <div class="avatar" style="background:#${color}">${initials}</div>
          <div>
            <strong>${name}</strong><br/>
            <span class="stars">${"★".repeat(rating)}</span>
            <small style="color:#ccc">${date}</small>
          </div>
      </div>
      <img src="./google_PNG19635.webp" width="30" />
    </div>
    <p style="margin-left:12%">${desc}</p>
  </div>
  <hr/>
  `;

  const htmlRight = `
  <div class="review" onclick="openSingleReviewRight(${index})">
    <div class="review-header">
    
      <div style="display:flex;align-items:center;">
        <div class="avatar" style="background:#${color}">${initials}</div>
        <div>
          <strong>${name}</strong><br/>
          <span class="stars">${"★".repeat(rating)}</span>
          <small style="color:#ccc">${date}</small>
        </div>
      </div>
      <img src="./google_PNG19635.webp" width="30" />
    </div>
    <p style="margin-left:12%">${desc}</p>
  </div>
  <hr/>
  `;

  reviewsLeft.push(htmlLeft);
  reviewsRight.push(htmlRight);

  reviewCountEl.textContent = reviewsLeft.length;
  reviewCountEl2.textContent = reviewsRight.length;

  if (isLeftBoxVisible && !leftSingleView) {
    renderLeft();
  }

  renderRight();

  document.getElementById("name").value = "";
  document.getElementById("rating").value = "";
  document.getElementById("desc").value = "";
}

function renderLeft() {
  reviewBox.innerHTML = reviewsLeft.join("");
}

function renderRight() {
  reviewBox2.innerHTML = reviewsRight.join("");
}

function toggleLeft() {
  if (leftSingleView) {
    goBackToAllReviews();
  } else {
    reviewBox.classList.toggle("show");
    isLeftBoxVisible = reviewBox.classList.contains("show");
    arrow.textContent = isLeftBoxVisible ? "▲" : "▼";

    if (isLeftBoxVisible) {
      renderLeft();

      
      if (window.innerWidth <= 768) {
        document.querySelector(".review-form").style.display = "none";
        const backBtn = `<button onclick="goBackToForm()" style="margin-bottom:10px;background:white;border-radius:50%;font-size:x-large;cursor:pointer;border:none;">←</button>`;
        reviewBox.innerHTML = backBtn + reviewBox.innerHTML;
      }
    }
  }   
}

function goBackToForm() {
  document.querySelector(".review-form").style.display = "block";
  reviewBox.classList.remove("show");
  arrow.textContent = "▼";
}

function toggleRight() {
  wrapper.classList.toggle("fullscreen");
  reviewBox2.classList.toggle("fullscreen");
  reviewBox2.classList.toggle("show");
  arrow2.textContent = wrapper.classList.contains("fullscreen") ? "▲" : "▼";
}

function openSingleReview(index) {
  const backButton = `<button class="back" style="margin-bottom:10px;
      background:white;
      border-radius:50%;
      font-size:x-large;
      cursor:pointer;
      border:none;" 
      onclick="goBackToAllReviews()"> ← </button>`;
  reviewBox.innerHTML = backButton + reviewsLeft[index];
  reviewBox.classList.add("show");
  reviewBox.classList.add("single-review");
  leftSingleView = true;
}

function goBackToAllReviews() {
  renderLeft();
  reviewBox.classList.remove("single-review");
  leftSingleView = false;
  arrow.textContent = "▲";
}

function openSingleReviewRight(index) {
  const backButton = `<button style="margin-bottom:10px;
      background:white;
      border-radius:50%;
      font-size:x-large;
      cursor:pointer;
      border:none;" 
      onclick="goBackToAllReviewsRight()"> ← </button>`;
  reviewBox2.innerHTML = backButton + reviewsRight[index];
  reviewBox2.classList.add("show");
  reviewBox2.classList.add("single-review");
}

function goBackToAllReviewsRight() {
  renderRight();
  reviewBox2.classList.remove("single-review");
}
