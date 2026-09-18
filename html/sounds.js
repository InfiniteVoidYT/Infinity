(function () {
  const jsonUrl = "https://raw.githubusercontent.com/InfiniteVoidYT/Infinity/main/data/json/sounds.json";

  if (!document.getElementById('fredoka-font-link')) {
    const link = document.createElement('link');
    link.id = 'fredoka-font-link';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Fredoka&display=swap';
    document.head.appendChild(link);
  }

  const style = document.createElement("style");
  style.textContent = `
  #background-svg {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: -1;
	overflow: hidden;
	pointer-events: none;
}

#background-svg svg {
	width: 100%;
	height: 100%;
	display: block;
}

  #home {
  clip-path: url(#cache);
}

#mid-blue {
  fill: none;
  opacity: 0.15;
  stroke: #e0e0e0;
  stroke-width: 12;
  stroke-miterlimit: 10;
  animation: show 4s infinite ease-in-out forwards;
}

#blue {
  fill: none;
  opacity: 0.15;
  stroke: #aaaaaa;
  stroke-width: 12;
  stroke-miterlimit: 10;
  animation: show 4s infinite ease-in-out forwards;
}

#light-blue {
  fill: none;
  opacity: 0.15;
  stroke: #78D4FE;
  stroke-width: 6;
  stroke-miterlimit: 10;
  stroke-dasharray: 200;
  stroke-dashoffset: 800;
  animation: draw 4s infinite ease-in-out forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes show {
  0% {
    opacity: 0.15;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.15;
  }
}
    * {
      font-family: 'Fredoka', sans-serif;
    }
    #zw-panel {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 600px;
      background: #000000;
      border-radius: 16px;
      overflow: hidden;
      z-index: 1;
      display: flex;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }
    #zw-sidebar {
      width: 0;
      background: rgba(17,17,17,0.95);
      transition: width 0.3s ease;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border-right: 1px solid rgba(255,255,255,0.1);
    }
    #zw-sidebar.open {
      width: 200px;
    }
    .zw-sidebar-btn {
      padding: 16px;
      border: none;
      background: none;
      color: #e0e0e0;
      font-size: 16px;
      cursor: pointer;
      text-align: left;
    }
    .zw-sidebar-btn.active {
      border-left: 4px solid #e0e0e0;
      background-color: rgba(255,255,255,0.05);
    }
    #zw-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    #zw-header {
      padding: 8px 16px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      color: #e0e0e0;
      position: relative;
    }
    #zw-sidebar-toggle {
      position: absolute;
      left: 10px;
      top: 8px;
      font-size: 20px;
      color: #e0e0e0;
      cursor: pointer;
      background: none;
      border: none;
    }
    #zw-search {
      margin: 12px 16px 0 16px;
      padding: 8px 12px;
      font-size: 16px;
      border-radius: 10px;
      border: none;
      outline: none;
      background: rgba(255,255,255,0.1);
      color: white;
      transition: background 0.2s;
    }
    #zw-search::placeholder {
      color: #ccc;
    }
    #zw-search:focus {
      background: rgba(255,255,255,0.2);
    }
    #zw-buttons {
      flex: 1;
      padding: 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-content: flex-start;
      justify-content: center;
      overflow: auto;
    }
    .zw-sound-btn {
      flex: 1 0 22%;
      background-color: #222;
      color: white;
      border: none;
      border-radius: 10px;
      padding: 20px 10px;
      font-size: 14px;
      cursor: pointer;
      text-align: center;
      transition: background 0.2s;
    }
    .zw-sound-btn:hover {
      background-color: #333;
    }
    .zw-divider {
      width: 100%;
      height: 2px;
      background: rgba(255,255,255,0.1);
      margin-top: 8px auto;
    }
    #zw-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.75);
      z-index: 3;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #zw-overlay-box {
      background: rgba(17, 17, 17, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 32px;
      max-width: 520px;
      width: 90%;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      text-align: center;
    }
    #zw-overlay-box h1 {
      font-size: 24px;
      color: #e0e0e0;
      margin-bottom: 16px;
    }
    #zw-overlay-box p {
      color: white;
      margin-bottom: 24px;
    }
    #zw-overlay-box button {
      font-size: 16px;
      font-family: 'Fredoka', sans-serif;
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      background-color: #e0e0e0;
      color: white;
      cursor: pointer;
    }
    .custom-scroll-panel {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .custom-scroll-panel::-webkit-scrollbar {
      display: none;
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'zw-overlay';
  overlay.style.zIndex = '9999';
  overlay.innerHTML = `
    <div id="zw-overlay-box">
      <h1>Warning</h1>
      <div class="zw-divider" style="width: 90%; margin: 0 auto 16px auto;"></div>
      <p>Use these sounds wisely and at your own jurisdiction as I am not responsible if you decide to misuse them. By clicking okay you understand that any trouble you may find yourself in is of your own choice.</p>
      <button onclick="document.getElementById('zw-overlay').remove()">Okay</button>
    </div>
  `;
  document.body.style.backgroundColor = '#000';
  document.body.appendChild(overlay);

  document.body.innerHTML += `<svg version="1.1" id="home-anim" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 1820 1080" style="enable-background:new 0 0 1820 1080;" xml:space="preserve">

<g id="home">
	<defs>
		<rect id="masque" y="0.4" width="1820" height="1080"/>
	</defs>
	<clipPath id="cache">
		<use xlink:href="#masque"  style="overflow:visible;"/>
	</clipPath>
	<g id="light-blue">
		<line x1="630.8" y1="894.3" x2="476.3" y2="1048.8"/>
		<line x1="858.2" y1="823.9" x2="1012.7" y2="669.4"/>
		<line x1="1066.9" y1="458.2" x2="912.4" y2="612.7"/>
		<line x1="1294.3" y1="387.8" x2="1448.8" y2="233.3"/>
		<line x1="1503" y1="22.1" x2="1348.5" y2="176.6"/>
		<line x1="895.6" y1="1166.6" x2="1050.1" y2="1012.1"/>
		<line x1="1104.3" y1="800.9" x2="949.8" y2="955.4"/>
		<line x1="1331.7" y1="730.5" x2="1486.2" y2="576"/>
		<line x1="1540.4" y1="364.8" x2="1385.9" y2="519.3"/>
		<line x1="1767.8" y1="294.4" x2="1922.3" y2="139.9"/>
		<line x1="1976.5" y1="-71.3" x2="1822" y2="83.2"/>
		<line x1="1369.1" y1="1073.2" x2="1523.6" y2="918.7"/>
		<line x1="1577.8" y1="707.5" x2="1423.3" y2="862"/>
		<line x1="1805.2" y1="637.1" x2="1959.7" y2="482.6"/>
		<line x1="1624" y1="1041.4" x2="1469.4" y2="1195.9"/>
		<line x1="-134.7" y1="674.9" x2="19.8" y2="520.4"/>
		<line x1="74" y1="309.2" x2="-80.5" y2="463.7"/>
		<line x1="301.4" y1="238.8" x2="455.9" y2="84.3"/>
		<line x1="510.1" y1="-126.9" x2="355.6" y2="27.6"/>
		<line x1="-88.6" y1="1008.9" x2="65.9" y2="854.4"/>
		<line x1="120.1" y1="643.1" x2="-34.4" y2="797.7"/>
		<line x1="347.5" y1="572.8" x2="502" y2="418.3"/>
		<line x1="556.2" y1="207.1" x2="401.7" y2="361.6"/>
		<line x1="783.6" y1="136.7" x2="938.1" y2="-17.8"/>
		<line x1="157.6" y1="985.8" x2="3" y2="1140.3"/>
		<line x1="384.9" y1="915.5" x2="539.4" y2="760.9"/>
		<line x1="593.6" y1="549.7" x2="439.1" y2="704.3"/>
		<line x1="821" y1="479.4" x2="975.5" y2="324.9"/>
		<line x1="1029.7" y1="113.6" x2="875.2" y2="268.2"/>
		<line x1="1257.1" y1="43.3" x2="1411.6" y2="-111.2"/>
	</g>
	<g id="mid-blue">
		<line x1="794.4" y1="883.4" x2="639.8" y2="1037.9"/>
		<line x1="694.6" y1="834.8" x2="849.2" y2="680.3"/>
		<line x1="1230.4" y1="447.3" x2="1075.9" y2="601.8"/>
		<line x1="1130.7" y1="398.7" x2="1285.2" y2="244.2"/>
		<line x1="1666.5" y1="11.2" x2="1512" y2="165.7"/>
		<line x1="732" y1="1177.5" x2="886.6" y2="1023"/>
		<line x1="1267.9" y1="790" x2="1113.3" y2="944.5"/>
		<line x1="1168.1" y1="741.4" x2="1322.7" y2="586.9"/>
		<line x1="1703.9" y1="353.9" x2="1549.4" y2="508.4"/>
		<line x1="1604.2" y1="305.3" x2="1758.7" y2="150.8"/>
		<line x1="1205.5" y1="1084.1" x2="1360.1" y2="929.6"/>
		<line x1="1741.4" y1="696.5" x2="1586.8" y2="851.1"/>
		<line x1="1641.6" y1="648" x2="1796.2" y2="493.5"/>
		<line x1="1787.5" y1="1030.5" x2="1633" y2="1185"/>
		<line x1="1687.8" y1="981.9" x2="1842.3" y2="827.4"/>
		<line x1="200.1" y1="-44.4" x2="45.6" y2="110.1"/>
		<line x1="237.5" y1="298.3" x2="83" y2="452.8"/>
		<line x1="137.8" y1="249.7" x2="292.3" y2="95.2"/>
		<line x1="673.6" y1="-137.8" x2="519.1" y2="16.7"/>
		<line x1="283.7" y1="632.2" x2="129.2" y2="786.8"/>
		<line x1="184" y1="583.7" x2="338.5" y2="429.2"/>
		<line x1="719.8" y1="196.2" x2="565.2" y2="350.7"/>
		<line x1="620" y1="147.6" x2="774.6" y2="-6.9"/>
		<line x1="321.1" y1="974.9" x2="166.6" y2="1129.4"/>
		<line x1="221.4" y1="926.4" x2="375.9" y2="771.8"/>
		<line x1="757.2" y1="538.8" x2="602.7" y2="693.4"/>
		<line x1="657.5" y1="490.3" x2="812" y2="335.8"/>
		<line x1="1193.3" y1="102.7" x2="1038.7" y2="257.3"/>
		<line x1="1093.5" y1="54.2" x2="1248.1" y2="-100.3"/>
	</g>
	<g id="blue">
		<line x1="225.8" y1="1151" x2="534.9" y2="841.9"/>
		<line x1="827.1" y1="1003.3" x2="518" y2="1312.3"/>
		<line x1="661.9" y1="714.9" x2="971" y2="405.9"/>
		<line x1="1263.1" y1="567.2" x2="954.1" y2="876.3"/>
		<line x1="1098" y1="278.8" x2="1407.1" y2="-30.2"/>
		<line x1="1699.2" y1="131.1" x2="1390.2" y2="440.2"/>
		<line x1="699.3" y1="1057.6" x2="1008.4" y2="748.5"/>
		<line x1="1300.6" y1="909.9" x2="991.5" y2="1218.9"/>
		<line x1="1135.4" y1="621.5" x2="1444.5" y2="312.4"/>
		<line x1="1736.6" y1="473.8" x2="1427.6" y2="782.8"/>
		<line x1="1571.5" y1="185.4" x2="1880.6" y2="-123.6"/>
		<line x1="1172.8" y1="964.2" x2="1481.9" y2="655.1"/>
		<line x1="1774.1" y1="816.5" x2="1465" y2="1125.5"/>
		<line x1="1608.9" y1="528.1" x2="1918" y2="219"/>
		<line x1="1219" y1="1298.1" x2="1528" y2="989.1"/>
		<line x1="1655.1" y1="862" x2="1964.1" y2="553"/>
		<line x1="232.8" y1="75.5" x2="-76.2" y2="384.6"/>
		<line x1="270.2" y1="418.2" x2="-38.8" y2="727.3"/>
		<line x1="105.1" y1="129.8" x2="414.2" y2="-179.2"/>
		<line x1="706.3" y1="-17.9" x2="397.3" y2="291.2"/>
		<line x1="-284.8" y1="899.9" x2="24.2" y2="590.8"/>
		<line x1="316.4" y1="752.2" x2="7.3" y2="1061.2"/>
		<line x1="151.3" y1="463.8" x2="460.3" y2="154.7"/>
		<line x1="752.5" y1="316.1" x2="443.4" y2="625.1"/>
		<line x1="587.3" y1="27.7" x2="896.4" y2="-281.4"/>
		<line x1="1188.6" y1="-120" x2="879.5" y2="189"/>
		<line x1="-247.4" y1="1242.5" x2="61.6" y2="933.5"/>
		<line x1="188.7" y1="806.4" x2="497.7" y2="497.4"/>
		<line x1="789.9" y1="658.8" x2="480.8" y2="967.8"/>
		<line x1="624.8" y1="370.4" x2="933.8" y2="61.3"/>
		<line x1="1226" y1="222.7" x2="916.9" y2="531.7"/>
		<line x1="1662.1" y1="-213.4" x2="1353" y2="95.6"/>
	</g>
</g>
</svg>
    `;
    document.body.appendChild(document.getElementById('home-anim'));

  const panel = document.createElement("div");
  panel.id = "zw-panel";
  panel.className = "custom-scroll-panel"
  panel.innerHTML = `
  <div id="zw-sidebar">
    <button class="zw-sidebar-btn" id="zw-back-btn">Back</button>
    <button class="zw-sidebar-btn active" data-tab="home">Home</button>
    <button class="zw-sidebar-btn" data-tab="favorites">Favorites</button>
  </div>
  <div id="zw-main">
    <div id="zw-header">
      <button id="zw-sidebar-toggle">☰</button>
      Infinity
    </div>
    <input type="search" id="zw-search" placeholder="Search sounds..."/>
    <div class="zw-divider"></div>
    <div id="zw-buttons" class="custom-scroll-panel"></div>
  </div>
  `;
  document.body.appendChild(panel);

  const toggleBtn = panel.querySelector("#zw-sidebar-toggle");
  const sidebar = panel.querySelector("#zw-sidebar");
  const buttonsContainer = panel.querySelector("#zw-buttons");
  const sidebarBtns = panel.querySelectorAll(".zw-sidebar-btn");
  const searchInput = panel.querySelector("#zw-search");
  const backBtn = panel.querySelector("#zw-back-btn");

  let showingFavorites = false;
  let allSounds = [];
  let filteredSounds = [];

  const favorites = new Set();

  toggleBtn.onclick = () => {
    sidebar.classList.toggle("open");
  };

  backBtn.onclick = () => {
    location.reload();
  };

  sidebarBtns.forEach(btn => {
    if (btn.id === "zw-back-btn") return;
    btn.onclick = () => {
      sidebarBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      showingFavorites = btn.dataset.tab === "favorites";
      filterAndUpdate();
    };
  });

  function createSoundButton(sound) {
    const btn = document.createElement("button");
    btn.className = "zw-sound-btn";
    btn.textContent = sound.name;

    btn.onclick = () => new Audio(sound.url).play();

    const favIcon = document.createElement("span");
    favIcon.textContent = favorites.has(sound.name) ? "★" : "☆";
    favIcon.style.marginLeft = "8px";
    favIcon.style.cursor = "pointer";
    favIcon.style.color = favorites.has(sound.name) ? "#FFD700" : "#888";
    favIcon.style.fontSize = "18px";

    favIcon.onclick = (e) => {
      e.stopPropagation();
      if (favorites.has(sound.name)) {
        favorites.delete(sound.name);
        favIcon.textContent = "☆";
        favIcon.style.color = "#888";
      } else {
        favorites.add(sound.name);
        favIcon.textContent = "★";
        favIcon.style.color = "#FFD700";
      }
      if (showingFavorites) filterAndUpdate();
    };

    btn.appendChild(favIcon);

    return btn;
  }

  function filterAndUpdate() {
    const searchText = searchInput.value.trim().toLowerCase();
    filteredSounds = allSounds.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchText);
      const matchesFav = showingFavorites ? favorites.has(s.name) : true;
      return matchesSearch && matchesFav;
    });
    updateButtons(filteredSounds);
  }

  function updateButtons(list) {
    buttonsContainer.innerHTML = "";
    list.forEach(sound => {
      buttonsContainer.appendChild(createSoundButton(sound));
    });
  }

  searchInput.addEventListener("input", () => {
    filterAndUpdate();
  });

  fetch(jsonUrl)
    .then(res => res.json())
    .then(data => {
      allSounds = data;
      filterAndUpdate();
    });
})();