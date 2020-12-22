
    function dropdownmenu(){
        d3.json("../samples.json").then((incomingData) => {
            var samplenames = incomingData.names
            var object1 = d3.select("#selDataset")
            console.log(samplenames);
            samplenames.forEach((element) => {
                object1.append("option").text(element).property("value", element)
            });
            buildtable(samplenames[0]);
            buildcharts(samplenames[0]);
    });
    };


    function buildcharts(sampleid){
        d3.json("../samples.json").then((incomingData) => {
            var samplesdata = incomingData.samples
        var filterdata = samplesdata.filter(data1 => data1.id == sampleid)
        filterdata = filterdata[0]
        console.log(filterdata)
        var yvalues = filterdata.sample_values.slice(0,10)
        var labels = filterdata.otu_labels.slice(0,10)
        var trace1 = {
             x: filterdata.otu_ids,
             y: yvalues,
             text: labels,
             type: "bar",
             orientation: 'h'
             };
        var data1 = [trace1];
        var layout1 = {
            title: "Top Ten Most Common Microbial Species (OTU's)",
            xaxis: {
                title: {
                  text: 'Number of Samples',
                },
              },
            yaxis: {
                title: {
                  text: 'OTU ID',
                },
              },
            height: 600,
            width: 800,
        };
        Plotly.newPlot("bar", data1, layout1);
        var trace2 = {
            x: filterdata.otu_ids,
            y: filterdata.sample_values,
            text: filterdata.otu_labels,
            mode: 'markers',
            marker: {
                color: filterdata.otu_ids,
                size: filterdata.sample_values,
            }
        };
        var data2 = [trace2];
        var layout2 = {
            title: "Microbial Species in Sample",
            showlegend: true,
            height: 800,
            width: 1000,
        };
        Plotly.newPlot("bubble", data2, layout2);
    });
    };


    function buildtable(sampleid){
        d3.json("../samples.json").then((incomingData) => {
            var metadata = incomingData.metadata
        var filterdata = metadata.filter(data1 => data1.id == sampleid)
        var tbody = d3.select("#sample-metadata");
        tbody.html("")
        console.log(filterdata[0])
        Object.entries(filterdata[0]).forEach(([key, value]) => {
            var row = tbody.append("tr");
            row.append("td").html(`${key}`);
            row.append("td").html(`${value}`);
        });
    });
}
dropdownmenu()

function optionChanged(newsampleID) {
    buildtable(newsampleID)
    buildcharts(newsampleID)
}

