// load phones with API
const loadPhone = async (searchText = 13, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones)
  displayPhone(phones, isShowAll);
};

// display phone one by one
const displayPhone = (phones, isShowAll) => {
  //   console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  //   clear phone container before adding new phone
  phoneContainer.textContent = "";
  //   display show all button if the condition is true
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // console.log("is show all", isShowAll);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

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
            onclick="handleShowDetails('${phone.slug}')"
            class="btn bg-blue-500 hover:bg-blue-400 hover:text-black text-white px-6"
          >
            Show Details
          </button>
        </div>
    </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

// show details button
const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

// show modal
const showPhoneDetails = (phone) => {
  console.log(phone);
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <div id="show-detail-container">
    <img class="mx-auto w-1/2" src="${phone.image}" alt="" />
    <h3 class="text-3xl font-bold">${phone.name}</h3>
    <p class="text-xl font-medium">Storage: <span class="text-base font-normal">${
      phone?.mainFeatures?.storage
    }</span></p>
    <p class="text-xl font-medium">Display Size: <span class="text-base font-normal">${
      phone?.mainFeatures?.displaySize
    }</span></p>
    <p class="text-xl font-medium">Chipset: <span class="text-base font-normal">${
      phone?.mainFeatures?.chipSet
    }</span></p>
    <p class="text-xl font-medium">Memory: <span class="text-base font-normal">${
      phone?.mainFeatures?.memory
    }</span></p>
    <p class="text-xl font-medium">Slug: <span class="text-base font-normal">${
      phone?.slug
    }</span></p>
    <p class="text-xl font-medium">Release Date: <span class="text-base font-normal">${
      phone?.releaseDate
    }</span></p>
    <p class="text-xl font-medium">Brand <span class="text-base font-normal">${
      phone?.brand
    }</span></p>
    <p class="text-xl font-medium">Gps <span class="text-base font-normal">${
      phone?.others?.GPS || "No GPS"
    }</span></p>
  </div>
  `;

  show_details_modal.showModal();
};

// search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

// loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all button
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
