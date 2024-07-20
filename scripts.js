document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const place = document.getElementById("place").value;
    fetchIdentifications(place);
  });

async function fetchIdentifications(place) {
  try {
    const response = await fetch(
      `https://api.inaturalist.org/v1/observations?place_id=${place}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayIdentifications(data.results);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function displayIdentifications(identifications) {
  const outputList = document.getElementById("outputList");
  outputList.innerHTML = "";
  const seen = new Set();

  identifications.forEach((id) => {
    const taxon = id.taxon;
    if (taxon && !seen.has(taxon.id)) {
      seen.add(taxon.id);

      const listItem = document.createElement("li");
      listItem.classList.add("identification");

      const img = document.createElement("img");
      img.src = taxon.default_photo
        ? taxon.default_photo.medium_url
        : "https://via.placeholder.com/100";
      img.alt = taxon.name;

      const name = document.createElement("span");
      name.textContent = taxon.name;

      listItem.appendChild(img);
      listItem.appendChild(name);
      outputList.appendChild(listItem);
    }
  });
}
