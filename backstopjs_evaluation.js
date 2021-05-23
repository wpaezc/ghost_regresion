
const config = require("./backstop_config.json");
const fs = require('fs');

const {
  options,
  kraken_scenarios,
  playwright_scenarios
} = config;




for(scenario_index in playwright_scenarios) {
    let scenario = playwright_scenarios[scenario_index];

    let initialContent = `{"id":${scenario}, "changeUserData", "viewports": [{"label": "default", "width": 1024,"height": 768}], "onBeforeScript": "puppet/onBefore.js","onReadyScript": "puppet/onReady.js","scenarios": [`; 
    let finalContent = `  ],
    "paths": {
      "bitmaps_reference": "backstop_data/${scenario}/bitmaps_reference",
      "bitmaps_test": "backstop_data/${scenario}/bitmaps_test",
      "engine_scripts": "backstop_data/${scenario}/engine_scripts",
      "html_report": "backstop_data/${scenario}/html_report",
      "ci_report": "backstop_data/${scenario}/ci_report"
    },
    "report": ["browser"],
    "engine": "puppeteer",
    "engineOptions": {
      "args": ["--no-sandbox"]
    },
    "asyncCaptureLimit": 5,
    "asyncCompareLimit": 50,
    "debug": false,
    "debugWindow": false`;
    let scenarios="";


    if (!fs.existsSync(`./backstop_reports/${scenario}`)){
        fs.mkdirSync(`./backstop_reports/${scenario}`, { recursive: true });
      }

    let screenshots_folder = `./playwright_screenshots/${scenario}`
    const files = await fs.promises.readdir(screenshots_folder);

    let v1_files = files.filter(file => file.match(/^v1_/g));
    // let v2_files = files.filter(file => file.match(/^v2_/g))





    for(f in v1_files) {
        let name_split = f.name.split("_");
        let frame_name = name_split[1];
        let scenarioText = `
            {"label": "${frame_name}",
              "cookiePath": "backstop_data/engine_scripts/cookies.json",
              "url": "../ghost_regresion/playwright_screenshots/userManagementChangeUserData/v2__${frame_name}.png",
              "referenceUrl": "../ghost_regresion/playwright_screenshots/userManagementChangeUserData/v1__${frame_name}.png",
              "readyEvent": "",
              "readySelector": "",
              "delay": 0,
              "hideSelectors": [],
              "removeSelectors": [],
              "hoverSelector": "",
              "clickSelector": "",
              "postInteractionWait": 0,
              "selectors": [],
              "selectorExpansion": true,
              "expect": 0,
              "misMatchThreshold" : 2.0,
              "requireSameDimensions": true}`;
        if ()
              scenarios=scenarios+scenarioText;
        };
        
        let jsonText = initialContent+scenarios+finalContent;
        let jsonString = JSON.stringify(jsonText)fs.writeFile('./backstop.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
        };
    



    
        
        
        ${ scenarioText }` ;
    
    ],
    "paths": {
        "bitmaps_reference": "backstop_data/bitmaps_reference",
        "bitmaps_test": "backstop_data/bitmaps_test",
        "engine_scripts": "backstop_data/engine_scripts",
        "html_report": "backstop_data/html_report",
        "ci_report": "backstop_data/ci_report"
      },
      "report": ["browser"],
      "engine": "puppeteer",
      "engineOptions": {
        "args": ["--no-sandbox"]
      },
      "asyncCaptureLimit": 5,
      "asyncCompareLimit": 50,
      "debug": false,
      "debugWindow": false
    }







const file = {
    
        "id": "changeUserData",
        "viewports": [
          {
            "label": "default",
            "width": 1024,
            "height": 768
          }
        ],
        "onBeforeScript": "puppet/onBefore.js",
        "onReadyScript": "puppet/onReady.js",
        "scenarios": [
          {
            "label": "loginSuccess",
            "cookiePath": "backstop_data/engine_scripts/cookies.json",
            "url": "../ghost_regresion/playwright_screenshots/userManagementChangeUserData/v2__1successfulLogin.png",
            "referenceUrl": "../ghost_regresion/playwright_screenshots/userManagementChangeUserData/v1__1successfulLogin.png",
            "readyEvent": "",
            "readySelector": "",
            "delay": 0,
            "hideSelectors": [],
            "removeSelectors": [],
            "hoverSelector": "",
            "clickSelector": "",
            "postInteractionWait": 1,
            "selectors": [],
            "selectorExpansion": true,
            "expect": 0,
            "misMatchThreshold" : 1.0,
            "requireSameDimensions": true
          },
          {
            "label": "displayStaff",
            "cookiePath": "backstop_data/engine_scripts/cookies.json",
            "url": "../ghost_regresion/playwright_screenshots/userManagementChangeUserData/v2__2displayStaff.png",
            "referenceUrl": "../ghost_regresion/playwright_screenshots/userManagementChangeUserData/v1__2displayStaff.png",
            "readyEvent": "",
            "readySelector": "",
            "delay": 0,
            "hideSelectors": [],
            "removeSelectors": [],
            "hoverSelector": "",
            "clickSelector": "",
            "postInteractionWait": 0,
            "selectors": [],
            "selectorExpansion": true,
            "expect": 0,
            "misMatchThreshold" : 2.0,
            "requireSameDimensions": true
          },
          {
            "label": "ownerDetail",
            "cookiePath": "backstop_data/engine_scripts/cookies.json",
            "url": "../ghost_regresion/playwright_screenshots/userManagementChangeUserData/v2__3originalOwnerDetail.png",
            "referenceUrl": "../ghost_regresion/playwright_screenshots/userManagementChangeUserData/v1__3originalOwnerDetail.png",
            "readyEvent": "",
            "readySelector": "",
            "delay": 0,
            "hideSelectors": [],
            "removeSelectors": [],
            "hoverSelector": "",
            "clickSelector": "",
            "postInteractionWait": 0,
            "selectors": [],
            "selectorExpansion": true,
            "expect": 0,
            "misMatchThreshold" : 2.0,
            "requireSameDimensions": true
          },
          {
            "label": "modifiedOwnerDetail",
            "cookiePath": "backstop_data/engine_scripts/cookies.json",
            "url": "../ghost_regresion/playwright_screenshots/userManagementChangeUserData/v2__4modifiedOwnerDetail.png",
            "referenceUrl": "../ghost_regresion/playwright_screenshots/userManagementChangeUserData/v1__4modifiedOwnerDetail.png",
            "readyEvent": "",
            "readySelector": "",
            "delay": 0,
            "hideSelectors": [],
            "removeSelectors": [],
            "hoverSelector": "",
            "clickSelector": "",
            "postInteractionWait": 0,
            "selectors": [],
            "selectorExpansion": true,
            "expect": 0,
            "misMatchThreshold" : 2.0,
            "requireSameDimensions": true
          },
          {
            "label": "savedOwnerDetail",
            "cookiePath": "backstop_data/engine_scripts/cookies.json",
            "url": "../ghost_regresion/playwright_screenshots/userManagementChangeUserData/v2__5savedOwnerDetail.png",
            "referenceUrl": "../ghost_regresion/playwright_screenshots/userManagementChangeUserData/v1__5savedOwnerDetail.png",
            "readyEvent": "",
            "readySelector": "",
            "delay": 0,
            "hideSelectors": [],
            "removeSelectors": [],
            "hoverSelector": "",
            "clickSelector": "",
            "postInteractionWait": 0,
            "selectors": [],
            "selectorExpansion": true,
            "expect": 0,
            "misMatchThreshold" : 2.0,
            "requireSameDimensions": true
          }
        ],
        "paths": {
          "bitmaps_reference": "backstop_data/bitmaps_reference",
          "bitmaps_test": "backstop_data/bitmaps_test",
          "engine_scripts": "backstop_data/engine_scripts",
          "html_report": "backstop_data/html_report",
          "ci_report": "backstop_data/ci_report"
        },
        "report": ["browser"],
        "engine": "puppeteer",
        "engineOptions": {
          "args": ["--no-sandbox"]
        },
        "asyncCaptureLimit": 5,
        "asyncCompareLimit": 50,
        "debug": false,
        "debugWindow": false
      
      
}





async function executeTest(){
  let resultInfo = {}
  let datetime = new Date().toISOString().replace(/:/g,".");

  for(scenario_index in playwright_scenarios) {
    let scenario = playwright_scenarios[scenario_index]

    if (!fs.existsSync(`./backstopjs_reports/${scenario}`)){
      fs.mkdirSync(`./backstop_reports/${scenario}`, { recursive: true });
    }

    let screenshots_folder = `./playwright_screenshots/${scenario}`
    const files = await fs.promises.readdir(screenshots_folder);

    let pairs = []

    let v1_files = files.filter(file => file.match(/^v1_/g))

    v1_files.forEach((v1_file) => {
      v2_file = v1_file.replace("v1", "v2")
      if(files.includes(v2_file)) {
        pairs.push([v1_file, v2_file])
      }
    })

    let resultInfo = {}
    let steps = []

    for(pair in pairs) {
      const data = await compareImages(
        fs.readFileSync(`./playwright_screenshots/${scenario}/${pairs[pair][0]}`),
        fs.readFileSync(`./playwright_screenshots/${scenario}/${pairs[pair][1]}`),
        options
      );

      let compare_name = pairs[pair][0].replace("v1", "compare_")

      fs.copyFileSync(`./playwright_screenshots/${scenario}/${pairs[pair][0]}`, `./resemblejs_reports/${scenario}/${pairs[pair][0]}`)
      fs.copyFileSync(`./playwright_screenshots/${scenario}/${pairs[pair][1]}`, `./resemblejs_reports/${scenario}/${pairs[pair][1]}`)
      fs.copyFileSync(`./index.css`, `./resemblejs_reports/${scenario}/index.css`)
      fs.writeFileSync(`./resemblejs_reports/${scenario}/${compare_name}`, data.getBuffer());


      let step_name = pairs[pair][0].replace('v1_', '').replace('.png', '')
      steps.push(step_name)

      resultInfo[step_name] = {
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime
      }
    }


    let name_split = scenario.split("_")
    let feature_name = name_split.slice(0,2).join(" ").toLowerCase()
    let scenario_name = name_split.slice(2,100).join(" ").toLowerCase()

    fs.writeFileSync(
      `./resemblejs_reports/${scenario}/report.html`,
      createReport('playwright', feature_name, scenario_name, datetime, resultInfo, steps)
    );
  }
 
  for(scenario_index in kraken_scenarios) {
    let scenario = kraken_scenarios[scenario_index]

    if (!fs.existsSync(`./resemblejs_reports/${scenario}`)){
      fs.mkdirSync(`./resemblejs_reports/${scenario}`, { recursive: true });
    }

    let screenshots_folder = `./kraken_screenshots/${scenario}`
    const files = await fs.promises.readdir(screenshots_folder);

    let pairs = []

    let v1_files = files.filter(file => file.match(/^v1_/g))

    v1_files.forEach((v1_file) => {
      v2_file = v1_file.replace("v1", "v2")
      if(files.includes(v2_file)) {
        pairs.push([v1_file, v2_file])
      }
    })

    let resultInfo = {}
    let steps = []

    for(pair in pairs) {
      const data = await compareImages(
        fs.readFileSync(`./kraken_screenshots/${scenario}/${pairs[pair][0]}`),
        fs.readFileSync(`./kraken_screenshots/${scenario}/${pairs[pair][1]}`),
        options
      );

      let compare_name = pairs[pair][0].replace("v1", "compare_")

      fs.copyFileSync(`./kraken_screenshots/${scenario}/${pairs[pair][0]}`, `./resemblejs_reports/${scenario}/${pairs[pair][0]}`)
      fs.copyFileSync(`./kraken_screenshots/${scenario}/${pairs[pair][1]}`, `./resemblejs_reports/${scenario}/${pairs[pair][1]}`)
      fs.copyFileSync(`./index.css`, `./resemblejs_reports/${scenario}/index.css`)
      fs.writeFileSync(`./resemblejs_reports/${scenario}/${compare_name}`, data.getBuffer());


      let step_name = pairs[pair][0].replace('v1_', '').replace('.png', '')
      steps.push(step_name)

      resultInfo[step_name] = {
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime
      }
    }


    let name_split = scenario.split("_")
    let feature_name = name_split.slice(0,2).join(" ").toLowerCase()
    let scenario_name = name_split.slice(2,100).join(" ").toLowerCase()

    fs.writeFileSync(
      `./resemblejs_reports/${scenario}/report.html`,
      createReport('kraken-mobile', feature_name, scenario_name, datetime, resultInfo, steps)
    );
  }


  console.log('------------------------------------------------------------------------------------')
  console.log("Execution finished. Check the report under the results folder")
  return

  return resultInfo;  
}
(async ()=>console.log(await executeTest()))();

function step(index, b, info){
  return `<div class="step" id="test0">
  <div class=" btitle">
      <h2>Step ${index + 1}: ${b}</h2>
      <p>Data: <pre>${JSON.stringify(info, null, 4)}</pre></p>
  </div>
  <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Reference</span>
      <img class="img2" src="v1_${b}.png" id="refImage" label="Reference">
    </div>
    <div class="imgcontainer">
      <span class="imgname">Test</span>
      <img class="img2" src="v2_${b}.png" id="testImage" label="Test">
    </div>
  </div>
  <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Diff</span>
      <img class="imgfull" src="./compare__${b}.png" id="diffImage" label="Diff">
    </div>
  </div>
</div>`
}

function createReport(tool, feature_name, scenario_name, datetime, resInfo, steps){
  return `
  <html>
      <head>
          <title> VRT Report </title>
          <link href="index.css" type="text/css" rel="stylesheet">
      </head>
      <body>
          <h1 class="title">
            Report for <a href="${config.url}"> ${config.url}</a> executed at ${datetime}
          </h1>

          <h2 class="subtitle">
            Screenshots taken on: <span>${tool}</span> 
          </h2>

          <h2 class="subtitle">
            Feature: <span>${feature_name}</span> 
          </h2>
          <h2 class="subtitle">
            Scenario: <span>${scenario_name}</span> 
          </h2>

          <div id="visualizer">
            ${steps.map((b, index) => {
              return step(index, b, resInfo[b]) 
            })}
          </div>
      </body>
  </html>`
}
