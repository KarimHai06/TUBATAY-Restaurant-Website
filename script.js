// DOM elements
const menuItems = document.querySelectorAll(".menu-item");
const categoryButtons = document.querySelectorAll("[data-category]");
const searchBox = document.querySelector(".search-box");
const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

// Menu filtering
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    // Update active button
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    filterMenu(category);
  });
});

function filterMenu(category) {
  const searchTerm = searchBox.value.toLowerCase();

  menuItems.forEach((item) => {
    const matchesCategory =
      category === "all" || item.dataset.category === category;
    const matchesSearch = item.dataset.name.includes(searchTerm);

    if (matchesCategory && matchesSearch) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Search functionality
searchBox.addEventListener("input", () => {
  const activeCategory = document.querySelector("[data-category].active")
    .dataset.category;
  filterMenu(activeCategory);
});

// Contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Reset error messages
  document.querySelectorAll(".error-message").forEach((el) => {
    el.style.display = "none";
  });

  // Validate inputs
  let isValid = true;
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  if (!name.value.trim()) {
    document.getElementById("nameError").style.display = "block";
    isValid = false;
  }

  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  }

  if (!subject.value.trim()) {
    document.getElementById("subjectError").style.display = "block";
    isValid = false;
  }

  if (!message.value.trim()) {
    document.getElementById("messageError").style.display = "block";
    isValid = false;
  }

  if (isValid) {
    // In a real application, you would send the data to a server here
    // For demonstration, we'll just show a success message
    contactForm.reset();
    successMessage.style.display = "block";

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);
  }
});

// Initialize menu - show all items
filterMenu("all");
