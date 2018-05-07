google.charts.load('current', {'packages':['gantt']});
google.charts.setOnLoadCallback(drawChart);

function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

function sizeForChart() {
  var width = document.getElementById("chart_div").offsetWidth;
  var chartWidth = width - 40;
  var labelsWidth = 300;

  if (width < 600) {
    chartWidth = width - 40;
    labelsWidth = chartWidth - 300;
  }

  return {"chartWidth": chartWidth, "labelsWidth": labelsWidth};
}

function drawChart() {

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Task ID');
  data.addColumn('string', 'Task Name');
  data.addColumn('date', 'Start Date');
  data.addColumn('date', 'End Date');
  data.addColumn('number', 'Duração');
  data.addColumn('number', 'Percent Complete');
  data.addColumn('string', 'Dependencies');

  data.addRows([
    ['Research', 'Levantamento bibliográfico',
    new Date(2018, 3, 1), new Date(2018, 5, 1), null,  50,  null],
    ['Prepare', 'Idealização do problema',
    new Date(2018, 4, 1), new Date(2018, 5, 1), null, 0, 'Research'],
    ['Apply', 'Design do modelo conceitual (método)',
    new Date(2018, 5, 1), new Date(2018, 8, 1), null, 0, 'Prepare'],
    ['Analysis', 'Analise dos resultados',
    new Date(2018, 8, 1), new Date(2018, 10, 1), null, 0, 'Apply'],
    ['Write', 'Monografia',
    new Date(2018, 4, 1), new Date(2018, 11, 1), null, 0, 'Research']
    ]);

  var widths = sizeForChart();
  console.log(widths)
  var options = {
    height: 250,
    width: widths.chartWidth,
    gantt: {
      labelMaxWidth: widths.labelsWidth,
      labelStyle: {
        fontName: 'Source Sans Pro',
        fontSize: 12,
        color: '#757575'
      }
    }
  };

  var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

  var resize = () => {
      var widths = sizeForChart();
      // change dimensions if necessary
      var options = {
        height: 250,
        width: widths.chartWidth,
        gantt: {
          labelMaxWidth: widths.labelsWidth,
          labelStyle: {
            fontName: 'Source Sans Pro',
            fontSize: 12,
            color: '#757575'
          }
        }
      };
      chart.draw(data, options);
  }

  if (window.addEventListener) {
      window.addEventListener('resize', resize);
  }
  else {
      window.attachEvent('onresize', resize);
  }

  chart.draw(data, options);
}