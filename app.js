fetch("https://c-papa.github.io/EdwardsSissorHands/menu.html")
  .then((response) => response.text())
  .then((data) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = data;
    document.body.insertAdjacentHTML("afterbegin", tempDiv.innerHTML);
  });

const createElement = (element, attributes) => {
  const input = document.createElement(element);
  for (const [key, value] of Object.entries(attributes)) {
    input.setAttribute(key, value);
  }
  return input;
};

fetch("about.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      const div1 = createElement("div", { class: "column" });
      const div2 = createElement("div", { class: "card" });
      const img = createElement("img", {
        src: `https://c-papa.github.io/EdwardsSissorHands/images/${element.img}`,
        style: "width:100%",
        loading: "lazy",
        alt: `${element.name}`,
      });
      const div3 = createElement("div", { class: "container" });
      const h1 = createElement("h1", {});
      h1.innerText = element.name;

      const p1 = createElement("p", { class: "title" });
      p1.innerText = element.jobTitle;

      const p2 = createElement("p", {});
      p2.innerText = element.desc;

      const p3 = createElement("p", {});
      p3.innerText = element.email;

      const p4 = createElement("p", {});

      const button = createElement("button", { class: "button" });
      button.innerText = "Contact";
      button.addEventListener("click", function () {
        window.location.href = `tel:${element.tel}`;
      });

      p4.appendChild(button);
      div3.appendChild(h1);
      div3.appendChild(p1);
      div3.appendChild(p2);
      div3.appendChild(p3);
      div3.appendChild(p4);

      div2.appendChild(img);
      div2.appendChild(div3);
      div1.appendChild(div2);

      document.getElementById("profile-container").appendChild(div1);
    });
  })
  .catch((error) => {
    console.error("Error fetching the JSON:", error);
  });

fetch("https://c-papa.github.io/EdwardsSissorHands/price_list.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      const div1 = createElement("div", { class: "main" });
      const div2 = createElement("div", { class: "left" });
      div2.innerText = element.title;
      const div4 = createElement("div", { class: "desc" });
      div4.innerText = element.desc;
      const div3 = createElement("div", { class: "right" });
      div3.innerText = `£${element.value.toFixed(2)}`;
      div1.appendChild(div2);
      div1.appendChild(div3);
      div1.appendChild(div4);

      document.getElementById("container").appendChild(div1);
    });
  })
  .catch((error) => {
    console.error("Error fetching the JSON:", error);
  });

fetch("https://c-papa.github.io/EdwardsSissorHands/image_gallery.json")
  .then((response) => response.json()) // Convert the response to JSON
  .then((data) => {
    const img_gal = document.getElementById("img-gal");
    const totalBatches = 4;
    const batchSize = Math.floor(data.length / totalBatches);
    const remainder = data.length % totalBatches;
    let start = 0;
    for (let i = 0; i < totalBatches; i++) {
      const currentBatchSize = batchSize + (i < remainder ? 1 : 0);
      const batch = data.slice(start, start + currentBatchSize);
      batch.forEach((element) => {
        const div1 = createElement("div", { class: "gal-column" });
        const img = createElement("img", {
          src: `https://c-papa.github.io/EdwardsSissorHands/images/${element.img}`,
          style: "width:100%",
          loading: "lazy",
        });
        div1.appendChild(img);
        img_gal.appendChild(div1);
      });
      start += currentBatchSize;
    }
  })
  .catch((error) => {
    console.error("Error fetching the JSON:", error);
  });
