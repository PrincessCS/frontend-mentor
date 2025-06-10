fetch('data.json')
.then(response => response.json())
.then(data => {
    //getting values for the x and y axis
    const xValues = data.map(item => item.day);
    const yValues = data.map(item => item.amount);
    //calculating the sum of the values of y axis
    const totalSpent = yValues.reduce((acc, sum) => acc + sum, 0);
    const total = document.getElementById('total');
    total.textContent = `$${totalSpent}`;
    //getting current day 
    const date = new Date();
    const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const currentDay = dayNames[date.getDay()];
    // bar colors
    const barColors = xValues.map(day => 
        day === currentDay ? 'hsl(186, 34%, 65%)' : 'hsl(10, 79%, 65%)'
    );

  new Chart('myChart', {
  type: 'bar',
  data: {
    labels: xValues,
    datasets: [
      {
        data: yValues,
        backgroundColor: barColors, 
        borderRadius: 5,
        hoverBackgroundColors: barColors
      }
    ]
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
            label: context => `$${context.raw}`
        }
      }
    },
    scales: {
        x: {
            grid: {display: false},
            ticks: {font: {size: 14}}
        },
      y: {
        display: false
      }
    }
  }
});
})
.catch(err => console.error('Error loading data: ', err));


