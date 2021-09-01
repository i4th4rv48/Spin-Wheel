var padding = {top:20, right:40, bottom:0, left:0},
w = 500 - padding.left - padding.right,
h = 500 - padding.top  - padding.bottom,
r = Math.min(w, h)/2,
rotation = 0,
oldrotation = 0,
picked = 100000,
oldpick = [],
color = d3.scale.category20();//category20c()
//randomNumbers = getRandomNumbers();

//http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results

var data = [
         
        {"label":"0", "value":1, "question":"Respective subject teacher."},
        {"label":"1",  "value":1,  "question":"10b"}, 
        {"label":"2",  "value":1,  "question":"10b"}, 
        {"label":"3",  "value":1,  "question":"10b"}, 
        {"label":"4",  "value":1,  "question":"10b"}, 
        {"label":"5",  "value":1,  "question":"10b"}, 
        {"label":"6",  "value":1,  "question":"10b"}, 
        {"label":"7",  "value":1,  "question":"10b"}, 
        {"label":"8",  "value":1,  "question":"10b"}, 
        {"label":"9",  "value":1,  "question":"10b"}, 
        {"label":"10", "value":1, "question":"10b"}, 
        {"label":"11", "value":1, "question":"Chaitanya Kharat"},
        {"label":"12", "value":1, "question":"Eshan Joshi"},                     
        {"label":"13", "value":1, "question":"Janhavi Deshpande"}, 
        {"label":"14", "value":1, "question":"Khushi Lachyan"}, 
        {"label":"15", "value":1, "question":"Khushi Umesh"}, 
        {"label":"16", "value":1, "question":"Kshitij Iyer"}, 
        {"label":"17", "value":1, "question":"Niharika Kulkarni"}, 
        {"label":"18", "value":1, "question":"Omkar Sisodiya"}, 
        {"label":"19", "value":1, "question":"Ranesh Korale"}, 
        {"label":"20", "value":1, "question":"Ridhima Vaishampayan"}, 
        {"label":"21", "value":1, "question":"Rudrani Wadelkar"}, 
        {"label":"22", "value":1, "question":"Rutuj Saraf"}, 
        {"label":"23", "value":1, "question":"Samruddhi Bhanage"}, 
        {"label":"24", "value":1, "question":"Sanat Shinganapurkar"}, 
        {"label":"25", "value":1, "question":"Shalaka Bhor"}, 
        {"label":"26", "value":1, "question":"Shaunak Diwan"},
        {"label":"27", "value":1, "question":"Swara Upadhye"},
        {"label":"28", "value":1, "question":"Tamanna Ragit"},
        {"label":"29", "value":1, "question":"Tanmayee Joshi"}, 
        {"label":"30", "value":1, "question":"Trisha Yeolekar"}, 
        {"label":"31", "value":1, "question":"Ved Jadhav"},
        {"label":"32", "value":1, "question":"Venkatesh Mandagane"},
        {"label":"33", "value":1, "question":"Vibha Kumar"},
        {"label":"34", "value":1, "question":"Yash Khatri"},
];


var svg = d3.select('#chart')
.append("svg")
.data([data])
.attr("width",  w + padding.left + padding.right)
.attr("height", h + padding.top + padding.bottom);

var container = svg.append("g")
.attr("class", "chartholder")
.attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");

var vis = container
.append("g");

var pie = d3.layout.pie().sort(null).value(function(d){return 1;});

// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
.data(pie)
.enter()
.append("g")
.attr("class", "slice");


arcs.append("path")
.attr("fill", function(d, i){ return color(i); })
.attr("d", function (d) { return arc(d); });

// add the text
arcs.append("text").attr("transform", function(d){
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle)/2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
})
.attr("text-anchor", "end")
.text( function(d, i) {
    return data[i].label;
});

container.on("click", spin);


function spin(d){

container.on("click", null);

//all slices have been seen, all done
console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
if(oldpick.length == data.length){
    console.log("done");
    container.on("click", null);
    return;
}

var  ps       = 360/data.length,
     pieslice = Math.round(1440/data.length),
     rng      = Math.floor((Math.random() * 1440) + 360);
    
rotation = (Math.round(rng / ps) * ps);

picked = Math.round(data.length - (rotation % 360)/ps);
picked = picked >= data.length ? (picked % data.length) : picked;


if(oldpick.indexOf(picked) !== -1){
    d3.select(this).call(spin);
    return;
} else {
    oldpick.push(picked);
}

rotation += 90 - Math.round(ps/2);

vis.transition()
    .duration(3000)
    .attrTween("transform", rotTween)
    .each("end", function(){

        //mark question as seen
        d3.select(".slice:nth-child(" + (picked + 1) + ") path")
            .attr("fill", "#111");

        //populate question
        d3.select("#question h1")
            .text(data[picked].question);

        oldrotation = rotation;
    
        container.on("click", spin);
    });
}

//make arrow
svg.append("g")
.attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
.append("path")
.attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
.style({"fill":"black"});

//draw spin circle
container.append("circle")
.attr("cx", 0)
.attr("cy", 0)
.attr("r", 60)
.style({"fill":"white","cursor":"pointer"});

//spin text
container.append("text")
.attr("x", 0)
.attr("y", 15)
.attr("text-anchor", "middle")
.text("SPIN")
.style({"font-weight":"bold", "font-size":"30px"});


function rotTween(to) {
var i = d3.interpolate(oldrotation % 360, rotation);
return function(t) {
return "rotate(" + i(t) + ")";
};
}


function getRandomNumbers(){
var array = new Uint16Array(1000);
var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);

if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
    window.crypto.getRandomValues(array);
    console.log("works");
} else {
    //no support for crypto, get crappy random numbers
    for(var i=0; i < 1000; i++){
        array[i] = Math.floor(Math.random() * 100000) + 1;
    }
}

return array;
}