$(document).ready(function () {    
    console.log("Enter draw department visit count");
    var departments = '<%= department %>'.split(',');
    var counts = '<%= count %>'.split(',');
    console.log('departments = ' + departments );
    console.log('counts = ' + counts);
    var chart = document.getElementById('department_visit_count').getContext('2d');
    myChart = new Chart(chart, {
      type: 'bar',
      data: {
          labels: departments,
          datasets: [{
              label: 'times of visit',
              data: counts,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              barPercentage: 0.5
          }]
      }
    });
    console.log("Exit draw department visit count");
});