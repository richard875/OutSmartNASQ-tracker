var data = {
  feeds: {
    regions: [
      {
        name: "Lichtenberg",
        id: "01408.b",
        suburbs: [
          { name: "Fennpfuhl", views: 76400 },
          { name: "Lichtenberg", views: 87895 },
          { name: "Rummelsberg", views: 10239 },
        ],
      },
      {
        name: "Mitte",
        id: "03442.f",
        suburbs: [
          { name: "Tiergarten", views: 82695 },
          { name: "Mitte", views: 67234 },
          { name: "Hansaviertel", views: 10848 },
          { name: "Moabit", views: 67500 },
        ],
      },
      {
        name: "Friedrichshain-Kreuzberg",
        id: "01991.o",
        suburbs: [
          { name: "Friedrichshain", views: "98494" },
          { name: "Kreuzberg", views: "27800" },
        ],
      },
      {
        name: "Templehof-Schöneberg",
        id: "01778.k",
        suburbs: [
          { name: "Friedenau", views: 76595 },
          { name: "Schöneberg", views: 20731 },
          { name: "Templehof", views: 58000 },
          { name: "Mariendorf", views: 32300 },
        ],
      },
      {
        name: "Pankow",
        id: "02761.q",
        suburbs: [
          { name: "Wießensee", views: 81294 },
          { name: "Prenzlauer Berg", views: 76470 },
          { name: "Pankow", views: 90210 },
        ],
      },
    ],
    branding: [
      { municipality_id: "01408.b", brand_color: "#f9cd90" },
      { municipality_id: "03442.f", brand_color: "#F28123" },
      { municipality_id: "01991.o", brand_color: "#D34E24" },
      { municipality_id: "01778.k", brand_color: "#563F1B" },
      { municipality_id: "02761.q", brand_color: "#38726C" },
    ],
    customer: {
      name: "Viktoria Tiedemann",
      date_of_birth: "1981-09-19",
      address: {
        street: "Schönfließer Str 9",
        suburb: "Prenzlauer Berg",
        postcode: "10439",
      },
    },
  },
};

let suburb = data.feeds.customer.address.suburb;
let region = data.feeds.regions.find((region) =>
  region.suburbs.some((s) => s.name === suburb)
);

console.log("suburb:", suburb, "region:", region.name);
