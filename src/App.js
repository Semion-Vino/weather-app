import React, {
  Component
} from 'react';
import Weather from './components/mainComp.js';


const key = '5739085cb0a54900837c9c863dc8bae8'; //Api key
class App extends Component {
  state = {
    temperature: '',
    weather: '',
    icon: '',
    description: ''
  }
  componentDidMount() {
    //Fetch data from api
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=${key}`)
      .then(response => {
        return response.json();
      }).then(resp => {

        //Get tomorrow's full date & time
        const tomorrow = new Date(new Date());
        tomorrow.setDate(tomorrow.getDate() + 1);
        let zero = '';
        if ((tomorrow.getMonth() + 1) < 10) {
          zero = 0
        };
        const FullDate = `${tomorrow.getFullYear()}-${zero}${tomorrow.getMonth() + 1}-${tomorrow.getDate()} 09:00:00`

        //Get the neccessary array with the info for tomorrow
        let tomorrowData;
        resp.list.forEach(el => {
          if (el.dt_txt === FullDate) {
            return tomorrowData = el;
          }
        });

        this.setState({
          temperature: tomorrowData.main.temp,
          icon: tomorrowData.weather[0].icon,
          description: tomorrowData.weather[0].description
        })


      }).catch(console.log)
  }

  render() {
    return (
      <Weather temperature={this.state.temperature}
        description={this.state.description}
        icon={this.state.icon}
      />

    );
  }
}

export default App;