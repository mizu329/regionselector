// 都道府県名を取得

const rootElm = document.getElementById("areaSelector");

// 初期化用とアプリ実行のメソッド
async function initAreaSelector() {
  await updatePref();
  await updateCity();
}

async function getPrefs() {
  const res = await fetch("../prefectures.json");
  const json = await res.json();
  return json;
}

// 市町村名を取得
async function getCities(prefCode) {
  const res = await fetch(`../cities/${prefCode}.json`);
  const json = await res.json();
  return json;
}

async function updatePref() {
  const prefs = await getPrefs();
  createPrefOptionsHtml(prefs);
}

async function updateCity() {
  const prefSelectorElm = rootElm.querySelector(".prefectures");
  const selectedPrefCode = prefSelectorElm.value;
  const cities = await getCities(selectedPrefCode);

  createCityOptionsHtml(cities);
}

// 都道府県名をDOMに反映
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

  // 都道府県名が選択された時に市町村名を更新
  prefSelectorElm.addEventListener("change", async () => {
    await updateCity();
  });
}

// 市町村名をDOMに反映
function createCityOptionsHtml(cities) {
  const optionStrs = [];
  for (const city of cities) {
    optionStrs.push(
      `<option name="${city.name}" value="${city.code}">
      ${city.name}
      </option>`
    );
  }

  const citySelectorElm = rootElm.querySelector(".cities");
  citySelectorElm.innerHTML = optionStrs.join("");
}

initAreaSelector();
