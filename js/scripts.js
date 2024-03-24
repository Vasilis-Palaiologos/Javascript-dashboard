var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

var stacked_bar_chart_container = document.getElementById("stacked-bar-chart-container");
var simple_bar_chart_container = document.getElementById("simple-bar-chart-container");
var line_chart_container = document.getElementById("line-chart-container");
var pie_chart_container = document.getElementById("pie-chart-container");

simple_bar_chart_container.style.display = "none";
line_chart_container.style.display = "none";
pie_chart_container.style.display = "none";

function showStackedBarChart(){
    stacked_bar_chart_container.style.display = "block";
    simple_bar_chart_container.style.display = "none";
    line_chart_container.style.display = "none";
    pie_chart_container.style.display = "none";
    closeSidebar();
}

function showSimpleBarChart(){
    stacked_bar_chart_container.style.display = "none";
    simple_bar_chart_container.style.display = "block";
    line_chart_container.style.display = "none";
    pie_chart_container.style.display = "none";
    closeSidebar();
}

function showLineChart(){
    stacked_bar_chart_container.style.display = "none";
    simple_bar_chart_container.style.display = "none";
    line_chart_container.style.display = "block";
    pie_chart_container.style.display = "none";
    closeSidebar();
}

function showPieChart(){
    stacked_bar_chart_container.style.display = "none";
    simple_bar_chart_container.style.display = "none";
    line_chart_container.style.display = "none";
    pie_chart_container.style.display = "block";
    closeSidebar();
}


function openSidebar(){
    if(!sidebarOpen){
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
    }
}

function closeSidebar(){
    if(sidebarOpen){
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
    }
}



// CHARTS

// STACKED BAR CHART

fetch('http://178.18.253.143:8080/sp-api/spr_topXLaytime/2024-02-01%2000:00:00&2024-02-29%2000:00:00&15')
.then((response) =>{
    return response.json();
})
.then((stackedBarChartData) => {
    const series = new Array();
    const recordset = stackedBarChartData['recordset'];
    for(let i=0; i<recordset.length; i++){
        series.push({name: recordset[i]['Vessel'], data: [recordset[i]["TotalLaytime"], recordset[i]["AvgLaytime"]]})
    }
    
    let stackedBarChartOptions = {
        series: series,
        chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar:{
            show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
        //   dataLabels: {
        //     total: {
        //       enabled: true,
        //       offsetX: 0,
        //       style: {
        //         fontSize: '15px',
        //         fontWeight: 900
        //       }
        //     }
        //   }
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Average vs Total time'
      },
      xaxis: {
        categories: ["Average Time", "Total Time"],
        labels: {
          formatter: function (val) {
            return val
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
      };
    
      let stackedBarChart = new ApexCharts(document.querySelector("#stacked-bar-chart"), stackedBarChartOptions);
      stackedBarChart.render();
})
.catch((error) => {
    console.log(error);
});


// SIMPLE BAR CHART

fetch("http://178.18.253.143:8080/sp-api/spr_TopXVesselsDeadTime/15")
.then((response) => {
    return response.json();
})
.then((simpleBarChartData) => {
    const recordset = simpleBarChartData['recordset'];

    const data = new Array();
    for(let i=0; i<recordset.length; i++){
        data.push(recordset[i]['GenAvgDeadTimePerBerthing'])
    }

    const categories = new Array();
    for(let i=0; i<recordset.length; i++){
        categories.push(recordset[i]['VNAME'])
    }

    let simpleBarChartOptions = {
        series: [
            {
                name: "Avg Dead Time",
                data: data
            }
        ],
        chart: {
        type: 'bar',
        height: 350,
        toolbar:{
            show: false
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: categories,
      },
      title: {
        text: 'Genenal Avg Dead Time Per Berthing'
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          }
        }
      }
    };

      let simpleBarChart = new ApexCharts(document.querySelector("#simple-bar-chart"), simpleBarChartOptions);
      simpleBarChart.render();
})
.catch((error) => {
    console.log(error);
});


// LINE CHART

fetch("http://178.18.253.143:8080/sp-api/spr_occupancyByTime/2024-02-01%2000:00:00&2024-02-29%2000:00:00&0")
.then((response) => {
    return response.json();
})
.then((lineChartData) => {
    const recordset = lineChartData['recordset'];

    const data = new Array();
    for(let i=0; i<recordset.length; i++){
        data.push({y: recordset[i]['AllBerths'], x: recordset[i]["DT"].substr(0, 10)})
    }

    let lineChartOptions = {
        series: [{
          name: "",
          data: data
      }],
        chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Daily Berth Occupancy vs Date',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        type: "datetime",
        
      }
      };

      let lineChart = new ApexCharts(document.querySelector("#line-chart"), lineChartOptions);
      lineChart.render();
})
.catch((error) => {
    console.log(error);
});


// PIE CHART
fetch("http://178.18.253.143:8080/sp-api/spr_Funnel/2024-02-01%2000:00:00&2024-02-29%2000:00:00")
.then((response) => {
    return response.json();
})
.then((pieChartData) => {
    const recordset = pieChartData['recordset'];

    let test = {
        "SessionTime": 207.716666,
        "Laytime": 190.433333,
        "ConnectionTime": 156.1,
        "TransferTime": 146.1,
        "DeadTime": 23.233333,
        "MooringTime": 3.4,
        "UnmooringTime": 2.533333
      }

    let pieChartOptions = {
        series: [
            recordset[0]["SessionTime"],
            recordset[0]["Laytime"],
            recordset[0]["ConnectionTime"],
            recordset[0]["TransferTime"],
            recordset[0]["DeadTime"],
            recordset[0]["MooringTime"],
            recordset[0]["UnmooringTime"]
        ],
        chart: {
        height: 350,
        type: 'pie',
      },
      labels: ['SessionTime', 'Laytime', 'ConnectionTime', 'TransferTime', 'DeadTime', 'MooringTime', 'UnmooringTime'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
      };

      let pieChart = new ApexCharts(document.querySelector("#pie-chart"), pieChartOptions);
      pieChart.render();
})
.catch((error) => {
    console.log(error);
});