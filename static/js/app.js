const URL = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

// Build the metadata panel
function buildMetadata(sample) {
  d3.json(URL).then((data) => {

    // get the metadata field
    // console.log(data);
    let demo_info = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let results = demo_info.filter(id => id.id == sample);
    let result_1 = results[0];
    console.log(result_1);

    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata
    d3.select('#sample-metadata').html('');

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result_1).forEach(([key,value]) => {
      console.log(key,value);
      //Select the demographic info html
      d3.select('#sample-metadata').append('h6').text(`${key},${value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json(URL).then((data) => {

    // Get the samples field


    // Filter the samples for the object with the desired sample number


    // Get the otu_ids, otu_labels, and sample_values


    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Build the bar chart
// It is a horizontal bar chart with a dropdown menu to display the top 10 OTUs 
function BarChart(sample){
    //Use D3 to access the sample data for populating the bar chart
    d3.json(URL).then((data) => {
        let  sample_data = data.samples;
        // Apply a filter based on name_one
        let results = sample_data.filter(id => id.id == sample);
        // Access the first result and store it in results filter
        let first_result = results[0];
        console.log(first_result);
        // I want to display in the bar chart the first 10 results
        let sample_values = first_result.sample_values.slice(0,10);
        let otu_ids = first_result.otu_ids.slice(0,10);
        let otu_labels = first_result.otu_labels.slice(0,10);
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        //Bar Chart's trace
        let bar_chart_trace = {
            x: sample_values.reverse(),
            y: otu_ids.map(item => `OTU ${item}`).reverse(),
            text: otu_labels.reverse(),
            type: 'bar',
            orientation: 'h',
            

        };
        
        let layout = {title: { 
            text: '<b>Top 10 OTUs found</b>',
        font: {size: 16, color: 'black'},
        },
        paper_bgcolor: "lavender",
    };
        Plotly.newPlot('bar', [bar_chart_trace], layout);
    });
};

// Build the bubble chart
function BubbleChart(sample){
    //Using D3 to access the sample data and populate the bubble chart
    d3.json(URL).then((data) => {
        let sampleData = data.samples;
        //Apply the filter
        let results = sampleData.filter(result => result.id == sample);
        // Access the first result and store it in results filter
        let firstResult = results[0];
        console.log(firstResult);
         // I want to display the results in the bubble chart
         let sample_values = firstResult.sample_values;
         let otu_ids = firstResult.otu_ids;
         let otu_labels = firstResult.otu_labels;
         console.log(sample_values, otu_ids, otu_labels);
         
 
         // Bubble Chart's trace
        let bubble_chart_trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            }
        };

        let layout = {
            title: { 
                text: '<b>Bacteria Count for each Sample IDd</b>',
            font: {size: 16, color: 'black'}
            },
            hovermode: 'closest',
            paper_bgcolor: "lavender",
            xaxis:{title: 'OTU ID'},
            yaxis:{title: 'Number of Bacteria'},
        };
        //Call Plotly
        Plotly.newPlot('bubble', [bubble_chart_trace], layout)

    });
};

// Build the bubble chart
function GaugeChart(selectedValue) {
  // Fetch the JSON data and console log it 
  d3.json(URL).then((data) => {
      // An array of metadata objects
      let metadata = data.metadata;
      
      // Filter data where id = selected value after converting their types 
      // (bc meta.id is in integer format and selectValue from is in string format)
      let filteredData = metadata.filter((meta) => meta.id == selectedValue);
    
      // Assign the first object to obj variable
      let obj = filteredData[0]

      // Trace for the data for the gauge chart
      let trace = [{
          domain: { x: [0, 1], y: [0, 1] },
          value: obj.wfreq,
          title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 24}},
          type: "indicator", 
          mode: "gauge+number",
          gauge: {
              axis: {range: [null, 10]}, 
              bar: {color: "rgb(68,166,198)"},
              steps: [
                  { range: [0, 1], color: "rgb(233,245,248)" },
                  { range: [1, 2], color: "rgb(218,237,244)" },
                  { range: [2, 3], color: "rgb(203,230,239)" },
                  { range: [3, 4], color: "rgb(188,223,235)" },
                  { range: [4, 5], color: "rgb(173,216,230)" },
                  { range: [5, 6], color: "rgb(158,209,225)" },
                  { range: [6, 7], color: "rgb(143,202,221)" },
                  { range: [7, 8], color: "rgb(128,195,216)" },
                  { range: [8, 9], color: "rgb(113,187,212)" },
                  { range: [9, 10], color: "rgb(98,180,207)" }
              ]
          }
      }];

       // Use Plotly to plot the data in a gauge chart
       Plotly.newPlot("gauge", trace);
  });
}

// Function to run on page load
function init() {
  // Use d3 to select the dropdown with id of `#selDataset`
  let dropdownMenu = d3.select('#selDataset');

  d3.json(URL).then((data) => {
    console.log(`Data: ${data}`);

    // Get the names field
    let names = data.names;
    console.log(names);
      // Add samples to dropdown menu
      /**********  
      names.forEach(function(id){
          // Append each name as an option to the drop down menu
          dropdownMenu.append('option').text(id).property('value', id);
      });
      **************/

      names.forEach((name) => {
        // Append each name as an option to the drop down menu
        // This is adding each name to the html file as an option element with value = a name in the names array
        dropdownMenu.append("option").text(name).property("value", name);
      });

    // Get the first sample from the list
    let name_first = names[0];

    console.log(name_first);

    // Build charts and metadata panel with the first sample
    BarChart(name_first)
    BubbleChart(name_first);
    buildMetadata(name_first);
    GaugeChart(name_first);
  });

};

// Function for event listener
function optionChanged(results) {
  // Build charts and metadata panel each time a new sample is selected
  console.log(results);
  BarChart(results);
  BubbleChart(results);
  buildMetadata(results);
  GaugeChart(results);
}

// Initialize the dashboard
init();
