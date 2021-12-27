// Write out worker's identification number to the order form.
function getIdentification() {
  const name = document.getElementsByClassName("user-box__name-part")[0].textContent.trim();
  const workers = {
    "Worker Name": "int ID", // give the worker's name and identification number
  }
  
  return workers[name] || name;
}

// Replace worker's name with ID number.
function createAnonimity() {
  const name = document.getElementsByClassName("user-box__name-part")[0];
  name.innerHTML = getIdentification();
}

// Add Auchan (AUC) code to list view, when search.
function addAucToListView() {
  const aucs = Array.from(document.getElementsByClassName("productCardPbImg")).map(a => a.href).filter(b => b);
  const products = Array.from(document.getElementsByClassName("product_card"));

  aucs.map((a, i) => {
    products[i].innerHTML += `
      <div style="background-color: #ffffff; padding: 8px 16px; left: 0px; top: 0px; position: absolute; font-weight: bold; z-index: 11">
        <span style="display: block;">${a.match(/(?!.*\/)(.*?)(?=\.v)/)[0]}</span>
      </div>
    `
  });
}

// Add EAN code to Product View.
function addEANtoProductView() {
  const ean = document.querySelectorAll("[data-flix-ean]")[0];
  const target = document.getElementsByClassName("product-external-id-title")[0];

  target.parentElement.parentElement.innerHTML += `
    <div class="col-xs-12">
      <span class="product-external-id-title" style="margin-right: 8px">EAN:</span><span class="product-external-id-text">${ean.dataset.flixEan}</span>
    </div>
  `;
}

// Auto focus search field and if there is a value, select it.
function autoFocusSearchField() {
  const search = document.getElementById("msearch");

  setTimeout(() => search.select(), 250)
}

// Create comments when on Dealer Order Summary page
if (window.location.href === "http://eportal.auchan.hu/shop/dealer-order-summary") {
  const serving_mode = document.getElementsByClassName("dealer-order-summary__serving-mode")[0].textContent.trim();
  const dealer_note = document.getElementsByClassName("dealer-note-input")[0];
  const dealer_shipping_date = document.getElementsByClassName("dealer-order-summary__shipping-date")[0];
  const dealer_note_button = document.getElementsByClassName("dealer-note-button")[0];

  dealer_note.value += `Kiállította: ${getIdentification()}. `;
  
  if (serving_mode === "Későbbi Átvétel") {
    dealer_note.value += `Későbbi átvétel. Várható szállítás: ${dealer_shipping_date.innerHTML}. `;
  } else if (serving_mode === "Logisztikai Kiszállítás" || serving_mode === "Áruházi Kiszállítás") {
    dealer_note.value += `Várható szállítás: ${dealer_shipping_date.innerHTML} `;
  }
  
  setTimeout(() => dealer_note_button.click(), 250);
}

// Ez itt csak Ricsinek. - Coloring website. Nothing useful.
function forRicsi(color) {
  const allElements = Array.from(document.getElementsByTagName("*"));

  allElements.map(element => {
    const bg = window.getComputedStyle(element, null).getPropertyValue("background-color");

    if (bg === "rgb(228, 5, 31)" || bg === "rgb(231, 0, 16)") {
      element.style.background = color
    }
  });
}

// Call functions
try { createAnonimity() } catch (e) { console.error(e) }
try { autoFocusSearchField() } catch (e) { console.error(e) }
try { addAucToListView() } catch (e) { console.error(e) }
try { addEANtoProductView() } catch (e) { console.error(e) }

// Coloring website with the given values.
getIdentification() === "20" ? forRicsi("#179983") : null;
getIdentification() === "22" ? forRicsi("linear-gradient(90deg, #6c19b5, #ff0000, #3981F0)") : null;
getIdentification() === "26" ? forRicsi("#6c19b5") : null;
getIdentification() === "29" ? forRicsi("#00FFFF") : null;
getIdentification() === "35" ? forRicsi("#FD3FF9") : null;
