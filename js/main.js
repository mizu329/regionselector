// async function displayPrefs() {
//   const result = await getPrefs();
//   console.log(result);
// }

// displayPrefs();

const rootElm = document.getElementById("areaSelector");

async function getPrefs() {
  const res = await fetch("../prefectures.json");
  const json = await res.json();
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

  const prefSelectorElm = rootElm.querySelector(".prefectures");
  prefSelectorElm.innerHTML = optionStrs.join("");
}

updatePref();
