import Popup from './Popup';
import { useState } from 'react';

// https://observablehq.com/@heaversm/mozilla-ecosystem@196
function _1(md){return(
    md`# Mozilla Ecosystem
    
    Click to zoom in or out.`
    )}
    
    function _2(htl){return(
    htl.html`<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600;800&display=swap" rel="stylesheet">
    <style>body { border: 0; } footer { display: none }</style>`
    )}
    
    function _chart(pack,data,d3,width,height,color)
    {
      const root = pack(data);
      let focus = root;
      let view;
    
      const svg = d3.create("svg")
          .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
          .style("display", "block")
          .style("margin", "0 -14px")
          .style("background", color(-1))
          .style("cursor", "pointer")
          .on("click", (event) => zoom(event, root));    
    
      const node = svg.append("g")
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
          .attr("fill", d => d.children ? color(d.depth) : "#e6150e")
        //   .attr("pointer-events", d => !d.children ? "none" : null)
          .on("mouseover", function() { 
            d3.select(this).attr("stroke", "#000"); 
            d3.select(this).style("filter", "url(#glow"); 
            d3.select(this).attr('fill-opacity', .8);

        })
          .on("mouseout", function() { 
            d3.select(this).attr("stroke", null);
            d3.select(this).attr('fill-opacity', 1);
        })
        //   .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));
        .on("click", (event, d) => {
            if (!d.children) {
                alert("Intern: Dhruv Rebba\nEnterprise Technology - P&C Claims\nInjury Insights/Claims Telematics\nProficiencies:\nJava, Python, AWS, Computer Vision\nAbout: Dhruv is currently going to be a sophomore at Arizona State University for Computer Science & Cyber Security.");
            } else if (focus !== d) {
              zoom(event, d);
              event.stopPropagation();
            }
          });
    
        var tooltip = d3.select("#d3tooltip")
        .append("div")
        .attr("class", "tooltip") // define a nice css for it in class .tooltip
        .text("Text here can be overwritten");

        d3.select("#circleBasicTooltip")
        .on("mouseover", () => (tooltip.style("visibility", "visible").text("I'm a circle!")))
        .on("mousemove", () => (tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px")))
        .on("mouseout", () => (tooltip.style("visibility", "hidden")));
          
    
      const label = svg.append("g")
          .style("font", "16px sans-serif")
          .style("font-family","Inter")
          .style("font-weight","600")
          .attr("pointer-events", "none")
          .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
          .style("fill","#fff")
          .style("fill-opacity", d => d.parent === root ? 1 : 0)
          .style("display", d => d.parent === root ? "inline" : "none")
          .text(d => d.data.name);
    
      zoomTo([root.x, root.y, root.r * 2]);
    
      function zoomTo(v) {
        const k = width / v[2];
    
        view = v;
    
        label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
      }
    
      function zoom(event, d) {
        const focus0 = focus;
    
        focus = d;
    
        const transition = svg.transition()
            .duration(event.altKey ? 7500 : 750)
            .tween("zoom", d => {
              const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
              return t => zoomTo(i(t));
            });
    
        label
          .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
          .transition(transition)
            .style("fill-opacity", d => d.parent === focus ? 1 : 0)
            .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
      }
    
      return svg.node();
    }
    
    
    function _data(FileAttachment){return(
    FileAttachment("flare-2@2.json").json()
    )}
    
    function _pack(d3,width,height){return(
    data => d3.pack()
        .size([width, height])
        .padding(3)
      (d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value))
    )}
    
    function _width(){return(
    932
    )}
    
    function _height(width){return(
    width
    )}
    
    function _format(d3){return(
    d3.format(",d")
    )}
    
    function _color(d3){return(
    d3.scaleLinear()
        .domain([0, 5])
        //.range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .range(["#898b8c","#f2f4f5"])
        //#f76363, #ebdada, 
        .interpolate(d3.interpolateHcl)
    )}
    
    function _d3(require){return(
    require("d3@6")
    )}
    
    export default function define(runtime, observer) {
      const main = runtime.module();
      function toString() { return this.url; }
      const fileAttachments = new Map([
        ["flare-2@2.json", "./files/af12b2c45618d5de452c00b06fedb7419a7733e49ba65d051f45b3f9c754b41b842343db07d77422daa2137734c5eb09737342b5a5dda9ca509055fcd8f9a758.json"]
      ]);
      main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
      main.variable(observer()).define(["md"], _1);
      main.variable(observer()).define(["htl"], _2);
      main.variable(observer("chart")).define("chart", ["pack","data","d3","width","height","color"], _chart);
      main.variable(observer("data")).define("data", ["FileAttachment"], _data);
      main.variable(observer("pack")).define("pack", ["d3","width","height"], _pack);
      main.variable(observer("width")).define("width", _width);
      main.variable(observer("height")).define("height", ["width"], _height);
      main.variable(observer("format")).define("format", ["d3"], _format);
      main.variable(observer("color")).define("color", ["d3"], _color);
      main.variable(observer("d3")).define("d3", ["require"], _d3);
      return main;
    }

