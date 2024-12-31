var gauge2 = new RadialGauge({
    renderTo: 'canvas-2',
    width: 350,
    height: 350,
    units: "",
    title: "RPM",
    minValue: 0,
    maxValue: 800,
    majorTicks: [0,100,200,300,400,500,600,700,800],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
       
        {
            "from": 500,
            "to": 800,
            "color": "rgba(255, 0, 0, .3)"
        }
    ],
    ticksAngle: 245,
    startAngle: 57.5,
    colorMajorTicks: "#ddd",
    colorMinorTicks: "#ddd",
    colorTitle: "#eee",
    colorUnits: "#ccc",
    colorNumbers: "#eee",
    colorPlate: "#222",
    borderShadowWidth: 0,
    borders: true,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: true,
    animationDuration: 500,
    animationRule: "linear",
    colorBorderOuter: "#333",
    colorBorderOuterEnd: "#111",
    colorBorderMiddle: "#222",
    colorBorderMiddleEnd: "#111",
    colorBorderInner: "#111",
    colorBorderInnerEnd: "#333",
    colorNeedleShadowDown: "#333",
    colorNeedleCircleOuter: "#333",
    colorNeedleCircleOuterEnd: "#111",
    colorNeedleCircleInner: "#111",
    colorNeedleCircleInnerEnd: "#222",
    valueBoxBorderRadius: 0,
    colorValueBoxRect: "#222",
    colorValueBoxRectEnd: "#333",
   
   }).draw();
   const gauge = new RadialGauge({
    renderTo: 'canvas-id',
    width: 350,
    height: 350,
    units: "",
    title: "Kw",
    minValue: -300,
    maxValue: 300,
    majorTicks: [-300,-200,-100,0,100,200,300],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": -300,
            "to": 0,
            "color": "rgba(0,0, 255, .3)"
        },
        {
            "from": 0,
            "to": 300,
            "color": "rgba(255, 0, 0, .3)"
        }
    ],
    ticksAngle: 225,
    startAngle: 67.5,
    colorMajorTicks: "#ddd",
    colorMinorTicks: "#ddd",
    colorTitle: "#eee",
    colorUnits: "#ccc",
    colorNumbers: "#eee",
    colorPlate: "#222",
    borderShadowWidth: 0,
    borders: true,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: true,
    animationDuration: 600,
    animationRule: "linear",
    colorBorderOuter: "#333",
    colorBorderOuterEnd: "#111",
    colorBorderMiddle: "#222",
    colorBorderMiddleEnd: "#111",
    colorBorderInner: "#111",
    colorBorderInnerEnd: "#333",
    colorNeedleShadowDown: "#333",
    colorNeedleCircleOuter: "#333",
    colorNeedleCircleOuterEnd: "#111",
    colorNeedleCircleInner: "#111",
    colorNeedleCircleInnerEnd: "#222",
    valueBoxBorderRadius: 0,
    colorValueBoxRect: "#222",
    colorValueBoxRectEnd: "#333"
   }).draw();

   var gauge3 = new LinearGauge({
    renderTo: 'canvas-3',
    dataWidth:"60",
    dataHeight:"110",
    dataUnits:"°C",
    dataMinValue:"0",
    dataStartAngle:"90",
    dataTicksAngle:"180",
    dataValueBox:false,
    dataMaxValue:"60",
    dataMajorTicks:"0,20,40,60",
    dataMinorTicks:"2",
    dataStrokeTicks:true,
    dataHighlights:'[ {"from": 40, "to": 60, "color": "rgba(200, 50, 50, .75)"} ]',
   dataColorPlate:"#9F343400",
    colorPlate:"#9F343400",
    dataBorderShadowWidth:"0",
    dataBorders:false,
    dataNeedleType:"arrow",
    dataNeedleWidth:"6",
    dataNeedleCircleSize:"7",
    dataNeedleCircleOuter:true,
    dataNeedleCircleInner:true,
    dataAnimationDuration:"500",
    dataAnimationRule:"linear",
    dataBarWidth:"8",
    dataValue:"35",
    dataTickSide:"right",
    dataNumberSide:"right",
    dataNeedleSide:"right"
}).draw();


