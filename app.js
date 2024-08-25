fetch("menu.html")
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

fetch("price_list.json")
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

fetch("image_gallery.json")
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
          src: `/images/${element.img}`,
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
