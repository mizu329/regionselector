// async function displayPrefs() {
//   const result = await getPrefs();
//   console.log(result);
// }

// displayPrefs();

const rootElm = document.getElementById("areaSelector");
console.log(rootElm);

async function getPrefs() {
  const res = await fetch("../prefectures.json");
  const json = await res.json();
  console.log(json);
  return json;
}

async function updatePref() {
  const prefs = await getPrefs();
  createPrefOptionsHtml(prefs);
}

function createPrefOptionsHtml(prefs) {
  const optionStrs = [];
  for (const pref of prefs) {
    optionStrs.push(
      `<option name="${pref.name}" value="${pref.code}">
      ${pref.name}
      </option>`
    );
  }
  console.log(optionStrs);

  const prefSelectorElm = rootElm.querySelector(".prefectures");
  prefSelectorElm.innerHTML = optionStrs.join("");
}

updatePref();
