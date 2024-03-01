// load phones with API
const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones)
  displayPhone(phones);
};

// display phone one by one
const displayPhone = (phones) => {
  //   console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  //   clear phone container before adding new phone
  phoneContainer.textContent = "";
  // display show all button if the condition is true
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure class="px-10 pt-10">
        <img
        src="${phone.image}"
        alt="phone image"
        class="rounded-xl"
        />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title text-2xl font-bold">${phone.phone_name}</h2>
        <p>
        There are many variations of passages of available, but the
        majority have suffered
        </p>
        <div class="card-actions">
        <button
            class="btn bg-blue-500 hover:bg-blue-400 hover:text-black text-white px-6"
        >
            Show Details
        </button>
        </div>
    </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
};

// search button
const handleSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText);
};

loadPhone();
